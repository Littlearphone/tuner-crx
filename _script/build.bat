@echo off

set EXTENSION_NAME=tuner-x
set EXECUTOR="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
set NGINX=D:\Portable\nginx-1.14.0\html\crx
set BASE=C:\Users\Surface\IdeaProjects\tuner-x
set KEY=%BASE%\_script\%EXTENSION_NAME%.pem
set DIST=%BASE%\dist
echo 'Start pack chrome extension'
%EXECUTOR% --pack-extension=%DIST% --pack-extension-key=%KEY%
echo 'Move chrome extension to nginx:%NGINX%\%EXTENSION_NAME%.crx'
move %BASE%\dist.crx %NGINX%\%EXTENSION_NAME%.crx
echo 'Generate extension update descriptor'
echo ^<?xml version='1.0' encoding='UTF-8'?^> > %NGINX%\update.xml
echo ^<gupdate xmlns='http://www.google.com/update2/response' protocol='2.0'^> >> %NGINX%\update.xml
echo ^<app appid='choconlmhccebmhmikjllcchodppjcih'^> >> %NGINX%\update.xml
echo ^<updatecheck codebase='http://pc-yaojiamin:1784/crx/tuner-x.crx' version='1.0.2'/^> >> %NGINX%\update.xml
echo ^</app^> >> %NGINX%\update.xml
echo ^</gupdate^> >> %NGINX%\update.xml

pause

