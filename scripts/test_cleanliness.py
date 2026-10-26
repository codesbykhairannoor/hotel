import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

url = "http://localhost:3001/p/blok-m-residence"
req = urllib.request.urlopen(url)
html = req.read().decode("utf-8")

ayana_matches = list(re.finditer(r'(?i)\bAYANA\b', html))
bali_matches = list(re.finditer(r'(?i)\bBali\b', html))

print(f"URL: {url}")
print(f"Occurrences of 'AYANA': {len(ayana_matches)}")
for m in ayana_matches[:10]:
    start = max(0, m.start() - 50)
    end = min(len(html), m.end() + 50)
    print("  Snippet AYANA:", repr(html[start:end]))

print(f"Occurrences of 'Bali': {len(bali_matches)}")
for m in bali_matches[:10]:
    start = max(0, m.start() - 50)
    end = min(len(html), m.end() + 50)
    print("  Snippet Bali:", repr(html[start:end]))
