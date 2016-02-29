# Introduction
[The Material Design Lite](https://github.com/google/material-design-lite) (MDL) from Google is a really great thing if
you want to create semantic websites with nice looking elements that also fit for mobile devices.

But sooner or later you may face the problem that the components provided by the MDL are not covers all your needs. 
For example you will need a component that works similar to your phones contact form when you deal with multiple similar data, 
like phone numbers: add and remove, change type, set value. Or you need a file uploader that has the style of the MDL. And so on.
 
This library provides different components as extensions to the official MDL library.
Please read the [The Material Design Lite license](LICENSE-MDL). 
 
Requirements
------------

- [PHP 5.5+](http://php.net/downloads.php) (for composer)
- [Sass](http://sass-lang.com/install) (for compile scss files)
- [Material Design Lite](https://github.com/google/material-design-lite)
- [Java] (http://www.java.com/en/download/mac_download.jsp) (for the YUI compressor)
- [YUI Compressor](http://yui.github.io/yuicompressor/)

Installation
------------

- Download and unzip the source files or clone the repository
- Download and unzip the [Material Design Lite](https://github.com/google/material-design-lite) into the vendor folder or use the composer by running the `php composer.phar install` command to get the required MDL packages
- Use the [YUI Compressor](http://yui.github.io/yuicompressor/) in the library folder

How to use
----------
The easy way:

- Check the [Material Design Lite Component Extensions](http://mdl.gixx-web.com/getting-started.html) website for detailed instructions.
 
The "geek" way:

- Run the following commands to compile the `scss` files and compress `css` and `js` files:

```bash
library/create-package.sh
```

- Include the generated files into your HTML and use the syntax described in each components' `README.md` file.

Change Log
----------

- Check [Change log](CHANGELOG.md)