#!/bin/bash
bower install 
mkdir -p public/vendor/js 
cp bower_components/phaser/build/phaser.{min.js,map} public/vendor/js