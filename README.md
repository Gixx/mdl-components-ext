[![Email](https://img.shields.io/badge/email-navig80@gmail.com-blue.svg?style=flat-square)](mailto:navig80@gmail.com)
[![npm version](https://badge.fury.io/js/mdl-components-ext.svg)](https://badge.fury.io/js/mdl-components-ext)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

# Introduction #
[Material Design Lite](https://github.com/google/material-design-lite) (MDL) from Google is a really great thing if
you want to create semantic websites with nice looking elements that are also fit for mobile devices.

But sooner or later you may face the problem that the components provided by MDL aren't covering all your needs. 
For example, you might need a component that mimics your phone's contact form when dealing with multiple similar
bits of data, like phone numbers: add and remove, change type, set value. Or you might need an MDL-style file uploader,
and so on.
 
This library provides different components as extensions to the official MDL library.
Please read the [The Material Design Lite license](LICENSE-MDL). 

## Requirements ##

- [Node.js / NPM](https://nodejs.org/en/download/)

### Installation ###

You can easily install it via the NPM package manager:

```bash
npm install
```

## How to use ##

The easy way:

- Check the [Material Design Lite Component Extensions](http://mdl.gixx-web.com/getting-started.html) website for detailed instructions.
 
The "geek" way:

- Run the following command to compile the `scss` files and compress `css` and `js` files:

```bash
library/create-package.sh
```

- Include the generated files in your HTML. Refer to each components' `README.md` file for usage and syntax.

## Extras ##

### The `componentRegister` ###

As of version 1.7.0 the `componentRegister` has been introduced. Its purpose is to collect all the `Material*` component
instances and make them retrievable by DOM search:

```html
<div class="mdl-file mdl-js-file mdl-file--floating-label" id="myFileInputElement">
    <input type="file" name="avatar" id="avatar" multiple="multiple" accept=".jpg,.gif,.png,.svg">
    <label class="mdl-file__label" for="avatar">Avatar</label>
    <span class="mdl-textfield__error">You can upload only images.</span>
</div>
```

```javascript
var materialComponent = componentRegister.getComponentById('myFileInputElement');
materialComponent.resetInput_();
```

**Use it carefully!** At Google the developers hid these component instances on purpose and not because they don't know
how to code. But unfortunately, their concept has some disturbing behaviour:

* the developers can't retrieve the Component instances for a DOM element easily
* the Component instances are protected only by the `componentHandler`. But if you reach a component instance, all the 
  properties and methods are public.
  
On one hand, the `componentRegistry` makes it easy to get a component instance for a DOM element (if it exists
and is registered), but it also brings up the problem with the scope. So be very very careful.

### Plans for the future ###

* Supply a standardized `reset()` function for all the MDL-Ext components.
* If possible, add a `reset()` function for the original MDL components.

## Change Log ##

- Check the [Change log](CHANGELOG.md)
