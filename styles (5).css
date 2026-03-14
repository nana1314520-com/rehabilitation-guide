$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$prefix = "http://localhost:8000/"

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add($prefix)
$listener.Start()

Write-Host "Serving $root at $prefix"

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $path = $ctx.Request.Url.AbsolutePath.TrimStart("/")
    if ([string]::IsNullOrWhiteSpace($path)) { $path = "index.html" }
    $path = $path -replace "/", "\"
    $file = Join-Path $root $path

    if (-not (Test-Path -LiteralPath $file -PathType Leaf)) {
      $ctx.Response.StatusCode = 404
      $bytes = [Text.Encoding]::UTF8.GetBytes("404 Not Found")
      $ctx.Response.ContentType = "text/plain; charset=utf-8"
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
      $ctx.Response.Close()
      continue
    }

    $ext = [IO.Path]::GetExtension($file).ToLowerInvariant()
    $mime = switch ($ext) {
      ".html" { "text/html; charset=utf-8" }
      ".css" { "text/css; charset=utf-8" }
      ".js" { "application/javascript; charset=utf-8" }
      ".json" { "application/json; charset=utf-8" }
      ".svg" { "image/svg+xml" }
      ".png" { "image/png" }
      ".jpg" { "image/jpeg" }
      ".jpeg" { "image/jpeg" }
      ".webp" { "image/webp" }
      ".mp4" { "video/mp4" }
      Default { "application/octet-stream" }
    }

    $bytes = [IO.File]::ReadAllBytes($file)
    $ctx.Response.ContentType = $mime
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $ctx.Response.Close()
  }
} finally {
  if ($listener.IsListening) { $listener.Stop() }
  $listener.Close()
}
