# Installation

Node Version: v7.2.1

Just clone this repo or download the zip file. `cd` into the directory and run

    npm install

To use webpack you also need to run

    npm install webpack -g

You might need to run this command as `sudo`.

Once you have the webpack installed, cd into the directory where you cloned this repo and run

    webpack

Note: if you would rather not install webpack globally, you can also run webpack locally:

    node_modules/.bin/webpack

This will create update two files: `server.bundle.js` and `bin/app.bundle.js`.

`server.bundle.js` will be used for serving the application on port 3000 and `app.bundle.js` is the actual react app itself.

Finally run

    npm start

The you will be able to access this app from http://localhost:3000.
