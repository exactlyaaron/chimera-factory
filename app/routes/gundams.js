/* jshint unused:false */
'use strict';

var Mongo = require('mongodb');

exports.index = (req, res)=>{
  var gundams = global.nss.db.collection('gundams');

  gundams.find().toArray((err, records)=>{
    res.render('gundams/index', {gundams: records, bg: 'cf-bg.jpg', title: 'Gundam Builder: Gundams'});
  });
};

exports.filter = (req, res)=>{

  var gundams = global.nss.db.collection('gundams');
  var type = req.query.type;

  var mongoObj = {};
  mongoObj[req.query.position] = `${position}-${type}.png`;

  gundams.find(mongoObj).toArray((err, records)=>{
    res.render('gundams/query', {gundams: records, bg: 'cf-bg.jpg', title: 'Gundam Builder: Gundams'});
  });
};

exports.new = (req, res)=>{
  res.render('gundams/new', {bg: 'cf-bg.jpg', title: 'Gundam Builder: Add New'});
};

exports.show = (req, res)=>{
  var gundams = global.nss.db.collection('gundams');
  var _id = Mongo.ObjectID(req.params.id);

  gundams.findOne({_id: _id}, (err, record)=>{
    res.render('gundams/show', {gundam: record, bg: 'cf-bg.jpg', title: 'Gundam Builder: New'});
  });
};

exports.create = (req, res)=>{
  var head;
  var torso;
  var legs;

  switch(req.body.head){
  case 'Deathscythe':
    head = 'head-deathscythe.png';
    break;
  case 'Heavy Arms':
    head = 'head-heavyarms.png';
    break;
  case 'Tallgeese':
    head = 'head-tallgeese.png';
    break;
  case 'Shenlong':
    head = 'head-shenlong.png';
    break;
  case 'Altron':
    head = 'head-altron.png';
    break;
  }

  switch(req.body.torso){
  case 'Deathscythe':
    torso = 'torso-deathscythe.png';
    break;
  case 'Heavy Arms':
    torso = 'torso-heavyarms.png';
    break;
  case 'Tallgeese':
    torso = 'torso-tallgeese.png';
    break;
  case 'Shenlong':
    torso = 'torso-shenlong.png';
    break;
  case 'Altron':
    torso = 'torso-altron.png';
    break;
  }

  switch(req.body.legs){
  case 'Deathscythe':
    legs = 'legs-deathscythe.png';
    break;
  case 'Heavy Arms':
    legs = 'legs-heavyarms.png';
    break;
  case 'Tallgeese':
    legs = 'legs-tallgeese.png';
    break;
  case 'Shenlong':
    legs = 'legs-shenlong.png';
    break;
  case 'Altron':
    legs = 'legs-altron.png';
    break;
  }

  req.body.head = head;
  req.body.torso = torso;
  req.body.legs = legs;
  var gundams = global.nss.db.collection('gundams');

  gundams.save(req.body, (err, object)=>{
    res.redirect(`/gundams/${object._id}`);
  });
};

exports.destroy = (req, res)=>{
  var _id = Mongo.ObjectID(req.params.id);
  var pets = global.nss.db.collection('gundams');

  pets.findAndRemove({_id:_id}, (err, record)=>{
    res.redirect('/gundams');
  });
  console.log(req.params);
};
