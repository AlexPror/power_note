@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo Building...
call npm run build
if errorlevel 1 exit /b 1

copy /Y dist\index.html dist\404.html >nul
echo. > dist\.nojekyll
echo 7vershin.vorobjev.pro> dist\CNAME

echo Deploying to gh-pages...
call npx --yes gh-pages@6 -d dist -m "deploy: 7 vershin"
if errorlevel 1 (
  echo Deploy failed
  exit /b 1
)

echo.
echo Done. After GitHub Pages + DNS:
echo   https://7vershin.vorobjev.pro
echo Temp until DNS:
echo   https://alexpror.github.io/power_note/
