module.exports = function(app) {
	var handlers = require('./handlers');
	app.get('',handlers.index);
	 app.get('/unsafe', handlers.unsafe);
	 //app.get('/focus', handlers.focus);
    app.get('/handleUnsafeScript',handlers.handleUnsafeScript);
       app.get('/test',handlers.test);
       app.get('/proxy_testing',handlers.proxy_testing);
       app.get('/');
//app.get('/play',handlers.play);
//app.get('/game',handlers.game);
//app.get('/weeby/magic',handlers.weeby);
//app.get('/weeby/key.css',handlers.key);
//app.post('/weeby/flappy',handlers.flappy);


}
