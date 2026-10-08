"""Check local references and IDs; does not replace the course page audit."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json

root = Path(__file__).resolve().parents[1]
report = {}
class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.refs = []
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if 'id' in values: self.ids.append(values['id'])
        for key in ['src','href','action']:
            if key in values: self.refs.append(values[key])

for name in ['index','services','contact','thankyou','attributions','video']:
    page = root / f'{name}.html'
    parser = Parser()
    parser.feed(page.read_text(encoding='utf-8'))
    assert len(parser.ids) == len(set(parser.ids)), f'Duplicate IDs: {name}'
    checked = 0
    for ref in parser.refs:
        value = urlsplit(ref)
        if value.scheme or value.netloc: continue
        if value.path:
            target = (page.parent / unquote(value.path)).resolve()
            assert target.is_file(), f'Broken reference: {name}: {ref}'
        elif value.fragment:
            assert value.fragment in parser.ids, f'Broken fragment: {name}: {ref}'
        checked += 1
    report[name] = {'duplicate_ids': 0, 'broken_local_references': 0, 'references_checked': checked}
(root / 'reports/link-checks.json').write_text(json.dumps(report, indent=2))
print(json.dumps(report, indent=2))
