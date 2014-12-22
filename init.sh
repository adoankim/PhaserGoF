#!/bin/bash
bower install 
mkdir -p public/vendor/js 
ln -s bower_components/phaser/build/phaser.{min.js,map} public/vendor/js