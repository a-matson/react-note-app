// modules
const {PORT, DIR, DB } = require('./config.json');
const path = require('path');
const jsonServer = require('json-server');

// settings
const STATIC = path.resolve(__dirname, DIR);
const INDEX = path.resolve(STATIC, 'index.html');

const server = jsonServer.create();
const apiRouter = jsonServer.router(DB);
const middleware = jsonServer.defaults({
	// allowing to serve static files in middleware options
	static: path.join(STATIC),
});

// this actually serves websites
server.use('/', middleware);
// this handles all urls
server.use('/', (req, res, next) => {
	// except api
	if (!req.originalUrl.startsWith('/api')) {
		// if it's not api we render only index page for all links
		res.sendFile(INDEX);
	// if it is api link it is sent to next function which is the api server
	} else next();
}, apiRouter);

server.listen(PORT);
console.log(`Server runs on ${PORT}`)
