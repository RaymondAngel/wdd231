"""Run local browser checks; writes evidence without claiming external audits."""
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
server = http.server.ThreadingHTTPServer(('127.0.0.1', 8766), functools.partial(Handler, directory=str(root)))
threading.Thread(target=server.serve_forever, daemon=True).start()
report = {'layouts': [], 'checks': [], 'errors': [], 'page_bytes': {}}
with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    context = browser.new_context()
    page = context.new_page()
    page.on('pageerror', lambda error: report['errors'].append(str(error)))
    base = 'http://127.0.0.1:8766/final_project/'
    for name in ['index', 'services', 'contact', 'thankyou', 'attributions', 'video']:
        for width in [320, 568, 768, 1440]:
            page.set_viewport_size({'width': width, 'height': 900})
            page.goto(base + name + '.html')
            if name == 'services':
                page.wait_for_selector('.card')
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (name, width)
            assert page.locator('h1').count() == 1
            assert page.locator('meta[name="description"]').count() == 1
            for image in page.locator('img').all():
                image.scroll_into_view_if_needed()
                image.evaluate('(i) => i.decode()')
            assert page.locator('img').evaluate_all('(images) => images.every(i => i.complete && i.naturalWidth > 0)')
            report['layouts'].append({'page': name, 'width': width, 'overflow': False})
            if width in [320, 1440] and name in ['index', 'services', 'contact']:
                page.screenshot(path=str(root / f'final_project/reports/{name}-{width}.png'), full_page=True)
        resources = page.evaluate('performance.getEntriesByType("resource").map(r => r.name)')
        total = (root / f'final_project/{name}.html').stat().st_size
        for resource in set(resources):
            path = root / resource.split('8766/')[1].split('?')[0]
            if path.is_file(): total += path.stat().st_size
        assert total < 500000, (name, total)
        report['page_bytes'][name] = total
    page.set_viewport_size({'width': 320, 'height': 900})
    page.goto(base + 'index.html')
    assert not page.locator('#navigation').is_visible()
    page.locator('.menu').click()
    assert page.locator('#navigation').is_visible()
    assert page.locator('.menu').get_attribute('aria-expanded') == 'true'
    page.keyboard.press('Escape')
    assert not page.locator('#navigation').is_visible()
    report['checks'].append('Mobile menu opens and closes with Escape')
    page.set_viewport_size({'width': 1440, 'height': 900})
    page.goto(base + 'services.html')
    page.wait_for_selector('.card')
    assert page.locator('.card').count() == 15
    for card in page.locator('.card').all():
        assert card.locator('dd').count() == 3
        assert card.locator('h2').inner_text()
        assert card.locator('.tag').inner_text()
    page.locator('#category').select_option('Dashboards')
    assert page.locator('.card').count() == 5
    page.locator('#search').fill('sales')
    assert page.locator('.card').count() == 1
    page.locator('#search').fill('no matching service')
    assert page.locator('.card').count() == 0
    page.locator('#search').fill('')
    page.locator('#category').select_option('All')
    page.locator('.save').first.click()
    page.reload()
    page.wait_for_selector('.card')
    assert page.locator('.save').first.get_attribute('aria-pressed') == 'true'
    page.locator('#saved-only').check()
    assert page.locator('.card').count() == 1
    page.locator('.details').first.click()
    assert page.locator('dialog').evaluate('(e) => e.open')
    assert page.locator('#close-dialog').evaluate('(e) => e === document.activeElement')
    page.keyboard.press('Escape')
    assert not page.locator('dialog').evaluate('(e) => e.open')
    assert page.locator('.details').first.evaluate('(e) => e === document.activeElement')
    report['checks'].append('15 data items, filters, no-match message, persisted selection, modal keyboard and focus')
    page.goto(base + 'contact.html?service=Dashboards')
    assert page.locator('#service').input_value() == 'Dashboards'
    assert not page.locator('form').evaluate('(e) => e.checkValidity()')
    page.locator('#name').fill('Sample Student')
    page.locator('#email').fill('student@example.com')
    page.locator('#company').fill('Sample Company')
    page.locator('#message').fill('<script>alert(1)</script> A sample sales dashboard.')
    page.locator('#consent').check()
    page.locator('button[type=submit]').click()
    page.wait_for_url('**/thankyou.html?*')
    assert page.locator('[data-field=name]').inner_text() == 'Sample Student'
    assert page.locator('[data-field=service]').inner_text() == 'Dashboards'
    assert '<script>' in page.locator('[data-field=message]').inner_text()
    report['checks'].append('Required form validation, service preselection, URLSearchParams, safe text rendering')
    page.route('**/data/services.json', lambda route: route.fulfill(status=503, body='Unavailable'))
    page.goto(base + 'services.html')
    page.get_by_role('button', name='Retry loading services').wait_for()
    page.unroute('**/data/services.json')
    page.get_by_role('button', name='Retry loading services').click()
    page.wait_for_selector('.card')
    assert page.locator('.card').count() == 15
    report['checks'].append('Fetch failure produces usable retry and successfully recovers')
    assert report['errors'] == [], report['errors']
    browser.close()
server.shutdown()
(root / 'final_project/reports/browser-checks.json').write_text(json.dumps(report, indent=2))
print(json.dumps(report, indent=2))
