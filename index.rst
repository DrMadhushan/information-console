# Design Manual - Console Application
-------------------------------------

[TOC] ## Application Design ExpressJS backed EJS UI templates
encapsulated in an electron application. Standalone - installable in
embedded devices those support chromium browser

Technologies Involved
---------------------

Code Architecture
-----------------

The code is based on MVC architecture

::

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

Key program files and directories
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. config.json *config.json* file contains all the configuration data of
   the application. In this program it contains the admin user’s
   *userID* and *password*
2. package.json
3. app.js
4. server.js
5. preload.js
6. /src/controllers/
7. /src/public/keyboard/
8. /src/public/uploads/newBanner.png
9. 
