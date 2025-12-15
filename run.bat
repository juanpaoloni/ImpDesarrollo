@echo off
start cmd /k "cd api && mvn spring-boot:run"

start cmd /k "cd frontend && npm install && npm run dev"

exit
