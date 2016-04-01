module.exports = function(app) {
	var handlers = require('./proxy_handler');
	app.get('/handleUnsafeScript',handlers.handleUnsafeScript);
    app.get('/handleUnsafeImg',handlers.handleUnsafeImg);
    app.get('/focus',handlers.focus);
    app.get('/adsafe.js',handlers.adsafeFile);
}
