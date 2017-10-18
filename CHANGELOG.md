Change log
==========

Version 1.7.1
-------------
* Fix typo (by [Hersonls](https://github.com/hersonls))

Version 1.7.0
-------------
* Add ```componentRegistry``` object to be able to retrieve the proper MDL Component instance for a DOM element:
* Add ```resetInput_()``` function, and support for FORM reset for the `FileComponent`.
* Update package creator script:
  * Change `sass` to `node-sass` and generate source-map along with the compressed CSS file.
  * Remove YUICompressor.
  * Add `uglifyjs` and generate source-map along with the compressed JS file.
  * Automatically `zip` package files.  
* Get rid of the composer from this project.

Version 1.6.9
-------------
* Minor fixes

Version 1.6.8
-------------
* Check compatibility with MDL 1.3.0

Version 1.6.7
-------------
* Forgot to update NPM package

Version 1.6.6
-------------
* Fix issue with file upload preview when multiple avatar components used on the same page. 

Version 1.6.5
-------------
* Publish to npm

Version 1.6.4
-------------
* Fix IE issues

Version 1.6.3
-------------
* Fix JS selector syntax error for Safari
 
Version 1.6.2
-------------
* _undocumented_
 
Version 1.6.1
-------------
* _undocumented_

Version 1.6
-----------
* Initial version of the Avatar Component
* Add bash file to make package creation easy

Version 1.5.2
-------------
* File Input Component
  * Add support for file extension filtering (documentation only)
  
Version 1.5.1
-------------
* File Input Component
  * Add support of arrayed input IDs (eg.: avatar[default-image])

Version 1.5
-----------
* KVL Component
  * Remove hardcoded color values from CSS (follow the MDL's color scheme)
  * Add more elegant rendering for the label and the Add button (get rid of floating)

Version 1.4.1
-------------
* Add combined SCSS file and modified the README file how to generate package
* Use combined minified files and vendor files in snippets
* Removed WebHemi specific colors (use [MDL Color Theme package](https://github.com/Gixx/mdl-color-theme) in the future)

Version 1.4
-----------
* Add combined and versioned packages
* KVL Component
  * Add support for labeling the key field too.

Version 1.3
-----------
* Initial version of the File Input Component.
* Move Google MDL into vendor folder
* Corrected license issues

Version 1.2
-----------
* Rename repository to give space for other features

Version 1.1
-----------
* KVL Component
  * Fixed the CSS issue with the focused elements.
  * Add custom placeholder support.
  * Now all *key* and *value* elements get the `required` attribute by default.
  * Add support of different HTML5 input types for the *value* fields: `text`, `url`, `email` and `tel`.
  * Add customizable input pattern for the *value* elements.
 

Version 1.0
-----------
* Initial version of the Key-Value List (KVL) component.
