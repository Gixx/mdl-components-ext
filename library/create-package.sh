#!/bin/sh
# change directory to root and compile SCSS files
cd "$(dirname "$0")"/..

echo "Run SASS to compose the component CSS file."
sass src/material.components.ext.scss:material.components.ext.css
echo "Run the YUICompressor to compress the component CSS file."
java -jar library/yuicompressor.jar material.components.ext.css -o package/material.components.ext.min.css
echo "Concat JS files and run YUICompressor to compress the component JS file."
cat ./material.components.ext.js ./src/kvl/kvl.js ./src/file/file.js ./src/avatar/avatar.js | java -jar library/yuicompressor.jar --type js -o package/material.components.ext.min.js
