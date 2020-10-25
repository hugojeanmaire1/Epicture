# B-DEV-501-NCY-5-1-epicture-alexis.leloup

### Introduction ###
Epicture is a school project where we need to reproduce Imgur and use Imgur API.
We developed a mobile app in order to display, manage and share images.

Author: Alexis Leloup, Hugo Jeanmaire

## Developper Documentation

### Installation ###

In order to run this project you will need:
    
    - NodeJS
    
    - Gradle
    
    - Yarn
    
    
### Launch App ###

If you are on MacOS:
    
    - yarn ios
    
This will launch the IOS simulator with XCode.

For the others, there are two choice:

    - yarn android
    
Like "$ yarn ios" it will run the android simulator or:

    - expo start
    
You have to download expo on your smartphone and scan the QR code, and the app
will be displayed on your smartphone.

### App Scheme

The app is build like this. We have an App.js that is the entry point the program.
Next we have Login.js that allow us to login on the Imgur platform.
Once logged in, we have access to the app, with the Most viral, search bar, our profile
and you can upload photos.

![Alt text](app.png?raw=true "Scheme")


