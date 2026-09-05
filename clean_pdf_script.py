import sys

with open('build_alertnex_4page_pdf.py', 'r', encoding='utf-8') as f:
    text = f.read()

replacements = {
    '\u2022': '-',
    '\u2013': '-',
    '\u2014': '-',
    '\u2018': "'",
    '\u2019': "'",
    '\u201c': '"',
    '\u201d': '"',
    '\u2192': '->',
}

for k, v in replacements.items():
    text = text.replace(k, v)

with open('build_alertnex_4page_pdf.py', 'w', encoding='utf-8') as f:
    f.write(text)

print('Cleaned non-ascii successfully')
