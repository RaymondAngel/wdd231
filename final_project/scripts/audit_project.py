"""Run real Lighthouse mobile/desktop reports using temporary tooling."""
import functools
import http.server
import json
import mimetypes
import os
import subprocess
import tempfile
import threading
import urllib.request
import zipfile
from pathlib import Path

root = Path(__file__).resolve().parents[2]
report_dir = root / 'final_project/reports'
tool_dir = Path(tempfile.gettempdir()) / 'wdd231-audit-tools'
tool_dir.mkdir(exist_ok=True)
node_dir = tool_dir / 'node-v22.14.0-win-x64'
if not (node_dir / 'node.exe').exists():
    archive = tool_dir / 'node.zip'
    urllib.request.urlretrieve('https://nodejs.org/dist/v22.14.0/node-v22.14.0-win-x64.zip', archive)
    with zipfile.ZipFile(archive) as source: source.extractall(tool_dir)
env = os.environ.copy()
env['PATH'] = str(node_dir) + os.pathsep + env['PATH']
if not (tool_dir / 'node_modules/lighthouse/cli/index.js').exists():
    subprocess.run([str(node_dir / 'node.exe'), str(node_dir / 'node_modules/npm/bin/npm-cli.js'), 'install', '--prefix', str(tool_dir), 'lighthouse@12.5.1', '--no-audit', '--no-fund'], env=env, check=True)
mimetypes.add_type('text/javascript', '.mjs')
class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args): pass
server = http.server.ThreadingHTTPServer(('127.0.0.1', 8767), functools.partial(Handler, directory=str(root)))
threading.Thread(target=server.serve_forever, daemon=True).start()
summary = {}
for mode in ['mobile', 'desktop']:
    for name in ['index', 'services', 'contact']:
        command = [str(node_dir / 'node.exe'), str(tool_dir / 'node_modules/lighthouse/cli/index.js'), f'http://127.0.0.1:8767/final_project/{name}.html', '--chrome-flags=--headless', '--only-categories=accessibility,best-practices,seo', '--output=json', '--output=html', '--output-path=' + str(report_dir / f'{name}-lighthouse-{mode}'), '--quiet']
        if mode == 'desktop': command.append('--preset=desktop')
        subprocess.run(command, env=env, check=True)
        data = json.loads((report_dir / f'{name}-lighthouse-{mode}.report.json').read_text(encoding='utf-8'))
        summary[f'{name}-{mode}'] = {key: round(value['score'] * 100) for key, value in data['categories'].items()}
        print(name, mode, summary[f'{name}-{mode}'], flush=True)
(report_dir / 'lighthouse-summary.json').write_text(json.dumps(summary, indent=2))
server.shutdown()
