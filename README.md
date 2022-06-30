# Important update

This project will stop build multiplatform. I will create a flutter version to cover the IOS and Android build.

## Requirement
- Nodejs (move to server project)
- angular CLI
- Ionic CLI (deprecated)
- MongoDB (move to server project)
- Other package and dependence

## How to run

This server user angular on frontend and nodejs on backend.

### Config
- add environment value in src folder
- add your .env  value in server folder
### Installation
- run `npm install` on both project folder and server folder
### Development
- Frontend: `npm start`
- Backend: on server folder `npm start`
- IOS: `ionic capacitor run ios` (deprecated)
- Android: `ionic capacitor run android` (deprecated)
### Sync android and ios app
- `ionic capacitor sync` (deprecated)

### Build
- Take a look at ionic doc for build android and ios (deprecated)
- web build: `ng build`

## Demo
https://angularchat-3abc4.web.app
