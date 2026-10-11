# upload-gallery.ps1 — pushes normalized gallery media to R2 (ggagency-images/gallery/)
# Skips 1.mp4 (long-form lives on YouTube: youtu.be/XJlMWchGuXs) and 17* (hero).
# Uses a wildcard path so the non-ASCII stage folder name can't break on encoding.
$src = (Resolve-Path "C:\Code\*stage\ggagency\Order\normalized").Path
if (-not $src) { Write-Host "ERROR: normalized folder not found"; exit 1 }
Write-Host "Source: $src"
Set-Location "C:\Code\works\ggagency"
Get-ChildItem $src -File | Where-Object { $_.Name -notmatch "^1\.|^17" } | ForEach-Object {
  Write-Host "Uploading $($_.Name)..."
  npx wrangler r2 object put "ggagency-images/gallery/$($_.Name)" --file $_.FullName --remote
}
Write-Host "Done. Files under ggagency-images/gallery/ (1.mp4 and 17* skipped)"
