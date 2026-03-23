$targetDir = "c:\Users\taerin\Desktop\26quali-timevillas"

# 1. Replace extensions in HTML, CSS, JS
$files = Get-ChildItem -Path $targetDir -Include *.html,*.css,*.js -Recurse
foreach ($file in $files) {
    if ($file.Name -match "compress|node_modules") { continue }
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $newContent = $content -replace '(?i)\.png', '.webp' -replace '(?i)\.jpg', '.webp' -replace '(?i)\.jpeg', '.webp'
    if ($content -cne $newContent) {
        # Keep UTF8 without BOM
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($file.FullName, $newContent, $utf8NoBom)
        Write-Host "Updated $($file.FullName)"
    }
}

# 2. Delete original images
$imagesDir = Join-Path $targetDir "images"
$imgFiles = Get-ChildItem -Path $imagesDir -Include *.png,*.jpg,*.jpeg -Recurse
foreach ($img in $imgFiles) {
    Remove-Item -Path $img.FullName -Force
    Write-Host "Deleted $($img.FullName)"
}

Write-Host "All done!"
