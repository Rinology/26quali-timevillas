import os
import json

base_dir = r'c:\Users\taerin\Desktop\26quali-timevillas\images\detail'
folder_map = {
    'promax': 'pro', 
    'citymax': 'city', 
    'tourmax': 'tour', 
    'prominimax': 'promini', 
    
    'slim': 'slim', 
    'mini': 'mini', 
    'EQ': 'eqneo',
    'GT': 'gt', 
    'GTmini': 'gtmini', 
    'pro': 'xpro', 
    'proS': 'xpros', 
    'city': 'xcity', 
    'tour': 'xtour', 
    'promini': 'xpromini'
}

result = {}
for d in os.listdir(base_dir):
    d_path = os.path.join(base_dir, d)
    if os.path.isdir(d_path):
        files = [f"images/detail/{d}/{f}" for f in os.listdir(d_path) if f.lower().endswith(('.jpg','.png','.webp'))]
        files.sort()
        key = folder_map.get(d, d)
        result[key] = files

with open(r"c:\Users\taerin\Desktop\26quali-timevillas\map_result.json", "w", encoding="utf-8") as f:
    f.write(json.dumps(result, ensure_ascii=False, indent=2))
