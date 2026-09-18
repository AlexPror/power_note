@echo off
chcp 65001 >nul
cd /d "%~dp0"

where npm >nul 2>&1
if errorlevel 1 (
  echo Node.js / npm не найдены. Установите с https://nodejs.org/
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Устанавливаю зависимости...
  call npm install
  if errorlevel 1 (
    echo Ошибка npm install
    pause
    exit /b 1
  )
)

echo.
echo 7 вершин
echo   ПК:      http://localhost:5174/
echo   Телефон: http://192.168.0.102:5174/  (тот же Wi-Fi, VPN на ПК лучше выключить)
echo   Прод:    https://7vershin.vorobjev.pro  — пока не задеплоен
echo.
echo Закройте это окно, чтобы остановить сервер.
echo.
call npm run dev -- --host --port 5174
pause
