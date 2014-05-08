'use strict';

var traceur = require('traceur');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var gundams = traceur.require(__dirname + '/../routes/gundams.js');

  app.get('/', home.index);
  app.get('/about', home.about);

  app.get('/gundams', gundams.index);
  app.get('/gundams/new', gundams.new);
  app.get('/gundams/query', gundams.filter);
  app.get('/gundams/:id', gundams.show);

  app.post('/gundams', gundams.create);
  app.post('/gundams/:id/delete', gundams.destroy);


  app.get('/help', home.help);
  console.log('Routes Loaded');
  fn();
}
