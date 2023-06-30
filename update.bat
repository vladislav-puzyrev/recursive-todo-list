@echo off

call npx --yes npm-check-updates --upgrade --peer
call npx --yes sort-package-json
call npm install
call npm update

pause
