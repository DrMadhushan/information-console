# Design Manual - Console Application
------
[TOC]
## Application Design
ExpressJS backed EJS UI templates encapsulated in an electron application.
Standalone - installable in embedded devices those support chromium browser

## Technologies Involved
<img src="https://miro.medium.com/max/1400/1*XP-mZOrIqX7OsFInN2ngRQ.png" height="40">
<img src="https://blog.issart.com/wp-content/uploads/2020/05/Electron-logo-light.png" height="40">
<img src="https://www.xhtmlteam.com/blog/wp-content/uploads/2020/08/twitter-bootstrap-logo-2.png" height="40">
<img src="https://media.licdn.com/dms/image/D4D12AQFcexULR6knuA/article-cover_image-shrink_600_2000/0/1664186757288?e=2147483647&v=beta&t=eLO8in1p-Wvme07U-Ym-JX3lg8i1j7kIT9CC8nR-Zts" height="40">
<img src="https://developer.community.boschrexroth.com/t5/image/serverpage/image-id/13467i19FDFA6E5DC7C260?v=v2" height="40">
<img src="https://pbs.twimg.com/profile_images/773245254979903488/yB0xE3NR_400x400.jpg" height="40">
<img src="https://www.kindpng.com/picc/m/149-1492299_rpi-logo-landscape-reg-screen-raspberry-pi-python.png" height="40">

## Code Architecture
The code is based on MVC architecture

```
File structure
--------------
config.json
package.json
app.js
server.js
preload.js
/src
    /controllers
        |- all controller programs (node JS)
    /public
        |- Styling scripts
        |- Fonts
        |- Dynamic JS programs
        |- Icons
        |- Images
        |- Keyboard Module
        |- Uploads
    /views
        |- EJS files (Templates)
        |/Modularized EJS Templates for each section
        |/partials

```

### Key program files and directories
1. config.json
   _config.json_ file contains all the configuration data of the application.
   In this program it contains the admin user's _userID_ and _password_
2. package.json
3. app.js
4. server.js
5. preload.js
6. /src/controllers/
7. /src/public/keyboard/
8. /src/public/uploads/newBanner.png
9. 
