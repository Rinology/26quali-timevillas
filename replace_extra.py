import codecs

# Replace in index.html
with codecs.open(r"c:\Users\taerin\Desktop\26quali-timevillas\index.html", "r", "utf-8") as f:
    text = f.read()

text = text.replace('id="extra-series"', 'id="xtron-series"')
text = text.replace('id="extra-viewer"', 'id="xtron-viewer"')
text = text.replace('id="extra-series-pills"', 'id="xtron-series-pills"')
text = text.replace('scrollPills(\'left\', \'extra-series-pills\')', 'scrollPills(\'left\', \'xtron-series-pills\')')
text = text.replace('scrollPills(\'right\', \'extra-series-pills\')', 'scrollPills(\'right\', \'xtron-series-pills\')')
text = text.replace('showExtraImage(', 'showXtronImage(')
text = text.replace('엑스트라 라인업', '엑스트론 라인업')
text = text.replace('엑스트라 시리즈', '엑스트론 시리즈')

with codecs.open(r"c:\Users\taerin\Desktop\26quali-timevillas\index.html", "w", "utf-8") as f:
    f.write(text)

# Replace in main.js
with codecs.open(r"c:\Users\taerin\Desktop\26quali-timevillas\main.js", "r", "utf-8") as f:
    text = f.read()

text = text.replace('const extraData = {', 'const xtronData = {')
text = text.replace('extra: {\n    type', 'xtron: {\n    type')
text = text.replace('dataMap: extraData,', 'dataMap: xtronData,')
text = text.replace("viewerId: 'extra-viewer',", "viewerId: 'xtron-viewer',")
text = text.replace("tabSelector: '#extra-series", "tabSelector: '#xtron-series")
text = text.replace('window.showExtraImage', 'window.showXtronImage')
text = text.replace("showGalleryImage('extra', type)", "showGalleryImage('xtron', type)")
text = text.replace("showGalleryImage('extra', 'slim')", "showGalleryImage('xtron', 'slim')")
text = text.replace('if (typeof extraData !==', 'if (typeof xtronData !==')
text = text.replace('Object.values(extraData)', 'Object.values(xtronData)')
text = text.replace('엑스트라 시리즈 (extraData)', '엑스트론 시리즈 (xtronData)')
text = text.replace('엑스트라 라인업', '엑스트론 라인업')

with codecs.open(r"c:\Users\taerin\Desktop\26quali-timevillas\main.js", "w", "utf-8") as f:
    f.write(text)
