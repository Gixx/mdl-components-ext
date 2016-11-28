/**
 * MDL File input
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://webhemi.gixx-web.com/license/new-bsd
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@gixx-web.com so we can send you a copy immediately.
 *
 * @author    Gabor Ivan <gixx@gixx-web.com>
 * @copyright 2012 - 2016 Gixx-web (http://www.gixx-web.com)
 * @license   http://webhemi.gixx-web.com/license/new-bsd   New BSD License
 * @link      http://www.gixx-web.com
 */
(function () {
    'use strict';

    /**
     * Class constructor for file input MDL component.
     * Implements MDL component design pattern defined at:
     * https://github.com/jasonmayes/mdl-component-design-pattern
     *
     * @param {HTMLElement} element The element that will be upgraded.
     */
    var MaterialFile = function MaterialFile(element) {
        this.element_ = element;

        // Initialize instance.
        this.init();
    };
    window.MaterialFile = MaterialFile;

    /**
     * Store strings for class names defined by this component that are used in
     * JavaScript. This allows us to simply change it in one place should we
     * decide to modify at a later date.
     *
     * @enum {String}
     * @private
     */
    MaterialFile.prototype.CssClasses_ = {
        IS_UPGRADED: 'is-upgraded',
        JS_FILE: 'mdl-js-file',
        JS_TEXTFIELD: 'mdl-js-textfield',
        FILE_FLOATING: 'mdl-file--floating-label',
        FILE_LABEL: 'mdl-file__label',
        TEXTFIELD: 'mdl-textfield',
        TEXTFIELD_LABEL: 'mdl-textfield__label',
        TEXTFIELD_FLOATING: 'mdl-textfield--floating-label',
        TEXTFIELD_INPUT: 'mdl-textfield__input',
        BUTTON: 'mdl-button',
        BUTTON_PRIMARY: 'mdl-button--primary',
        BUTTON_ICON: 'mdl-button--icon',
        MATERIAL_ICONS: 'material-icons'
    };

    /**
     *
     * @type {string}
     * @private
     */
    MaterialFile.prototype.multipleFilesSelected_ = 'files are selected';

    /**
     * File upload identifier string.
     *
     * @type {string}
     * @private
     */
    MaterialFile.prototype.fileID_ = null;

    /**
     * File name input string;
     *
     * @type {string}
     * @private
     */
    MaterialFile.prototype.fileNameID_ = null;

    /**
     * Fallback function for check string ending
     *
     * @param string
     * @param search
     * @returns {boolean}
     * @private
     */
    MaterialFile.prototype.isStringEndsWith_ = function (string, search) {
        try {
            return string.endsWith(search);
        } catch (exp) {
            var stringLength = string.length;
            var searchLength = search.length;
            return (string == (string.substring(0, (stringLength - searchLength)) + search));
        }
    };

    /**
     * Create a variant name for the original field name.
     * Handles arrayed names as well.
     *
     * @param {*} inputElement
     * @param {string }variant
     * @returns {string}
     * @private
     */
    MaterialFile.prototype.getFieldNameVariant_ = function (inputElement, variant) {
        var fieldName = '';
        var nameVariant = '';

        if (typeof inputElement == 'string') {
            fieldName = inputElement;
        } else {
            fieldName = inputElement.getAttribute('name');
        }

        if (fieldName) {
            if (this.isStringEndsWith_(fieldName, ']')) {
                nameVariant = fieldName.substr(0, (fieldName.length - 1)) + '-' + variant + ']';
            } else {
                nameVariant = fieldName + '-' + variant;
            }
        } else {
            console.warn('No name defined');
        }

        return nameVariant;
    };

    /**
     * Input change event.
     *
     * @private
     */
    MaterialFile.prototype.inputChange_ = function (event) {
        event.preventDefault();
        var fileInput = event.target;
        var selector = this.fileNameID_.replace(/([^a-zA-Z0-9])/g, '\\$1') + '';
        var textInput = this.element_.querySelector('#' + selector);
        var fileCount = fileInput.files.length;

        if (!this.element_.classList.contains('is-focused') && !this.element_.classList.contains('is-dirty')) {
            try {
                var focusEvent = new Event('focus');
                textInput.dispatchEvent(focusEvent);
            } catch (exp) {
                textInput.click();
            }
        }

        if (fileCount > 0 && typeof fileInput.files[0].name != 'undefined') {
            if (fileCount == 1) {
                textInput.setAttribute('value', fileInput.files[0].name);
            } else {
                var label = this.element_.hasAttribute('data-placeholder-multiple')
                    ? this.element_.getAttribute('data-placeholder-multiple')
                    : this.multipleFilesSelected_;

                textInput.setAttribute('value', fileCount + ' ' + label);
            }
            textInput.parentNode.classList.add('is-dirty');
        } else {
            textInput.setAttribute('value', '');
            textInput.parentNode.classList.remove('is-dirty');
        }
    };

    /**
     * Initialize component.
     */
    MaterialFile.prototype.init = function () {
        if (this.element_) {
            // the file input
            var fileInput = this.element_.querySelector('input[type=file]');
            // the file input and label container
            var mdlContainer = fileInput.parentNode;
            // set the IDs
            this.fileID_ = fileInput.getAttribute('id');
            this.fileNameID_ = this.getFieldNameVariant_(this.fileID_, 'filename');

            // update container class list
            if (!mdlContainer.classList.contains(this.CssClasses_.TEXTFIELD)) {
                mdlContainer.classList.add(this.CssClasses_.TEXTFIELD);
            }

            if (!mdlContainer.classList.contains(this.CssClasses_.JS_TEXTFIELD)) {
                mdlContainer.classList.add(this.CssClasses_.JS_TEXTFIELD);
            }

            if (mdlContainer.classList.contains(this.CssClasses_.FILE_FLOATING)) {
                mdlContainer.classList.remove(this.CssClasses_.FILE_FLOATING);
                mdlContainer.classList.add(this.CssClasses_.TEXTFIELD_FLOATING);
            }

            // update the label
            var label = mdlContainer.querySelector('label');
            label.classList.remove(this.CssClasses_.FILE_LABEL);
            label.classList.add(this.CssClasses_.TEXTFIELD_LABEL);
            label.setAttribute('for', this.fileNameID_);

            // add input field
            var textInput = document.createElement('input');
            textInput.setAttribute('type', 'text');
            textInput.setAttribute('id', this.fileNameID_);
            textInput.setAttribute('name', this.fileNameID_);
            textInput.setAttribute('readonly', 'readonly');
            textInput.classList.add(this.CssClasses_.TEXTFIELD_INPUT);
            mdlContainer.insertBefore(textInput, label);

            // create new container for the file input
            var fileInputContainer = document.createElement('div');
            fileInputContainer.classList.add(this.CssClasses_.BUTTON);
            fileInputContainer.classList.add(this.CssClasses_.BUTTON_PRIMARY);
            fileInputContainer.classList.add(this.CssClasses_.BUTTON_ICON);
            mdlContainer.appendChild(fileInputContainer);

            // create attach button
            var attachButton = document.createElement('i');
            attachButton.classList.add(this.CssClasses_.MATERIAL_ICONS);
            fileInputContainer.appendChild(attachButton);

            // button icon
            var textNode = document.createTextNode("attach_file");
            attachButton.appendChild(textNode);

            // replace the file input
            var clonedInput = fileInput.cloneNode(true);
            clonedInput.className = "";
            fileInputContainer.appendChild(clonedInput);
            fileInput.parentNode.removeChild(fileInput);

            // Add event listeners
            clonedInput.addEventListener('change', this.inputChange_.bind(this));

            // apply MDL on new elements
            componentHandler.upgradeDom();
            this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
        }
    };

    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialFile,
        classAsString: 'MaterialFile',
        cssClass: 'mdl-js-file',
        widget: true
    });
})();

