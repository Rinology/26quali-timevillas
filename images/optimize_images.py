import os

try:

    from PIL import Image

except ImportError:

    import sys

    import subprocess

    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])

    from PIL import Image



def convert_to_webp(source_folder, quality=80):

    for filename in os.listdir(source_folder):

        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):

            filepath = os.path.join(source_folder, filename)

           

            # Skip if it's a directory

            if os.path.isdir(filepath):

                continue

               

            try:

                img = Image.open(filepath)

                file_name_without_ext = os.path.splitext(filename)[0]

                new_filepath = os.path.join(source_folder, f"{file_name_without_ext}.webp")

               

                img.save(new_filepath, 'webp', quality=quality)

                print(f"✅ 변환 성공: {filename} -> {file_name_without_ext}.webp")

            except Exception as e:

                print(f"❌ 변환 실패 ({filename}): {e}")



if __name__ == "__main__":

    # 실행 부분 (images와 images/detail 폴더를 둘 다 처리)

    SOURCE_DIRS = ["./images", "./images/detail"]

   

    print("🚀 이미지 최적화를 시작합니다...")

    for folder in SOURCE_DIRS:

        if os.path.exists(folder):

            print(f"--- Processing folder: {folder} ---")

            convert_to_webp(folder)

        else:

            print(f"⚠️ Warning: Folder not found: {folder}")

           

    print("🎉 모든 변환이 완료되었습니다! Vercel 요금이 굳었습니다.")