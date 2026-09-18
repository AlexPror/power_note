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
echo 7 вершин — http://localhost:5174/
echo Если страница не открылась — откройте ссылку вручную.
echo Закройте это окно, чтобы остановить сервер.
echo.
call npm run dev -- --port 5174 --strictPort
pause
