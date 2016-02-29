/**
 * MDL Avatar
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
(function() {
    'use strict';

    /**
     * Class constructor for Avatar MDL component.
     * Implements MDL component design pattern defined at:
     * https://github.com/jasonmayes/mdl-component-design-pattern
     *
     * @param {HTMLElement} element The element that will be upgraded.
     */
    var MaterialAvatar = function MaterialAvatar(element) {
        this.element_ = element;

        // reset data (otherwise multiple instances may use each other's data)
        this.GrAvatarSecured_ = (window.location.protocol === "https:");
        this.FormInputElementName_ = '';
        this.DefaultImage_ = '';
        this.GalleryPath_ = '';
        this.Gallery_ = [];
        this.AvatarType_ = 'gallery';
        this.AppliedAvatarType_ = 'gallery';
        this.I18n_ = {
            gallery: {name: 'Gallery', icon: 'image'},
            gravatar: {name: 'GR Avatar', icon: 'assignment_ind'},
            url: {name: 'URL', icon: 'language'},
            upload: {name: 'Upload', icon: 'file_upload'}
        };

        // Initialize instance.
        this.init();
    };
    window.MaterialAvatar = MaterialAvatar;

    /**
     * Store strings for class names defined by this component that are used in
     * JavaScript. This allows us to simply change it in one place should we
     * decide to modify at a later date.
     *
     * @enum {String}
     * @private
     */
    MaterialAvatar.prototype.CssClasses_ = {
        IS_UPGRADED: 'is-upgraded',
        IS_FOCUSED: 'is-focused',
        IS_CHECKED: 'is-checked',
        IS_SELECTED: 'is-selected',
        IS_SHOW: 'is-show',
        IS_ACTIVE: 'is-active',
        IS_INVALID: 'is-invalid',
        IS_DIRTY: 'is-dirty',
        JS_AVATAR: 'mdl-js-avatar',
        RADIO_BTN: 'mdl-radio__button',
        AVATAR_OVERLAY: 'mdl-avatar-overlay',
        AVATAR_LABEL: 'mdl-avatar__label',
        AVATAR__LIST_LABEL: 'mdl-avatar-list__label',
        AVATAR_INPUT: 'mdl-avatar__input',
        AVATAR_IMAGE: 'mdl-avatar__image',
        AVATAR_APPLY: 'mdl-avatar__apply',
        AVATAR_CANCEL: 'mdl-avatar__cancel',
        AVATAR_TYPE: 'mdl-avatar__type',
        AVATAR_FILE: 'mdl-avatar__file',
        TEXTFIELD_LABEL: 'mdl-textfield__label',
        TEXTFIELD_FLOATING: 'mdl-textfield--floating-label',
        TEXTFIELD_INPUT: 'mdl-textfield__input',
        TEXTFIELD_ERROR: 'mdl-textfield__error',
        BUTTON_AVATAR_JS: 'mdl-js-button',
        MATERIAL_ICONS: 'material-icons'
    };

    /**
     * If use HTTPS or not
     *
     * @type {boolean}
     * @private
     */
    MaterialAvatar.prototype.GrAvatarSecured_ = false;

    /**
     * Custom event for close the overlay
     *
     * @type {string}
     * @private
     */
    MaterialAvatar.prototype.OverlayCloseEvent_ = 'overlayCloseEvent';

    /**
     * Form element name attribute
     *
     * @type {string}
     * @private
     */
    MaterialAvatar.prototype.FormInputElementName_ = '';

    /**
     * Default image path
     *
     * @type {string}
     * @private
     */
    MaterialAvatar.prototype.DefaultImage_ = '';

    /**
     * Gallery path
     *
     * @type {string}
     * @private
     */
    MaterialAvatar.prototype.GalleryPath_ = '';

    /**
     * Gallery images
     *
     * @type {Array}
     * @private
     */
    MaterialAvatar.prototype.Gallery_ = [];

    /**
     * Avatar type flag
     *
     * @type {string}
     * @private
     */
    MaterialAvatar.prototype.AvatarType_ = 'gallery';

    /**
     * Applied avatar type flag
     *
     * @type {string}
     * @private
     */
    MaterialAvatar.prototype.AppliedAvatarType_ = 'gallery';

    /**
     * Custom labels for the type selection
     *
     * @type {{gallery: string, gravatar: string, url: string, upload: string}}
     * @private
     */
    MaterialAvatar.prototype.I18n_ = {
        gallery: {name: 'Gallery', icon: 'image'},
        gravatar: {name: 'GR Avatar', icon: 'assignment_ind'},
        url: {name: 'URL', icon: 'language'},
        upload: {name: 'Upload', icon: 'file_upload'}
    };

    /**
     * Input validation patterns
     *
     * @private
     */
    MaterialAvatar.prototype.dataPattern_ = {
        email: '[a-z0-9]([a-z0-9\\.\\-]*[a-z0-9])@[a-z0-9]([a-z0-9\\.\\-]*[a-z0-9])\\.[a-z]{2,4}',
        url: 'https?:\\/\\/[a-z0-9]([a-z0-9\\.\\-]*[a-z0-9\\.\\-])?\\.[a-z]{2,4}\\/?[a-zA-Z0-9\\.\\/?\\-_#%&@=+]*\\.(jpg|jpeg|gif|png|svg)'
    };

    /**
     * MD5 encrypter. Based on the brilliant code of Joseph Myers.
     * @link http://www.myersdaily.org/joseph/javascript/md5-text.html
     *
     * @param {string} value
     */
    MaterialAvatar.prototype.md5 = function(value) {
        var add32 = function(a, b) {
            return (a + b) & 0xFFFFFFFF;
        };

        var md5cycle = function(x, k) {
            var a = x[0], b = x[1], c = x[2], d = x[3];

            a = ff(a, b, c, d, k[0], 7, -680876936);
            d = ff(d, a, b, c, k[1], 12, -389564586);
            c = ff(c, d, a, b, k[2], 17,  606105819);
            b = ff(b, c, d, a, k[3], 22, -1044525330);
            a = ff(a, b, c, d, k[4], 7, -176418897);
            d = ff(d, a, b, c, k[5], 12,  1200080426);
            c = ff(c, d, a, b, k[6], 17, -1473231341);
            b = ff(b, c, d, a, k[7], 22, -45705983);
            a = ff(a, b, c, d, k[8], 7,  1770035416);
            d = ff(d, a, b, c, k[9], 12, -1958414417);
            c = ff(c, d, a, b, k[10], 17, -42063);
            b = ff(b, c, d, a, k[11], 22, -1990404162);
            a = ff(a, b, c, d, k[12], 7,  1804603682);
            d = ff(d, a, b, c, k[13], 12, -40341101);
            c = ff(c, d, a, b, k[14], 17, -1502002290);
            b = ff(b, c, d, a, k[15], 22,  1236535329);

            a = gg(a, b, c, d, k[1], 5, -165796510);
            d = gg(d, a, b, c, k[6], 9, -1069501632);
            c = gg(c, d, a, b, k[11], 14,  643717713);
            b = gg(b, c, d, a, k[0], 20, -373897302);
            a = gg(a, b, c, d, k[5], 5, -701558691);
            d = gg(d, a, b, c, k[10], 9,  38016083);
            c = gg(c, d, a, b, k[15], 14, -660478335);
            b = gg(b, c, d, a, k[4], 20, -405537848);
            a = gg(a, b, c, d, k[9], 5,  568446438);
            d = gg(d, a, b, c, k[14], 9, -1019803690);
            c = gg(c, d, a, b, k[3], 14, -187363961);
            b = gg(b, c, d, a, k[8], 20,  1163531501);
            a = gg(a, b, c, d, k[13], 5, -1444681467);
            d = gg(d, a, b, c, k[2], 9, -51403784);
            c = gg(c, d, a, b, k[7], 14,  1735328473);
            b = gg(b, c, d, a, k[12], 20, -1926607734);

            a = hh(a, b, c, d, k[5], 4, -378558);
            d = hh(d, a, b, c, k[8], 11, -2022574463);
            c = hh(c, d, a, b, k[11], 16,  1839030562);
            b = hh(b, c, d, a, k[14], 23, -35309556);
            a = hh(a, b, c, d, k[1], 4, -1530992060);
            d = hh(d, a, b, c, k[4], 11,  1272893353);
            c = hh(c, d, a, b, k[7], 16, -155497632);
            b = hh(b, c, d, a, k[10], 23, -1094730640);
            a = hh(a, b, c, d, k[13], 4,  681279174);
            d = hh(d, a, b, c, k[0], 11, -358537222);
            c = hh(c, d, a, b, k[3], 16, -722521979);
            b = hh(b, c, d, a, k[6], 23,  76029189);
            a = hh(a, b, c, d, k[9], 4, -640364487);
            d = hh(d, a, b, c, k[12], 11, -421815835);
            c = hh(c, d, a, b, k[15], 16,  530742520);
            b = hh(b, c, d, a, k[2], 23, -995338651);

            a = ii(a, b, c, d, k[0], 6, -198630844);
            d = ii(d, a, b, c, k[7], 10,  1126891415);
            c = ii(c, d, a, b, k[14], 15, -1416354905);
            b = ii(b, c, d, a, k[5], 21, -57434055);
            a = ii(a, b, c, d, k[12], 6,  1700485571);
            d = ii(d, a, b, c, k[3], 10, -1894986606);
            c = ii(c, d, a, b, k[10], 15, -1051523);
            b = ii(b, c, d, a, k[1], 21, -2054922799);
            a = ii(a, b, c, d, k[8], 6,  1873313359);
            d = ii(d, a, b, c, k[15], 10, -30611744);
            c = ii(c, d, a, b, k[6], 15, -1560198380);
            b = ii(b, c, d, a, k[13], 21,  1309151649);
            a = ii(a, b, c, d, k[4], 6, -145523070);
            d = ii(d, a, b, c, k[11], 10, -1120210379);
            c = ii(c, d, a, b, k[2], 15,  718787259);
            b = ii(b, c, d, a, k[9], 21, -343485551);

            x[0] = add32(a, x[0]);
            x[1] = add32(b, x[1]);
            x[2] = add32(c, x[2]);
            x[3] = add32(d, x[3]);
        };

        var cmn = function(q, a, b, x, s, t) {
            a = add32(add32(a, q), add32(x, t));
            return add32((a << s) | (a >>> (32 - s)), b);
        };

        var ff = function(a, b, c, d, x, s, t) {
            return cmn((b & c) | ((~b) & d), a, b, x, s, t);
        };

        var gg = function(a, b, c, d, x, s, t) {
            return cmn((b & d) | (c & (~d)), a, b, x, s, t);
        };

        var hh = function(a, b, c, d, x, s, t) {
            return cmn(b ^ c ^ d, a, b, x, s, t);
        };

        var ii = function(a, b, c, d, x, s, t) {
            return cmn(c ^ (b | (~d)), a, b, x, s, t);
        };

        var md51 = function(s) {
            var n = s.length,
                state = [1732584193, -271733879, -1732584194, 271733878], i;
            for (i = 64; i <= s.length; i += 64) {
                md5cycle(state, md5blk(s.substring(i - 64, i)));
            }
            s = s.substring(i - 64);
            var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
            for (i = 0; i < s.length; i++) {
                tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
            }

            tail[i >> 2] |= 0x80 << ((i % 4) << 3);

            if (i > 55) {
                md5cycle(state, tail);
                for (i = 0; i < 16; i++) tail[i] = 0;
            }

            tail[14] = n * 8;
            md5cycle(state, tail);

            return state;
        };

        var md5blk = function(s) {
            var md5blks = [], i;
            for (i=0; i<64; i+=4) {
                md5blks[i>>2] = s.charCodeAt(i)
                    + (s.charCodeAt(i+1) << 8)
                    + (s.charCodeAt(i+2) << 16)
                    + (s.charCodeAt(i+3) << 24);
            }
            return md5blks;
        };

        var hex_chr = '0123456789abcdef'.split('');

        var rhex = function(n) {
            var s='', j=0;
            for(; j<4; j++) {
                s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
            }
            return s;
        };

        var hex = function(x) {
            for (var i=0; i<x.length; i++) {
                x[i] = rhex(x[i]);
            }
            return x.join('');
        };

        if (hex(md51('hello')) != '5d41402abc4b2a76b9719d911017c592') {
            add32 = function(x, y) {
                var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                    msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return (msw << 16) | (lsw & 0xFFFF);
            }
        }

        return hex(md51(value));
    };

    /**
     * Checks if target is within container
     *
     * @param {object} event
     * @param {object} containerElement
     * @retrun {bool}
     */
    MaterialAvatar.prototype.isWithinElement_ = function(event, containerElement) {
        if (typeof event.path != 'undefined') {
            return  ~event.path.indexOf(containerElement);
        } else if (event.target == containerElement) {
            return true;
        } else {
            var element = event.target.parentNode;
            while (element) {
                if (element == containerElement) {
                    return true;
                }
                element = element.parentNode;
            }
        }

        return false;
    };

    /**
     * Fallback function for check string ending
     *
     * @param string
     * @param search
     * @returns {boolean}
     * @private
     */
    MaterialAvatar.prototype.isStringEndsWith_ = function(string, search) {
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
     * @param {string} variant
     * @returns {string}
     * @private
     */
    MaterialAvatar.prototype.getFieldNameVariant_ = function(inputElement, variant) {
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
     * Centralized event handler proxy to avoid conflicts between event handlers for the component.
     * Handles the event only within the current component
     *
     * @param event
     * @private
     */
    MaterialAvatar.prototype.clickEventHandler_ = function(event) {
        if (this.isWithinElement_(event, this.element_)) {
            var element = event.target;
            if (element.classList.contains(this.CssClasses_.AVATAR_OVERLAY)) {
                this.openOverlay_(event);
            } else if (element.classList.contains(this.CssClasses_.RADIO_BTN)) {
                this.openStepTwo_(event);
            } else if (element.classList.contains(this.CssClasses_.AVATAR_APPLY)) {
                this.applyChange_(event);
            } else if (element.classList.contains(this.CssClasses_.AVATAR_CANCEL)) {
                this.resetOverlay_(event);
            }
        } else {
            this.resetOverlay_(event);
        }
    };

    /**
     * Open the overlay
     *
     * @param event
     * @private
     */
    MaterialAvatar.prototype.openOverlay_ = function(event) {
        var overlayElement = event.target;

        if (overlayElement.classList.contains(this.CssClasses_.AVATAR_OVERLAY)
            && !overlayElement.classList.contains(this.CssClasses_.IS_SHOW)
        ) {
            // show options overlay
            overlayElement.querySelector('.select').classList.add(this.CssClasses_.IS_ACTIVE);
            overlayElement.classList.add(this.CssClasses_.IS_SHOW);
        }
    };

    /**
     * Open the specified overlay. The event must be triggered only by the radio button focus.
     *
     * @param event
     * @private
     */
    MaterialAvatar.prototype.openStepTwo_ = function(event) {
        var overlayElement = this.element_.querySelector('.' + this.CssClasses_.AVATAR_OVERLAY);

        if (overlayElement.classList.contains(this.CssClasses_.IS_SHOW)) {
            // hide options overlay
            overlayElement.querySelector('.select').classList.remove(this.CssClasses_.IS_ACTIVE);
            // open apply overlay if exists
            var option = event.target.value;
            var secondaryOverlay = overlayElement.querySelector('.' + option);

            if (secondaryOverlay) {
                this.AvatarType_ = option;

                // set the selected avatar type for the POST
                var hiddenElement = this.element_.querySelector('input[type=hidden]');
                if (hiddenElement) {
                    hiddenElement.value = option;
                }

                secondaryOverlay.classList.add(this.CssClasses_.IS_ACTIVE);
            }
        }
    };

    /**
     * Apply changes from step two
     *
     * @param event
     * @private
     */
    MaterialAvatar.prototype.applyChange_ = function(event) {
        // prevent default action
        event.preventDefault();
        var applied = false;

        switch (this.AvatarType_) {
            case 'gallery':
                applied = this.applyGalleryChange_(event);
                break;

            case 'gravatar':
                applied = this.applyGravatarChange_(event);
                break;

            case 'url':
                applied = this.applyUrlChange_(event);
                break;

            case 'upload':
                applied = this.applyUploadChange_(event);
                break;
        }

        if (applied) {
            // register avatar type as applied
            this.AppliedAvatarType_ = this.AvatarType_;
            // reset and close overlay by firing a custom event
            try {
                var overlayCloseEvent = new Event(this.OverlayCloseEvent_);
                document.dispatchEvent(overlayCloseEvent);
            } catch (exp) {
                document.body.click();
            }
        }
    };

    /**
     * Apply selected gallery element
     *
     * @param event
     * @returns {boolean}
     * @private
     */
    MaterialAvatar.prototype.applyGalleryChange_ = function(event) {
        var overlayElement = this.element_.querySelector('.' + this.CssClasses_.AVATAR_OVERLAY);

        // do it only when the overlay is visible
        if (overlayElement.classList.contains(this.CssClasses_.IS_SHOW)) {
            // register new default image
            this.DefaultImage_ = event.target.src;
            // set the form input value too
            this.element_.querySelector('.' + this.CssClasses_.AVATAR_INPUT).value = this.DefaultImage_;
            // set avatar
            this.element_.querySelector('.' + this.CssClasses_.AVATAR_IMAGE).src = this.DefaultImage_;
            // deal with gallery images
            var galleryImages = this.element_.querySelectorAll('.gallery img.' + this.CssClasses_.AVATAR_APPLY);
            for (var i = 0, num = galleryImages.length; i < num; i++) {
                // reset the previous selected
                if (galleryImages[i].classList.contains(this.CssClasses_.IS_SELECTED)) {
                    galleryImages[i].classList.remove(this.CssClasses_.IS_SELECTED);
                }
                // set new selected
                if (galleryImages[i].src == this.DefaultImage_) {
                    galleryImages[i].classList.add(this.CssClasses_.IS_SELECTED);
                }
            }
        }

        return true;
    };

    /**
     * Check and apply GR Avatar value
     *
     * @param event
     * @returns {boolean}
     * @private
     */
    MaterialAvatar.prototype.applyGravatarChange_ = function(event) {
        var overlayElement = this.element_.querySelector('.' + this.CssClasses_.AVATAR_OVERLAY);

        // do it only when the overlay is visible
        if (overlayElement.classList.contains(this.CssClasses_.IS_SHOW)) {
            var textInputElement = overlayElement.querySelector('.gravatar .' + this.CssClasses_.TEXTFIELD_INPUT);
            // check native browser validation
            var canValidate = (typeof textInputElement.willValidate !== "undefined");
            var isValid = canValidate ? textInputElement.checkValidity() : true;

            if (!isValid) {
                if (canValidate) {
                    var errorElement = overlayElement.querySelector('.gravatar .' + this.CssClasses_.TEXTFIELD_ERROR);
                    if (errorElement) {
                        errorElement.innerHTML = textInputElement.validationMessage;
                    }
                }
                return false;
            } else {
                event.preventDefault();
                var baseUrl = this.GrAvatarSecured_ ? 'https://secure.gravatar.com/avatar/' : 'http://www.gravatar.com/avatar/';
                var gravatarImageUrl = baseUrl + this.md5(textInputElement.value) + '?r=g&d=' + encodeURIComponent('') + '&size=256';
                var avatarImage = this.element_.querySelector('.' + this.CssClasses_.AVATAR_IMAGE);
                var inputElement = this.element_.querySelector('.' + this.CssClasses_.AVATAR_INPUT);
                var reference = this;
                var tmpImage = new Image;

                tmpImage.onload = function() {
                    // register new default image
                    reference.DefaultImage_ = gravatarImageUrl;
                    // set avatar
                    avatarImage.src = gravatarImageUrl;
                    inputElement.value = gravatarImageUrl;
                };

                try { tmpImage.src = gravatarImageUrl; } catch (exp){}
            }
        }

        return true;
    };

    /**
     * Check and apply URL value
     *
     * @param event
     * @returns {boolean}
     * @private
     */
    MaterialAvatar.prototype.applyUrlChange_ = function(event) {
        var overlayElement = this.element_.querySelector('.' + this.CssClasses_.AVATAR_OVERLAY);

        // do it only when the overlay is visible
        if (overlayElement.classList.contains(this.CssClasses_.IS_SHOW)) {
            var textInputElement = overlayElement.querySelector('.url .' + this.CssClasses_.TEXTFIELD_INPUT);
            // check native browser validation
            var canValidate = (typeof textInputElement.willValidate !== "undefined");
            var isValid = canValidate ? textInputElement.checkValidity() : true;

            if (!isValid) {
                if (canValidate) {
                    var errorElement = overlayElement.querySelector('.url .' + this.CssClasses_.TEXTFIELD_ERROR);
                    if (errorElement) {
                        errorElement.innerHTML = textInputElement.validationMessage;
                    }
                }
                return false;
            } else {
                event.preventDefault();
                var imageUrl = textInputElement.value;
                var avatarImage = this.element_.querySelector('.' + this.CssClasses_.AVATAR_IMAGE);
                var inputElement = this.element_.querySelector('.' + this.CssClasses_.AVATAR_INPUT);
                var reference = this;
                var tmpImage = new Image;

                tmpImage.onload = function() {
                    // register new default image
                    reference.DefaultImage_ = imageUrl;
                    // set avatar
                    avatarImage.src = imageUrl;
                    inputElement.value = imageUrl;
                };

                try { tmpImage.src = textInputElement.value; } catch (exp){ }
            }
        }

        return true;
    };

    /**
     * Check and apply upload value
     *
     * @param event
     * @returns {boolean}
     * @private
     */
    MaterialAvatar.prototype.applyUploadChange_ = function(event) {
        var overlayElement = this.element_.querySelector('.' + this.CssClasses_.AVATAR_OVERLAY);

        // do it only when the overlay is visible
        if (overlayElement.classList.contains(this.CssClasses_.IS_SHOW)) {
            event.preventDefault();
            try {
                var avatarImage = this.element_.querySelector('.' + this.CssClasses_.AVATAR_IMAGE);
                var inputElement = this.element_.querySelector('.' + this.CssClasses_.AVATAR_INPUT);
                var file    = this.element_.querySelector('.upload input[type=file]').files[0];
                var reader  = new FileReader();
                var reference = this;

                reader.onload = function () {
                    // register new default image
                    reference.DefaultImage_ = reader.result;
                    // set avatar
                    avatarImage.src = reader.result;
                    inputElement.value = file.name;
                };

                // try to read the file from the client's file system
                if (file) {
                    reader.readAsDataURL(file);
                }
            } catch (exp) {}
        }

        return true;
    };

    /**
     * Cancel changes, reset component to init state
     *
     * @param event
     * @private
     */
    MaterialAvatar.prototype.resetOverlay_ = function(event) {
        var overlayElement = this.element_.querySelector('.' + this.CssClasses_.AVATAR_OVERLAY);

        // do it only when the overlay is visible
        if (overlayElement.classList.contains(this.CssClasses_.IS_SHOW)) {
            // don't prevent default behavior when the user clicks inside the component unless it is the Cancel button
            if (this.isWithinElement_(event, overlayElement) && !event.target.classList.contains(this.CssClasses_.AVATAR_CANCEL)) {
                return true;
            }
            // prevent default functionality
            event.preventDefault();
            // reset avatar image if changed
            this.element_.querySelector('input.' + this.CssClasses_.AVATAR_INPUT).value = this.DefaultImage_;
            this.element_.querySelector('img.' + this.CssClasses_.AVATAR_IMAGE).src = this.DefaultImage_;

            // reset the selected avatar type if the change was cancelled
            if (this.AvatarType_ != this.AppliedAvatarType_) {
                var hiddenElement = this.element_.querySelector('input[type=hidden]');
                if (hiddenElement) {
                    hiddenElement.value = this.AppliedAvatarType_;
                }
                this.AvatarType_ = this.AppliedAvatarType_;
            }

            // reset select buttons
            var checkedRadio = overlayElement.querySelector('.select .' + this.CssClasses_.IS_CHECKED);
            if (checkedRadio) {
                checkedRadio.querySelector('input').checked = false;
                checkedRadio.classList.remove(this.CssClasses_.IS_CHECKED);
            }

            // reset input fields
            var gravatarInputField = overlayElement.querySelector('.gravatar input.' + this.CssClasses_.TEXTFIELD_INPUT);
            if (gravatarInputField) {
                gravatarInputField.value = '';
                gravatarInputField.parentNode.classList.remove(this.CssClasses_.IS_FOCUSED);
                gravatarInputField.parentNode.classList.remove(this.CssClasses_.IS_DIRTY);
                gravatarInputField.parentNode.classList.remove(this.CssClasses_.IS_INVALID);
            }

            var urlInputField = overlayElement.querySelector('.url input.' + this.CssClasses_.TEXTFIELD_INPUT);
            if (urlInputField) {
                urlInputField.value = '';
                urlInputField.parentNode.classList.remove(this.CssClasses_.IS_FOCUSED);
                urlInputField.parentNode.classList.remove(this.CssClasses_.IS_DIRTY);
                urlInputField.parentNode.classList.remove(this.CssClasses_.IS_INVALID);
            }

            // The file input won't reset since it cannot be restored (don't know how yet)

            // hide opened sub-overlay (must be maximum one)
            var subOverlay = overlayElement.querySelector('.' + this.CssClasses_.IS_ACTIVE);
            if (subOverlay) {
                subOverlay.classList.remove(this.CssClasses_.IS_ACTIVE);
            }
            // hide overlay
            overlayElement.classList.remove(this.CssClasses_.IS_SHOW);
        }
    };

    /**
     * Initialize component.
     */
    MaterialAvatar.prototype.init = function() {
        if (this.element_) {
            // the first input element will always be the one with the stored data
            var avatarInput = this.element_.querySelector('.' + this.CssClasses_.AVATAR_INPUT);
            // the input and label container
            var mdlContainer = avatarInput.parentNode;

            // prepare the working data
            this.FormInputElementName_ = avatarInput.getAttribute('name');
            this.DefaultImage_ = avatarInput.value;

            if (avatarInput.hasAttribute('data-i18n-gallery')) {
                this.I18n_.gallery.name = avatarInput.getAttribute('data-i18n-gallery');
            }

            if (avatarInput.hasAttribute('data-i18n-gravatar')) {
                this.I18n_.gravatar.name = avatarInput.getAttribute('data-i18n-gravatar');
            }

            if (avatarInput.hasAttribute('data-i18n-url')) {
                this.I18n_.url.name = avatarInput.getAttribute('data-i18n-url');
            }

            if (avatarInput.hasAttribute('data-i18n-upload')) {
                this.I18n_.upload.name = avatarInput.getAttribute('data-i18n-upload');
            }

            // register gallery elements
            this.Gallery_.push(this.DefaultImage_);

            // If specific path is given
            if (avatarInput.hasAttribute('data-gallery-src')) {
                this.GalleryPath_ = avatarInput.getAttribute('data-gallery-src');
                // the path must end with slash
                if (!this.isStringEndsWith_(this.GalleryPath_, '/')) {
                    this.GalleryPath_ += '/';
                }
            }

            // If additional gallery images are provided
            if (avatarInput.hasAttribute('data-gallery-list')) {
                var imageList = avatarInput.getAttribute('data-gallery-list').split(',');

                for (var i = 0, num = imageList.length; i < num; i++) {
                    var image = imageList[i];

                    // if we have gallery path given and the image path doesn't start with slash, we make it alternative to the gallery path
                    if (this.GalleryPath_ != '' && image.indexOf('/') !== 0) {
                        image = this.GalleryPath_ + image;
                    }
                    this.Gallery_.push(image);
                }
            }

            var hiddenTypeName = this.getFieldNameVariant_(this.FormInputElementName_, 'type');
            // Create hidden input for the type (default value is 'gallery') if not exists
            var hiddenTypeElement = this.element_.querySelector('.' + this.CssClasses_.AVATAR_TYPE);
            if (!hiddenTypeElement) {
                hiddenTypeElement = document.createElement('input');
                hiddenTypeElement.setAttribute('type', 'hidden');
                hiddenTypeElement.setAttribute('name', this.getFieldNameVariant_(this.FormInputElementName_, 'type'));
                hiddenTypeElement.classList.add(this.CssClasses_.AVATAR_TYPE);
                this.element_.appendChild(hiddenTypeElement);
            } else {
                hiddenTypeName = hiddenTypeElement.getAttribute('name');
            }
            // overwrite if anything else was given
            hiddenTypeElement.value = 'gallery';

            // Generate default name attribute value for the new file input
            var fileInputName = this.getFieldNameVariant_(this.FormInputElementName_, 'file');
            // Remove file input if supplied
            var defaultFileInput = this.element_.querySelector('input[type=file');
            if (defaultFileInput) {
                // Save the given name attribute
                fileInputName = defaultFileInput.getAttribute('name');
                defaultFileInput.parentNode.removeChild(defaultFileInput);
            }

            // Create avatar image
            var imageElement = document.createElement('img');
            imageElement.src = this.DefaultImage_;
            imageElement.classList.add(this.CssClasses_.AVATAR_IMAGE);
            this.element_.appendChild(imageElement);

            // Create overlay container
            var overlayElement = document.createElement('div');
            overlayElement.classList.add(this.CssClasses_.AVATAR_OVERLAY);



            // The select overlay
            var selectOverlay = '<div class="select"><ul class="mdl-list">';
            for (var i in this.I18n_) {
                selectOverlay += '<li class="mdl-list__item">' +
                    '<span class="mdl-list__item-primary-content"><i class="material-icons  mdl-list__item-avatar">' + this.I18n_[i].icon + '</i>' +
                    '<label class="mdl-avatar-list__label" for="' + hiddenTypeName + '-' + i + '">' + this.I18n_[i].name + '</label></span>' +
                    '<span class="mdl-list__item-secondary-action"><label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="' + hiddenTypeName + '-' + i + '">' +
                    '<input type="radio" id="' + hiddenTypeName + '-' + i + '" class="mdl-radio__button" name="' + hiddenTypeName + '" value="' + i + '" />' +
                    '</label></span>' +
                    '</li>';
            }
            selectOverlay += '</ul></div>';

            // Gallery overlay
            var galleryOverlay = '<div class="gallery">';
            for (var i = 0, num = this.Gallery_.length; i < num; i++) {
                galleryOverlay += '<img src="' + this.Gallery_[i] + '" class="mdl-avatar__apply' +
                    (this.Gallery_[i] == this.DefaultImage_ ? ' ' + this.CssClasses_.IS_SELECTED : '') + '">';
            }
            galleryOverlay += '</div>';

            // GR Avatar overlay
            var gravatarOverlay = '<div class="gravatar">' +
                '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">' +
                '<input class="mdl-textfield__input" type="email" pattern="' + this.dataPattern_.email + '" placeholder="bar@foo.org" value="">' +
                '<label class="mdl-textfield__label">' + this.I18n_.gravatar.name + '</label>' +
                '<span class="mdl-textfield__error"></span>' +
                '</div>' +
                '<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ' + this.CssClasses_.AVATAR_APPLY + '"><i class="material-icons ' + this.CssClasses_.AVATAR_APPLY + '">done</i></button>' +
                '<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored ' + this.CssClasses_.AVATAR_CANCEL + '"><i class="material-icons ' + this.CssClasses_.AVATAR_CANCEL + '">delete_forever</i></button>' +
                '</div>';

            // URL overlay
            var urlOverlay = '<div class="url">' +
                '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">' +
                '<input class="mdl-textfield__input" type="url" pattern="' + this.dataPattern_.url + '" placeholder="http://www.foo.org/bar.jpg" value="">' +
                '<label class="mdl-textfield__label">' + this.I18n_.url.name + '</label>' +
                '<span class="mdl-textfield__error"></span>' +
                '</div>' +
                '<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ' + this.CssClasses_.AVATAR_APPLY + '"><i class="material-icons ' + this.CssClasses_.AVATAR_APPLY + '">done</i></button>' +
                '<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored ' + this.CssClasses_.AVATAR_CANCEL + '"><i class="material-icons ' + this.CssClasses_.AVATAR_CANCEL + '">delete_forever</i></button>' +
                '</div>';

            // Upload overlay
            var uploadOverlay = '<div class="upload">' +
                '<div class="mdl-file mdl-js-file mdl-file--floating-label">' +
                '<input type="file" name="' + fileInputName + '" id="' + fileInputName + '" accept=".jpg,.png,.gif,.svg">' +
                '<label class="mdl-file__label" for="' + fileInputName + '">' + this.I18n_.upload.name + '</label>' +
                '</div>' +
                '<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab ' + this.CssClasses_.AVATAR_APPLY + '"><i class="material-icons ' + this.CssClasses_.AVATAR_APPLY + '">done</i></button>' +
                '<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored ' + this.CssClasses_.AVATAR_CANCEL + '"><i class="material-icons ' + this.CssClasses_.AVATAR_CANCEL + '">delete_forever</i></button>' +
                '</div>';

            // this is faster than creating every element by DOM one-by-one
            overlayElement.innerHTML = selectOverlay + galleryOverlay + gravatarOverlay + urlOverlay + uploadOverlay;
            this.element_.appendChild(overlayElement);

            // Switch to MDL label (if exists)
            var labelElement = mdlContainer.querySelector('.' + this.CssClasses_.AVATAR_LABEL);
            labelElement.classList.add(this.CssClasses_.TEXTFIELD_LABEL);

            // Force the label to be focused
            mdlContainer.classList.add(this.CssClasses_.IS_FOCUSED);
            mdlContainer.classList.add(this.CssClasses_.TEXTFIELD_FLOATING);

            // apply MDL on new elements
            componentHandler.upgradeDom();

            // Set up events
            document.addEventListener('click', this.clickEventHandler_.bind(this));
            document.addEventListener(this.OverlayCloseEvent_, this.resetOverlay_.bind(this));
        }
    };

    // The component registers itself. It can assume componentHandler is available in the global scope.
    componentHandler.register({
        constructor: MaterialAvatar,
        classAsString: 'MaterialAvatar',
        cssClass: 'mdl-js-avatar',
        widget: true
    });
})();