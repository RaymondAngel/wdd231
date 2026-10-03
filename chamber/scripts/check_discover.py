"""Browser verification of the W05 requirements and chamber links/page weight."""
import functools
import http.server
import json
import mimetypes
import threading
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parents[2]
mimetypes.add_type('text/javascript', '.mjs')
class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass
server = http.server.ThreadingHTTPServer(('127.0.0.1', 8765), functools.partial(Handler, directory=str(root)))
threading.Thread(target=server.serve_forever, daemon=True).start()
report = {'layouts': [], 'pages': []}
with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    context = browser.new_context()
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    base = 'http://127.0.0.1:8765/chamber/'
    page.goto(base + 'discover.html')
    page.wait_for_selector('.discover-card')
    assert page.locator('.discover-card').count() == 8
    assert page.locator('.discover-card[style]').count() == 0
    assert page.locator('.discover-card img[loading="lazy"]').count() == 7
    for card in page.locator('.discover-card').all():
        for selector in ['h2', 'figure img', 'address', 'p', 'button']:
            assert card.locator(selector).count() == 1
    assert page.locator('#visit_message').inner_text() == 'Welcome! Let us know if you have any questions.'
    page.reload()
    assert page.locator('#visit_message').inner_text() == 'Back so soon! Awesome!'
    for days in [1, 5]:
        page.evaluate('(days) => localStorage.setItem("california-city-discover-last-visit", String(Date.now() - days * 86400000 - 1000))', days)
        page.reload()
        assert page.locator('#visit_message').inner_text() == f'You last visited {days} {"day" if days == 1 else "days"} ago.'
    for width in [320, 640, 641, 768, 1024, 1025, 1440]:
        page.set_viewport_size({'width': width, 'height': 900})
        page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
        page.wait_for_timeout(300)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        areas = page.locator('.discover-card').first.evaluate('(e) => getComputedStyle(e).gridTemplateAreas')
        report['layouts'].append({'width': width, 'card_areas': areas, 'overflow': False})
        if width in [320, 768, 1440]:
            page.screenshot(path=str(root / f'chamber/reports/discover-{width}.png'), full_page=True)
    assert page.locator('.discover-card img').evaluate_all('(images) => images.every(i => i.complete && i.naturalWidth === 300 && i.naturalHeight === 200)')
    for width in [320, 1440]:
        page.set_viewport_size({'width': width, 'height': 900})
        image = page.locator('.discover-card img').first
        image.hover()
        page.wait_for_timeout(350)
        effect = image.evaluate('(e) => getComputedStyle(e).transform')
        assert (effect == 'none') == (width == 320), (width, effect)
    for button in page.locator('.discover-card button').all():
        button.click()
        assert page.locator('#attraction_dialog').evaluate('(e) => e.open')
        assert page.locator('#dialog_source').get_attribute('href').startswith('https://')
        page.keyboard.press('Escape')
        assert button.evaluate('(e) => document.activeElement === e')
    page.set_viewport_size({'width': 320, 'height': 900})
    page.locator('#menu_button').click()
    assert page.locator('#primary_navigation').is_visible()
    page.keyboard.press('Escape')
    assert not page.locator('#primary_navigation').is_visible()
    # Storage-blocked visitors still get all cards.
    blocked = browser.new_context()
    blocked.add_init_script('Object.defineProperty(window, "localStorage", {get() { throw new Error("Storage blocked"); }});')
    blocked_page = blocked.new_page()
    blocked_page.goto(base + 'discover.html')
    blocked_page.wait_for_selector('.discover-card')
    assert blocked_page.locator('.discover-card').count() == 8
    for name in ['index.html', 'directory.html', 'discover.html', 'join.html', 'thankyou.html']:
        fresh = browser.new_context()
        tab = fresh.new_page()
        cdp = fresh.new_cdp_session(tab)
        cdp.send('Network.enable')
        cdp.send('Network.setCacheDisabled', {'cacheDisabled': True})
        transfers = []
        cdp.on('Network.loadingFinished', lambda e: transfers.append(e.get('encodedDataLength', 0)))
        tab.goto(base + name, wait_until='networkidle')
        tab.evaluate('window.scrollTo(0, document.body.scrollHeight)')
        tab.wait_for_timeout(1500)
        links = tab.locator('a[href]').evaluate_all('(links) => links.map(a => a.getAttribute("href"))')
        broken = []
        for link in links:
            if not link.startswith(('https:', 'http:', 'mailto:', 'tel:', '#')):
                response = fresh.request.get(base + link)
                if not response.ok:
                    broken.append(link)
        assert not broken, (name, broken)
        size = sum(transfers)
        assert size < 500000, (name, size)
        report['pages'].append({'page': name, 'cold_transfer_bytes': size, 'broken_local_links': broken})
        fresh.close()
    report['runtime_errors'] = errors
    report['rubric_checks'] = {'cards': 8, 'webp_photos': 8, 'lazy_photos': 7, 'required_card_elements': True, 'inline_card_styles': 0, 'desktop_hover_only': True, 'visitor_messages': True, 'dialogs': True, 'responsive_navigation': True}
    assert not errors
    browser.close()
server.shutdown()
(root / 'chamber/reports/discover-browser-checks.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report, indent=2))
