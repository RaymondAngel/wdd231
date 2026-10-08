"""Validate the generated pages with the W3C Nu HTML checker."""
import json
import urllib.request
from pathlib import Path

root = Path(__file__).resolve().parents[1]
results = {}
for name in ['index','services','contact','thankyou','attributions','video']:
    try:
        request = urllib.request.Request('https://validator.w3.org/nu/?out=json', data=(root / f'{name}.html').read_bytes(), headers={'Content-Type': 'text/html; charset=utf-8', 'User-Agent': 'WDD231 project validation'})
        with urllib.request.urlopen(request, timeout=30) as response:
            data = json.load(response)
        results[name] = data.get('messages', [])
    except Exception as error:
        results[name] = [{'type': 'validation-unavailable', 'message': str(error)}]
    print(name, results[name], flush=True)
(root / 'reports/html-validation.json').write_text(json.dumps(results, indent=2))
