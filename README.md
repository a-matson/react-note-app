# Note-taking app

This app allows you to add/edit/remove notes.

## Running server

To run the app first navigate to `note-app` directory.

In the directory install node modules and build the app by running:

```bash
npm install
npm run build
```

Then start the server with `node` the `server.js` as follows:

```bash
node server.js
```

## Options for the server

Easy to adjust options for running the server could be found in the `config.json` file and include:
- `PORT` indicates which port to run the app at;
- `DIR` indicates where the static website directory is located relative to the `server.js` file
- `DB` indicates the location of the database file for JSON-server, potentially an object can be passed if a state should not be saved when the server is shut down.
