import html.parser

class MyHTMLParser(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
    
    def handle_starttag(self, tag, attrs):
        for attr in attrs:
            if attr[0] == 'id':
                self.ids.append((attr[1], self.getpos()[0]))

parser = MyHTMLParser()
with open('index.html', 'r', encoding='utf-8') as f:
    parser.feed(f.read())

seen = set()
for id_val, line in parser.ids:
    if id_val in seen:
        print(f"Duplicate ID: {id_val} on line {line}")
    seen.add(id_val)
