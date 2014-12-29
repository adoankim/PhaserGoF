#!/bin/bash
bower install 
mkdir -p public/vendor/js 
cp bower_components/phaser/build/phaser.{min.js,map} public/vendor/js
cp bower_components/requirejs/require.js public/vendor/js
cp bower_components/underscore/underscore-{min.js,min.map} public/vendor/js