## Introduction
The Material Design Lite (MDL) **file** component is an enhanced file input field, build on the standard HTML `input[type=file]` element. After the component is activated, the `input[type=file]` element is not visible any more, instead a new `attach` button and an `mdl textarea` appear which give the eye-candy.

## Basic use
You can use this component as any other MDL component, except this component needs individual JavaScript and CSS file to be included since this component is not (yet) part of the official MDL library.

### To include an MDL-styled **file** component:

&nbsp;1. Code a `<div>` element to hold the input field.
```html
<div>
...
</div>
```

&nbsp;2. Inside the div, code a `<input type="file">` element with an `id` and `name` attribute of your choice.
```html
<div>
  <input type="file" name="avatar" id="avatar">
</div>
```

&nbsp;3. Also inside the div, after the text field, code a `<label>` element with a `for` attribute whose value matches the `input` element's `id` value, and a short string to be used as the field's placeholder text.
```html
<div>
  <input type="file" name="avatar" id="avatar">
  <label for="avatar">Avatar</label>
</div>
```

&nbsp;4. For the `input` element you can set to be able to upload multiple files at once with the standard `multiple` attribute.
```html
<div>
  <input type="file" name="avatar" id="avatar" multiple="multiple">
  <label for="avatar">Avatar</label>
</div>
```

&nbsp;5. Additionally you can add a special `data-placeholder-multiple` attribute for the container `div` to give a custom text when multiple files were selected. Very useful for translations in non-English applications.
```html
<div data-placeholder-multiple="files had been added to the list">
  <input type="file" name="avatar" id="avatar" multiple="multiple">
  <label for="avatar">Avatar</label>
</div>
```

&nbsp;6. Add one or more MDL classes, separated by spaces, to the div container and the field label using the `class` attribute.
```html
<div class="element file mdl-file mdl-js-file mdl-file--floating-label" data-placeholder-multiple="files had been added to the list">
  <input type="file" name="avatar" id="avatar" multiple="multiple">
  <label class="mdl-file__label" for="avatar">Avatar</label>
</div>
```

The file component is ready for use.

> Please note that this component is not part of the original MDL library and also it is in an early, development state.
