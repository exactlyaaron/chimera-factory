'use strict';

exports.index = (req, res)=>{
  res.render('home/index', {bg: 'home-bg.jpg', title: 'Gundam Builder'});
};

exports.about = (req, res)=>{
  res.render('home/about', {bg: 'cf-bg.jpg', title: 'Gundam Builder: About'});
};

exports.help = (req, res)=>{
  res.render('home/help', {title: 'Node.js: Help'});
};
