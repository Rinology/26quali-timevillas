import codecs

# 1. Update index.html
with codecs.open(r"c:\Users\taerin\Desktop\26quali-timevillas\index.html", "r", "utf-8") as f:
    html = f.read()

# Replace specific ids and functions
html = html.replace('id="extra-series"', 'id="xtron-series"')
html = html.replace('id="extra-pills"', 'id="xtron-pills"')
html = html.replace("scrollPills('left', 'extra-pills')", "scrollPills('left', 'xtron-pills')")
html = html.replace("scrollPills('right', 'extra-pills')", "scrollPills('right', 'xtron-pills')")
html = html.replace('showExtraImage(', 'showXtronImage(')
html = html.replace('id="extra-viewer-wrap"', 'id="xtron-viewer-wrap"')
html = html.replace('id="extra-viewer"', 'id="xtron-viewer"')
html = html.replace('엑스트라 라인업', '엑스트론 라인업')
html = html.replace('엑스트라 시리즈', '엑스트론 시리즈')

with codecs.open(r"c:\Users\taerin\Desktop\26quali-timevillas\index.html", "w", "utf-8") as f:
    f.write(html)

# 2. Update main.js
with codecs.open(r"c:\Users\taerin\Desktop\26quali-timevillas\main.js", "r", "utf-8") as f:
    js = f.read()

js = js.replace('const extraData = {', 'const xtronData = {')
js = js.replace('  extra: {', '  xtron: {')
js = js.replace('dataMap: extraData', 'dataMap: xtronData')
js = js.replace("viewerId: 'extra-viewer'", "viewerId: 'xtron-viewer'")
js = js.replace("tabSelector: '#extra-series .lineup-pill'", "tabSelector: '#xtron-series .lineup-pill'")
js = js.replace('window.showExtraImage', 'window.showXtronImage')
js = js.replace("showGalleryImage('extra', type)", "showGalleryImage('xtron', type)")
js = js.replace("showGalleryImage('extra', 'slim')", "showGalleryImage('xtron', 'slim')")
js = js.replace('엑스트라 시리즈 (extraData)', '엑스트론 시리즈(xtronData)')
js = js.replace('엑스트라 라인업', '엑스트론 라인업')
js = js.replace('typeof extraData', 'typeof xtronData')
js = js.replace('Object.values(extraData)', 'Object.values(xtronData)')

with codecs.open(r"c:\Users\taerin\Desktop\26quali-timevillas\main.js", "w", "utf-8") as f:
    f.write(js)
print("done")
