import urllib.request
import re

url = "http://localhost:3001/p/blok-m-residence"
req = urllib.request.urlopen(url)
html = req.read().decode("utf-8")

print("Status:", req.status)
print("Has Blok M:", "Blok M Residence" in html)
print("Has Klaim:", "KLAIM WEBSITE INI" in html)
print("Has clean phone (6281298980880):", "6281298980880" in html)
print("Has display phone (0812-9898-0880):", "0812-9898-0880" in html)

matches = re.findall(r"wa\.me/([0-9]+)", html)
print("WhatsApp links in page:", matches)
