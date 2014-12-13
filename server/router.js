
var express = require('express');
var c       = require('./controller.js');
var m       = require('./middleware.js');

module.exports = function(app) {

	//statics
	app.use('/static',        express.static("frontend/"));
	app.use('/node_modules/', express.static("node_modules/"));

	//dynamics
	app.get ("/",                      c.homePage);
	app.post("/",                      c.getRepo);
	app.get ("/select", m.hasUserRepo, c.selectPage);
	app.get ("/cgraph", m.hasUserRepo, c.cgraphPage);
	app.get ("/file",   m.hasUserRepo, c.getFile);
};
