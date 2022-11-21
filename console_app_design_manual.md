# Design Manual - Console Application
------
_An html version of this documentation is available at the Maker Mate project website._

##Content
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
renderer.js
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
#### 1. config.json
   _config.json_ file contains all the configuration data of the application.
   Cofig data:
   ```
    {
        "admin" : {
            "uname" : "local_admin_username",
            "pwd" : "local_admin_password"
        },
        "mqtt" : {
            "host" : "tls://<hivemq_cluster_id>.hivemq.cloud",
            "port" : "8883",
            "clientId" : "application_client_id<random>",
            "subTopic": "makermate/ultrasonic",
            "pubTopic": "makermate/locker/"

        },
        "api":{
            "address": "http://10.40.18.10:8000/api" // currently locally hosted in dept server
        }
    }
   ```
   Add your configuration content to this file, on upgrade or feature additions.

#### 2. package.json
   Contains all required node package names & versions + App details
   
#### 3. app.js
   This is the root `electron` application script. 
```
mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    fullscreen: true,
    webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    preload: path.join(__dirname, "preload.js"),
    },
});


  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

```

Modify above snippet to setup the application window size. The application will launch fullscreen on startup.

For development and debug puposes, uncomment the last two lines of the above code to enable Dev tools.

function calls for inter process communication (OS level) defined in outer modules and called in app script.
Ex: MQTT actions, KIOSK mode switching

#### 4. server.js
   This is the express server script. This routes to different views based on user inputs.
   Sub directory ```./src``` contains the child functionalities of ```server.js```.

#### 5. preload.js
   Setup configurations of IPC (Inter-process Communication) are predefined here. Add additional channels for additional feature integrations.
   Refer electron official documentation for more details about IPC. 
   https://www.electronjs.org/docs/latest/tutorial/ipc

#### 6. /src/controllers/
   Major controller components of this program stays here. ```packageController```, ```SearchController```, ```settingsController```
   Refer to the code to understand the functionality. (Better programming practices followed - you can understand the code)

#### 7. /src/public/
   This is the root directory for all the static content of the web UI.
   _Ex: styling, images, icons_

#### 8. /src/public/keyboard/
   This is an outsourced and customized `css` - `js` keyboard library. You can modify the css stylings to change the look and feel of the onscreen keyboard.
   You should use `use-keyboard-input` class for each input field you make in `/src/views/...`.
   Relavant functionality of `use-keyboard-input` class is defined in `keyboard.js` in this directory.

#### 9. /src/public/uploads/newBanner.png
   This is the banner published in the home screen of the information console. Each time the admin upload a new image to publish, the `newBanner.png` will be overwritten. Can add additional functionalitis in `home.ejs` and `homeSection.ejs`
#### 11. /src/views/partials/
    Header and navigation UI code is seperated as partials and included in all required views.

### CE Inventory API

The login functionality and exploring maker space components and equipment functionalities are integrated using `CE Inventory API` 

Refer to **CE Inventory API documentation** for feature enhancements.
Navigate to _config.json_ to update API credentials.

### MQTT client program

Setup following code snippet to modify MQTT client configuration. _config.json_ file contains the required credentials. (update on requirement)
```
const host = config.mqtt.host;

const options = {
  keepalive: 30,
  clientId: clientId,
  protocolId: "MQIsdp",
  protocolVersion: 3,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  username: "<mqtt_client_uname>",
  password: "<mqtt_client_pwd>",
  will: {
    topic: "WillMsg",
    payload: "Connection Closed abnormally..!",
    qos: 0,
    retain: false,
  },
  rejectUnauthorized: false,
};
```
_TLS_ protocol is used to communication. (defined in _config.json_)

## Run Application
1. Check your _config.json_ file and make sure your api host and mqtt broker addresses are properly set.
2. If you use cloud hosted broker and CE Inventory API, just execute
   `npm start`
   to run the app in dev mode.
3. If you want to locally host the API and mqtt broker, change the config file and execute as usual.
4. In this case make sure to run the MySQL server to host the ce-inventory database.
5. Refer to the following link to package your application.
   [Electron Application Distribution](https://www.electronjs.org/docs/latest/tutorial/application-distribution)

## References
1. [Electron Documentation](https://www.electronjs.org/docs/latest/)
2. [Express JS Documentation](https://expressjs.com/)
3. [Embedded JS (EJS)](https://ejs.co/#docs)
4. [Developer](mailto:drmadhushan@gmail.com) (If you did't find any help contact us)


--------