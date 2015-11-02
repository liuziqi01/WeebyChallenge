module.exports = function(app) {
	var handlers = require('./handlers');
	app.get('/', handlers.index);
    app.get('/unsafe', handlers.unsafe);
    app.get('/handleUnsafeReq',handlers.handleUnsafeReq);
    app.get('/test',handlers.test);
//app.get('/play',handlers.play);
//app.get('/game',handlers.game);
//app.get('/weeby/magic',handlers.weeby);
//app.get('/weeby/key.css',handlers.key);
//app.post('/weeby/flappy',handlers.flappy);


}
