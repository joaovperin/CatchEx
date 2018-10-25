@echo off
setlocal EnableDelayedExpansion

REM Create machine if not exists
set MACHINE_BUILT=-1
for /f "tokens=1" %%A in ('docker image ls catch-ex') do (
    set /a MACHINE_BUILT=!MACHINE_BUILT! + 1
)
if not "%MACHINE_BUILT%" == "1" (docker build -t catch-ex .)

REM Discover machine IP
set IP_ADDR=localhost
for /f "tokens=*" %%G in ('docker-machine ip default') do (
    set IP_ADDR=%%G
)

REM Show info, open chrome and start machine
echo "IP to run: %IP_ADDR%:3000"
start chrome %IP_ADDR%:3000
docker run -p 3000:3000 -it catch-ex
endlocal