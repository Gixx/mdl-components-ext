#!/bin/sh
# change directory to root and compile SCSS files
cd "$(dirname "$0")"/..

if [ -n "$(type -t node-sass)" ]; then
    echo "Run SASS to compose and compress the component CSS file."
    node-sass --output ./package --source-map ./package/material.components.ext.min.css.map --output-style compressed ./src/material.components.ext.scss
    mv ./package/material.components.ext.css ./package/material.components.ext.min.css
    echo "Done."
else
    echo "No SASS is not installed. Use the 'sudo npm install node-sass -g' to install";
    exit 1
fi;

if [ -n "$(type -t uglifyjs)" ]; then
    echo "Run UglifyJS to compose and compress the component JS file."
    cat ./material.components.ext.js > ./package/material.components.ext.js
    for i in $(find ./src -type f -name '*.js');
    do
        cat $i >> ./package/material.components.ext.js;
    done;
    uglifyjs ./package/material.components.ext.js \
        -o ./package/material.components.ext.min.js -c -m \
        --source-map "filename='./package/material.components.ext.js.map'";
    rm -f ./package/material.components.ext.js;

    cat ./material.components.ext.js.meta ./package/material.components.ext.min.js > temp && mv temp ./package/material.components.ext.min.js

    echo "Done."
else
    echo "No UglifyJS is not installed. Use the 'sudo npm install uglify-js -g' to install";
    exit 1
fi;


if [ -n "$(type -t zip)" ]; then
    echo "Create ZIP archive packege."
    zip package/material.components.ext.min.zip package/material.components.ext.min.css package/material.components.ext.min.css.map package/material.components.ext.min.js package/material.components.ext.min.js.map
    echo "Done."
else
    echo "No ZIP is installed."
    exit 1
fi;

echo "Generate snippet index. Use 'php -S localhost:8000' to start webserver."
echo "<html><body>" > index.html; for i in $(find ./src -type f -name '*.html'); do echo "<a href=\"$i\">$i</a><br>" >> index.html; done; echo "</body></html>" >> index.html
echo "Done."
