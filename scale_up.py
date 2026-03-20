import re

def scale(m):
    n = float(m.group(1))
    if n == 0: return m.group(0)
    u = m.group(2)
    # Don't scale percentages, completely 100vw/100vh
    if u == 'vw' and n == 100: return m.group(0)
    if u == 'vh' and n == 100: return m.group(0)
    
    val = n * 1.1
    
    if u == 'px' or u == 'deg':
        return f"{int(round(val))}{u}"
    else:
        # Avoid things like 1.1000vw
        res = float(f"{val:.2f}")
        if res.is_integer():
            return f"{int(res)}{u}"
        return f"{res}{u}"

with open('style.css', 'r', encoding='utf-8') as f:
    c = f.read()

# Only match numbers ending in px, vw, vh, rem, em that are preceded by space, colon, calc, minus, clamp etc
c = re.sub(r'(?<![-a-zA-Z0-9_])(\d+(?:\.\d+)?)(px|vw|vh|rem|em)', scale, c)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(c)

print("Scale up complete!")
