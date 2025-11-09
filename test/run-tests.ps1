# Run both tests (PowerShell)
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $here

Write-Host 'Running ESM test (node esm-test.mjs)'
node ./esm-test.mjs

Write-Host 'Running CJS test (node cjs-test.cjs)'
node ./cjs-test.cjs

Pop-Location
