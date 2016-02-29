#!/bin/sh
# change directory to root and compile SCSS files
cd "$(dirname "$0")"/..

sass src/material.components.ext.scss:material.components.ext.css
java -jar library/yuicompressor.jar material.components.ext.css -o package/material.components.ext.min.css
cat ./material.components.ext.js ./src/kvl/kvl.js ./src/file/file.js ./src/avatar/avatar.js | java -jar library/yuicompressor.jar --type js -o package/material.components.ext.min.js
