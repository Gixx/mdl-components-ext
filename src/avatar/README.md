## Introduction
The Material Design Lite (MDL) **avatar** component is a special group of input elements for selecting avatar image.

## Basic use
You can use this component as any other MDL component, except this component needs individual JavaScript and CSS file to be included since this component is not (yet) part of the official MDL library.

By default, this component supports only 256x256 pixel images. This may be dynamic in upcoming versions.

### To include an MDL-styled **avatar** component:

&nbsp;1. Code a `<div>` element to hold the input field.
```html
<div>
...
</div>
```

&nbsp;2. Inside the div, code a `<input type="text">` element with an `id` and `name` attribute of your choice. You should set the `value` attribute to the image path that should be displayed (at least a default / blank / placeholder image).
```html
<div>
  <input type="text" name="avatar" id="avatar" value="/img/avatars/default1.jpg">
</div>
```

&nbsp;3. Also inside the div, after the `<input>` element, code a `<label>` element with a `for` attribute whose value matches the `<input>` element's `id` attribute, and a short string to be used as 'title'.
```html
<div>
  <input type="text" name="avatar" id="avatar" value="/img/avatars/default1.jpg">
  <label for="avatar">Avatar</label>
</div>
```

&nbsp;4. Additionally you can add a special `data-gallery-src` and `data-gallery-list` attributes for the `<input>` element to enable a gallery preset for the component. The value of the `data-gallery-list` attribute MUST be a comma-separated list. The value of the `value` attribute will be added to the list automatically, so you can leave it out from the list. In the gallery list you can specify the images with absolute path (start with '/') too.
```html
<div>
  <input type="text" name="avatar" id="avatar" value="/img/avatars/default1.jpg" data-gallery-src="/img/avatars" data-gallery-list="default2.jpg,default3.jpg,/img/myProfilePic.jpg">
  <label for="avatar">Avatar</label>
</div>
```

&nbsp;5. Additionally you can add a special `data-i18n-...` attributes for the `<input>` element to set the translations of the four options: 'Gallery', 'GR Avatar', 'URL', 'Upload File'.
```html
<div>
  <input type="text" name="avatar" id="avatar" value="/img/avatars/default1.jpg" data-gallery-src="/img/avatars" data-gallery-list="default2.jpg,default3.jpg,/img/myProfilePic.jpg" data-i18n-gallery="Default" data-i18n-gravatar="GR" data-i18n-url="Web Address" data-i18n-upload="From local machine">
  <label for="avatar">Avatar</label>
</div>
```

&nbsp;6. Add one or more MDL classes, separated by spaces, to the div container and the field label using the `class` attribute.
```html
<div class="mdl-avatar mdl-js-avatar mdl-avatar--floating-label">
  <input class="mdl-avatar__input" type="text" name="avatar" id="avatar" value="/img/avatars/default1.jpg" data-gallery-src="/img/avatars" data-gallery-list="default2.jpg,default3.jpg,/img/myProfilePic.jpg" data-i18n-gallery="Default" data-i18n-gravatar="GR" data-i18n-url="Web Address" data-i18n-upload="From local machine">
  <label class="mdl-avatar__label" for="avatar">Avatar</label>
</div>
```

### Advanced usage:

When you define the `Avatar Component` described above, you have to prepare your application for some additional data:

* The given `input[type=text]` element will store either the path to chosen image file (internal or external link), or the file name in case of uploading new file.

* There will be an additional data with the name of `...-type`, where the `...` is the value of the input field above. E.g.: if the input field's `name` attribute is `avatarImage`, then the type will be posted as `avatarImage-type`. This data will helps you to decide the way to process the POST data.

* The `Avatar Component` also supports 'arrayed' name attributes, e.g.: if the input filed is `avataImage[defaultProfile]` then the type will be `avataImage[defaultProfile-type]`. 

* There will be a file upload data with the default name of `...-file`, where the `...` is the value of the input field above. E.g.: if the input field's `name` attribute is `avatarImage`, then the type will be posted as `avatarImage-file`.
 
* If your application requires, you can change the default naming behaviour for the file and type data by explicitly define them. In this case the component won't modify the `name` attributes.

```html
<div class="mdl-avatar mdl-js-avatar mdl-avatar--floating-label">
  <input class="mdl-avatar__input" type="text" name="avatar" id="avatar" value="/img/avatars/default1.jpg" data-gallery-src="/img/avatars" data-gallery-list="default2.jpg,default3.jpg,/img/myProfilePic.jpg" data-i18n-gallery="Default" data-i18n-gravatar="GR" data-i18n-url="Web Address" data-i18n-upload="From local machine">
  <input type="hidden" class="mdl-avatar__type" name="avatarProfileType" value="gallery">
  <input type="file" name="avatarProfileImage">
  <label class="mdl-avatar__label" for="avatar">Avatar</label>
</div>
```

* Please not that you have to set `enctype="multipart/form-data"` as the form's attribute to be able to upload any file.
   
* Please note that the default representation of the file upload may be different from the "normal" form data (e.g.: in PHP). Server-side languages / frameworks can handle and standardize this differences (e.g.: Zend Framework for PHP).

The avatar component is ready for use.

> Please note that this component is not part of the original MDL library and also it is in an early, development state.
