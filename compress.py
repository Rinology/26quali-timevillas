import os
try:
    from PIL import Image
except ImportError:
    import sys
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

def convert_to_webp(source_folder, quality=80):
    for root, dirs, files in os.walk(source_folder):
        for filename in files:
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                filepath = os.path.join(root, filename)
                
                try:
                    img = Image.open(filepath)
                    file_name_without_ext = os.path.splitext(filename)[0]
                    new_filepath = os.path.join(root, f"{file_name_without_ext}.webp")
                    
                    # 이미 변환된 파일이 있으면 건너뜁니다
                    if not os.path.exists(new_filepath):
                        # WebP 16383 픽셀 한계 돌파를 위한 크기 축소 로직
                        max_limit = 16383
                        width, height = img.size
                        
                        if width > max_limit or height > max_limit:
                            ratio = max_limit / float(max(width, height))
                            new_width = int(width * ratio)
                            new_height = int(height * ratio)
                            
                            print(f"⚠️ WebP 한계 초과: 원본 크기({width}x{height})를 ({new_width}x{new_height})로 축소합니다.")
                            
                            # Pillow 버전별 리샘플링 인자 호환성 처리
                            try:
                                resample = Image.Resampling.LANCZOS
                            except AttributeError:
                                resample = Image.LANCZOS
                                
                            img = img.resize((new_width, new_height), resample)

                        img.save(new_filepath, 'webp', quality=quality)
                        print(f"✅ 변환 성공: {filepath} -> {new_filepath}")
                    else:
                        print(f"⚡ 이미 존재함 (건너뜀): {new_filepath}")
                except Exception as e:
                    print(f"❌ 변환 실패 ({filepath}): {e}")

if __name__ == "__main__":
    # images 폴더 하나만 지정해도 그 안의 detail 및 모든 하위 폴더들을 탐색합니다!
    SOURCE_DIRS = ["./images"]
    
    print("🚀 모든 하위 폴더를 포함하여 이미지 최적화를 시작합니다...")
    for folder in SOURCE_DIRS:
        if os.path.exists(folder):
            print(f"--- Processing folder recursively: {folder} ---")
            convert_to_webp(folder)
        else:
            print(f"⚠️ Warning: Folder not found: {folder}")
            
    print("🎉 모든 변환이 완료되었습니다! Vercel 요금이 굳었습니다.")
