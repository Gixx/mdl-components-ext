## Introduction
The Material Design Lite (MDL) **key-value list** component is an enhanced, one level JSON data editor, build on the standard HTML `textarea` element. After the component is activated, the `textarea` element is not visible any more, instead a new `add` button appears which adds new key-value option rows to the component.

While the user simply enters custom (or provided) keys and value pairs on the frontend, the component transform the given data into JSON as the `textarea` element's value.

## Basic use
You can use this component as any other MDL component, except this component needs individual JavaScript and CSS file to be included since this component is not (yet) part of the official MDL library. 

### To include an MDL-styled **key-value list** component:

&nbsp;1. Code a `<div>` element to hold the text field.
```html
<div>
...
</div>
```
&nbsp;2. Inside the div, code a `<textarea>` element with an `id` and `name` attribute of your choice.
```html
<div>
  <textarea name="phone" id="phone"></textarea>
</div>
```
&nbsp;3. Also inside the div, after the text field, code a `<label>` element with a `for` attribute whose value matches the `textarea` element's `id` value, and a short string to be used as the field's placeholder text.
```html
<div>
  <textarea name="phone" id="phone"></textarea>
  <label for="phone">Phone numbers</label>
</div>
```
&nbsp;4. Add one or more MDL classes, separated by spaces, to the div container, text field, and field label using the `class` attribute.
```html
<div class="mdl-kvl mdl-js-kvl">
    <textarea name="phone" id="phone" class="mdl-kvl__input"></textarea>
    <label class="mdl-kvl__label" for="phone">Phone numbers</label>
</div>
```
The key-value list component is ready for use.

### To include an MDL-styled **key-value list** component with data-list for the key:

There's a possibility the add a prepared data list for the keys in some special cases:

* Phone Numbers
* Social Networks
* Instant Messengers

These lists are not fully covers the possibilities but give a good start by providing the most popular cases. To enable this feature you only need to add a special `class` attribute:

* `mdl-kvl-phones` for phone numbers
* `mdl-kvl-socialnetworks` for the social networks
* `mdl-kvl-instantmessengers` for the instant messengers

#### Examples

A key-value list with initial data and provided data list.
```html
<div class="mdl-kvl mdl-js-kvl mdl-kvl-phones">
    <label class="mdl-kvl__label" for="phones">Phone</label>
    <textarea name="phones" id="phones" class="mdl-kvl__input">{"Home":"+49 123 12345678","Work":"0123 1234 9876"}</textarea>
</div>
```

> Please not that this component is not part of the original MDL library and also it is in an early, development state.