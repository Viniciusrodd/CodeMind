@echo off
title Inicializando CodeMind...

echo ============================================
echo   INICIANDO SISTEMA CODEMIND
echo ============================================
echo.

set "SCRIPT_DIR=%~dp0"
set "SHORTCUT=%USERPROFILE%\Desktop\CodeMind.lnk"

REM -----------------------------------------------------------
REM CRIA ATALHO APENAS NA PRIMEIRA EXECUÇÃO
REM -----------------------------------------------------------
if not exist "%SHORTCUT%" (
   echo Criando atalho na área de trabalho...
   powershell -Command "$s = (New-Object -COM WScript.Shell).CreateShortcut('%SHORTCUT%'); $s.TargetPath = '%SCRIPT_DIR%start.bat'; $s.WorkingDirectory = '%SCRIPT_DIR%'; $s.IconLocation = '%SCRIPT_DIR%frontend\public\images\codemind-favicon.png'; $s.Description = 'CodeMind - Iniciar Sistema Completo'; $s.Save()"
   echo ✓ Atalho criado!
   echo.
)

REM -----------------------------------------------------------
REM PARAR SERVIÇOS EXISTENTES
REM -----------------------------------------------------------
echo Parando servicos anteriores...
for /f "tokens=5" %%i in ('netstat -ano ^| find ":5225" ^| find "LISTENING"') do (
   taskkill /F /PID %%i >nul 2>&1
)
for /f "tokens=5" %%i in ('netstat -ano ^| find ":5173" ^| find "LISTENING"') do (
   taskkill /F /PID %%i >nul 2>&1
)
timeout /t 2 >nul

REM -----------------------------------------------------------
REM VERIFICAR SE O WINDOWS TERMINAL ESTÁ INSTALADO
REM -----------------------------------------------------------
where wt >nul 2>&1
if %errorlevel% equ 0 (
   set "TERMINAL=wt"
   set "TERMINAL_ARGS= new-tab -d"
) else (
   set "TERMINAL=cmd"
   set "TERMINAL_ARGS=/c start cmd /k"
)

REM -----------------------------------------------------------
REM INICIAR SERVIÇOS
REM -----------------------------------------------------------
echo Iniciando Backend...
if "%TERMINAL%"=="wt" (
   start "CodeMind Backend" wt new-tab -d "%SCRIPT_DIR%backend" cmd /k "npm run dev"
) else (
   start "CodeMind Backend" cmd /k "cd /D "%SCRIPT_DIR%backend" && npm run dev"
)

timeout /t 2 >nul

echo Iniciando Frontend...
if "%TERMINAL%"=="wt" (
   start "CodeMind Frontend" wt new-tab -d "%SCRIPT_DIR%frontend" cmd /k "npm run dev"
) else (
   start "CodeMind Frontend" cmd /k "cd /D "%SCRIPT_DIR%frontend" && npm run dev"
)

timeout /t 2 >nul

echo Iniciando Ollama AI...
if "%TERMINAL%"=="wt" (
   start "Ollama Server" wt new-tab -d "%USERPROFILE%" cmd /k "ollama serve"
) else (
   start "Ollama Server" cmd /k "ollama serve"
)

REM -----------------------------------------------------------
REM INICIAR PROGRAMAS GUI - VERSÃO CORRIGIDA
REM -----------------------------------------------------------
echo Iniciando MongoDB Compass...

REM Procura em locais comuns do MongoDB Compass
set "MONGO_FOUND="
if exist "%PROGRAMFILES%\MongoDB Compass\MongoDBCompass.exe" (
   start "" "%PROGRAMFILES%\MongoDB Compass\MongoDBCompass.exe"
   set "MONGO_FOUND=1"
)
if exist "%PROGRAMFILES(x86)%\MongoDB Compass\MongoDBCompass.exe" (
   start "" "%PROGRAMFILES(x86)%\MongoDB Compass\MongoDBCompass.exe"
   set "MONGO_FOUND=1"
)
if exist "%LOCALAPPDATA%\Programs\MongoDBCompass\MongoDBCompass.exe" (
   start "" "%LOCALAPPDATA%\Programs\MongoDBCompass\MongoDBCompass.exe"
   set "MONGO_FOUND=1"
)
if exist "%USERPROFILE%\AppData\Local\Programs\MongoDBCompass\MongoDBCompass.exe" (
   start "" "%USERPROFILE%\AppData\Local\Programs\MongoDBCompass\MongoDBCompass.exe"
   set "MONGO_FOUND=1"
)
if not defined MONGO_FOUND (
   echo MongoDB Compass nao encontrado. Verifique se esta instalado.
   echo Locais comuns: C:\Program Files\MongoDB Compass\
)

echo Iniciando Postman...
set "POSTMAN_FOUND="
if exist "%LOCALAPPDATA%\Postman\Postman.exe" (
   start "" "%LOCALAPPDATA%\Postman\Postman.exe"
   set "POSTMAN_FOUND=1"
)
if exist "%PROGRAMFILES%\Postman\Postman.exe" (
   start "" "%PROGRAMFILES%\Postman\Postman.exe"
   set "POSTMAN_FOUND=1"
)
if exist "%USERPROFILE%\AppData\Local\Postman\Postman.exe" (
   start "" "%USERPROFILE%\AppData\Local\Postman\Postman.exe"
   set "POSTMAN_FOUND=1"
)
if not defined POSTMAN_FOUND (
   echo Postman nao encontrado. Verifique se esta instalado.
   echo Locais comuns: C:\Users\%USERNAME%\AppData\Local\Postman\
)

REM -----------------------------------------------------------
REM AGUARDAR E ABRIR NAVEGADOR
REM -----------------------------------------------------------
echo.
echo Aguardando servicos inicializarem (15 segundos)...
timeout /t 15 /nobreak >nul

echo Verificando se o backend esta online...
REM Usa PowerShell para testar conexão (não depende do curl)
powershell -Command "try { $response = Invoke-WebRequest -Uri http://localhost:5225 -TimeoutSec 2 -UseBasicParsing; exit 0 } catch { exit 1 }" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Backend esta respondendo
) else (
    echo ⚠ Backend pode nao ter iniciado completamente
    echo   Verifique se as janelas do terminal estao abertas
)

echo Abrindo o CodeMind no navegador...
start http://localhost:5173/project/dashboard

echo.
echo ============================================
echo  SISTEMA INICIADO!
echo ============================================
echo.
echo Servicos ativos:
echo - Backend: http://localhost:5225
echo - Frontend: http://localhost:5173
echo - Ollama: Executando em segundo plano
echo.
echo Para parar: Feche as janelas dos terminais
echo Para reiniciar: Execute este script novamente
echo.
pause
exit /b 0