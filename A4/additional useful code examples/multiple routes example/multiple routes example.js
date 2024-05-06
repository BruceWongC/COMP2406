app.get(['/', '/mytunes.html', '/mytunes', '/index.html'], function(req, res, next) {

    res.sendFile(__dirname + '/index.html')
    next()
});
