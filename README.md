[![Email](https://img.shields.io/badge/email-navig80@gmail.com-blue.svg?style=flat-square)](mailto:navig80@gmail.com)
[![npm version](https://badge.fury.io/js/mdl-components-ext.svg)](https://badge.fury.io/js/mdl-components-ext)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

# Introduction #
[The Material Design Lite](https://github.com/google/material-design-lite) (MDL) from Google is a really great thing if
you want to create semantic websites with nice looking elements that also fit for mobile devices.

But sooner or later you may face the problem that the components provided by the MDL are not covers all your needs. 
For example you will need a component that works similar to your phones contact form when you deal with multiple similar data, 
like phone numbers: add and remove, change type, set value. Or you need a file uploader that has the style of the MDL. And so on.
 
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

- Run the following commands to compile the `scss` files and compress `css` and `js` files:

```bash
library/create-package.sh
```

- Include the generated files into your HTML and use the syntax described in each components' `README.md` file.

## Extras ##

### The `componentRegister` ###

As of version 1.7.0 the `componentRegister` is being introduced. It's purpose to collect all the `Material*` components
instances and make it retrievable by DOM search:

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

**Use it carefully!** At Google the developers hid these component instances by purpose and not because they don't know
how to code. But unfortunately, their concept has some disturbing behaviour:

* the developers can't retrieve the Component instances for a DOM element easily
* the Component instances are protected only by the `componentHandler`. But if you reach a component instance, all the 
  properties and methods are public.
  
And of course the `componentRegistry` in one hand makes it easy to get a component instance for a DOM element (if exists
and registered), but it also bring up the problem with the scope. So be very very careful.

### Plans for the future ###

* Supply a standardized `reset()` function for all the MDL-Ext components.
* If possible, add `reset()` function for the original MDL components.

## Change Log ##

- Check [Change log](CHANGELOG.md)
