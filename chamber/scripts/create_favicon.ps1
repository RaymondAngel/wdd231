# Rebuild the single 16x16 chamber ICO using native pixel shapes.
# No packages, network requests, or generated imagery are needed.
$faviconPath = Join-Path (Split-Path -Parent $PSScriptRoot) 'favicon.ico'
$iconPixels = @{}
# Native 16x16 map-pin outline echoes images/chamber_logo.svg.
foreach ($point in @(@(6,2), @(7,2), @(8,2), @(9,2), @(5,3), @(10,3), @(4,4), @(11,4), @(4,5), @(11,5), @(4,6), @(11,6), @(4,7), @(11,7), @(5,8), @(10,8), @(5,9), @(10,9), @(6,10), @(9,10), @(6,11), @(9,11), @(7,12), @(8,12), @(7,13), @(8,13))) {
    $iconPixels["$($point[0]),$($point[1])"] = @(255,255,255)
}
foreach ($point in @(@(7,5), @(8,5), @(7,6), @(8,6))) {
    $iconPixels["$($point[0]),$($point[1])"] = @(232,184,91)
}
$iconStream = [System.IO.File]::Create($faviconPath)
$iconWriter = New-Object System.IO.BinaryWriter($iconStream)
try {
    # ICONDIR: reserved, ICO type, one image.
    $iconWriter.Write([uint16]0)
    $iconWriter.Write([uint16]1)
    $iconWriter.Write([uint16]1)
    # ICONDIRENTRY: dimensions, palette, planes, bits, size, offset.
    $iconWriter.Write([byte]16)
    $iconWriter.Write([byte]16)
    $iconWriter.Write([byte]0)
    $iconWriter.Write([byte]0)
    $iconWriter.Write([uint16]1)
    $iconWriter.Write([uint16]32)
    $iconWriter.Write([uint32]1128)
    $iconWriter.Write([uint32]22)
    # BITMAPINFOHEADER: height includes the image and transparency mask.
    $iconWriter.Write([uint32]40)
    $iconWriter.Write([int32]16)
    $iconWriter.Write([int32]32)
    $iconWriter.Write([uint16]1)
    $iconWriter.Write([uint16]32)
    $iconWriter.Write([uint32]0)
    $iconWriter.Write([uint32]1088)
    foreach ($unused in 1..4) { $iconWriter.Write([uint32]0) }
    # Bottom-up opaque BGRA pixels; forest background, white pin, gold center.
    for ($iconY = 15; $iconY -ge 0; $iconY--) {
        for ($iconX = 0; $iconX -lt 16; $iconX++) {
            $iconColor = $iconPixels["$iconX,$iconY"]
            if ($null -eq $iconColor) { $iconColor = @(22,63,57) }
            $iconWriter.Write([byte]$iconColor[2])
            $iconWriter.Write([byte]$iconColor[1])
            $iconWriter.Write([byte]$iconColor[0])
            $iconWriter.Write([byte]255)
        }
    }
    # A 1-bit, 4-byte-aligned AND mask: zero means opaque.
    foreach ($unused in 1..64) { $iconWriter.Write([byte]0) }
}
finally { $iconWriter.Dispose() }
Write-Output "Created $faviconPath (16x16, single image)."
