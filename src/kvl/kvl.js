/**
 * MDL Key-Value List
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
 * @copyright 2015 Gixx-web (http://www.gixx-web.com)
 * @license   http://webhemi.gixx-web.com/license/new-bsd   New BSD License
 * @link      http://www.gixx-web.com
 */

(function() {
    'use strict';

    /**
     * Class constructor for Key-Value list MDL component.
     * Implements MDL component design pattern defined at:
     * https://github.com/jasonmayes/mdl-component-design-pattern
     *
     * @param {HTMLElement} element The element that will be upgraded.
     */
    var MaterialKeyvaluelist = function MaterialKeyvaluelist(element) {
        this.element_ = element;

        // Initialize instance.
        this.init();
    };
    window.MaterialKeyvaluelist = MaterialKeyvaluelist;

    /**
     * Store strings for class names defined by this component that are used in
     * JavaScript. This allows us to simply change it in one place should we
     * decide to modify at a later date.
     *
     * @enum {String}
     * @private
     */
    MaterialKeyvaluelist.prototype.CssClasses_ = {
        IS_UPGRADED: 'is-upgraded',
        JS_KVL: 'mdl-js-kvl',
        KVL_SOCIALNETS: 'mdl-kvl-socialnetworks',
        KVL_MESSENGERS: 'mdl-kvl-instantmessengers',
        KVL_PHONES: 'mdl-kvl-phones'
    };

    MaterialKeyvaluelist.prototype.listID_ = null;

    /**
     * Add button.
     *
     * @type {{}}
     * @private
     */
    MaterialKeyvaluelist.prototype.addButton_ = {};

    /**
     * The JSON data stored in the textarea.
     *
     * @type {{}}
     * @private
     */
    MaterialKeyvaluelist.prototype.storedValue_ = {};

    /**
     * The key-value list.
     *
     * @type {{}}
     * @private
     */
    MaterialKeyvaluelist.prototype.keyValueList_ = {};

    /**
     * Store datalist names for group of services.
     *
     * @enum {Object}
     * @private
     */
    MaterialKeyvaluelist.prototype.Services_ = {
        'mdl-kvl-socialnetworks': ['Bebo','Facebook','Flickr','Google+','Habbo','Instagram','LinkedIn','Orkut','Qzone','Sina Weibo','Tagged','Tumblr','Twitter','VK','Xing'],
        'mdl-kvl-instantmessengers': ['Aim','AOL On','Ch@t On','Facebook Messenger','FaceTime','Google Hangouts','ICQ','imo','Kakao Talk','line','QQ','Skype','Snapchat','Viber','WeChat','WhatsApp'],
        'mdl-kvl-phones': ['Mobile','Home','Work','Work Fax','Home Fax','Pager','Other','Custom','Callback']
    };

    /**
     * Add new key-value option to the list.
     *
     * @param event
     * @private
     */
    MaterialKeyvaluelist.prototype.addRow_ = function(event) {
        event.preventDefault();
        this.createRow_('','');
        // reset event listeners
        this.resetInputEventListeners_();
    };

    /**
     * Create a new key-value option row in the list.
     *
     * @param key
     * @param value
     * @private
     */
    MaterialKeyvaluelist.prototype.createRow_ = function(key, value) {
        var listElementIndex = this.keyValueList_.childNodes.length;
        var listElement = document.createElement('li');
        listElement.classList.add('mdl-kvl__list-element');

        listElement.innerHTML =
            '<div class="mdl-kvl__list-key mdl-textfield mdl-js-textfield">' +
            '   <input list="mld-kvl-data-' + this.listID_ + '" id="' + this.listID_ + '-key-' + listElementIndex + '" data-value="' + this.listID_ + '-value-' + listElementIndex + '" type="text" class="mdl-textfield__input mdl-kvl__list-element-key" name="' + this.listID_ + '-key[' + listElementIndex + ']" value="' + key + '" pattern=".+" />' +
            '   <label class="mdl-textfield__label" for="' + this.listID_ + '-key-' + listElementIndex + '">Service</label>' +
            '</div>' +
            '<div class="mdl-kvl__list-value mdl-textfield mdl-js-textfield">' +
            '   <input id="' + this.listID_ + '-value-' + listElementIndex + '" data-key="' + this.listID_ + '-key-' + listElementIndex + '" type="text" class="mdl-textfield__input mdl-kvl__list-element-value" name="' + this.listID_ + '-value[' + listElementIndex + ']" value="' + value + '" />' +
            '   <label class="mdl-textfield__label" for="' + this.listID_ + '-value-' + listElementIndex + '">URL</label>' +
            '</div>' +
            '<div class="mdl-kvl__list-remove">' +
            '   <button type="button" class="mdl-button mdl-js-button mdl-button--icon mdl-button--accent">' +
            '       <i class="material-icons">remove</i>' +
            '   </button>' +
            '</div>';

        this.keyValueList_.appendChild(listElement);
        // apply MDL on new elements
        componentHandler.upgradeDom();
    };

    /**
     * (Re)Create the key-value list.
     *
     * @private
     */
    MaterialKeyvaluelist.prototype.resetList_ = function() {
        // if the list already exist, we delete it.
        if (this.element_.getElementsByTagName('ul').length > 0) {
              // then remove all list elements
            this.element_.removeChild(this.element_.querySelector('ul'));
        }

        // Create the new key-value list container
        this.keyValueList_ = document.createElement('ul');
        this.keyValueList_.classList.add('mdl-kvl__list');
        this.element_.appendChild(this.keyValueList_);

        if (this.storedValue_) {
            for (var i in this.storedValue_) {
                this.createRow_(i, this.storedValue_[i]);
            }
        }
        // reset event listeners
        this.resetInputEventListeners_();
    };

    /**
     * Reset event listeners
     *
     * @private
     */
    MaterialKeyvaluelist.prototype.resetInputEventListeners_ = function() {
        var inputs = this.element_.querySelectorAll('.mdl-kvl__list-element input');

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].removeEventListener('change', this.inputChange_);
            inputs[i].addEventListener('change', this.inputChange_.bind(this));
            inputs[i].removeEventListener('keyup', this.inputChange_);
            inputs[i].addEventListener('keyup', this.inputChange_.bind(this));
        }

        var buttons = this.element_.querySelectorAll('.mdl-kvl__list-remove');

        for (i = 0; i < buttons.length; i++)
        {
            buttons[i].removeEventListener('click', this.deleteRow_)
            buttons[i].addEventListener('click', this.deleteRow_.bind(this))
        }
    };

    /**
     * Delete a key-value option.
     *
     * @param event
     * @private
     */
    MaterialKeyvaluelist.prototype.deleteRow_ = function(event)
    {
        event.preventDefault();

        for (var i = 0; i < event.path.length; i++) {
            // stop at document body
            if (event.path[i].tagName == 'BODY') {
                break;
            }

            // detect the row and remove it
            if (event.path[i].tagName == 'LI' && event.path[i].classList.contains('mdl-kvl__list-element')) {
                if (event.path[i].parentNode) {
                    event.path[i].parentNode.removeChild(event.path[i]);
                    // trigger input change event handler to rebuild data store
                    this.inputChange_();
                    // reset event listeners
                    this.resetInputEventListeners_();
                }
                break;
            }
        }
    };

    /**
     * Input change event. Actually it scans all inputs and rebuild the dataStore.
     *
     * @private
     */
    MaterialKeyvaluelist.prototype.inputChange_ = function() {
        var inputs = this.element_.querySelectorAll('.mdl-kvl__list-element input');
        var data = {};

        for (var i = 0; i < inputs.length; i++) {
            /** @var {HTMLElement} */
            var input = inputs[i];
            var key = '';
            var value = '';
            var keyPair = '';
            var valuePair = '';

            // remove error indicator if any
            input.parentNode.classList.remove('is-invalid');

            if (!input.value.trim()) {
                input.parentNode.classList.add('is-invalid');
            } else if (input.classList.contains('mdl-kvl__list-element-key')) {
                // for key
                valuePair = input.getAttribute('data-value');
                key = input.value.trim();
                value = this.element_.querySelector('#' + valuePair).value.trim();
            } else {
                // for value
                keyPair = input.getAttribute('data-key');
                key = this.element_.querySelector('#' + keyPair).value.trim();
                value = input.value.trim();
            }

            if (key && value) {
                data[key] = value;
            }
        }

        // save the data
        this.storedValue_ = data;
        this.element_.querySelector('textarea').value = JSON.stringify(data);
    };

    /**
     * Initialize component.
     */
    MaterialKeyvaluelist.prototype.init = function() {
        if (this.element_) {
            this.listID_ = this.element_.querySelector('textarea').getAttribute('id');

            var initData = document.getElementById(this.listID_).value;

            if (initData) {
                this.storedValue_ = JSON.parse(initData);
            }

            this.addButton_ = document.createElement('div');
            this.addButton_.classList.add('mdl-kvl__list-add');
            this.addButton_.innerHTML =
                '   <button type="button" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">' +
                '       <i class="material-icons">add</i>' +
                '   </button>';

            this.element_.appendChild(this.addButton_);

            // Create <datalist> element if necessary
            for (var i in this.Services_) {
                if (this.element_.classList.contains(i)) {
                    var dataList = document.createElement('datalist');
                    dataList.setAttribute('id', 'mld-kvl-data-' + this.listID_);
                    var options = [];

                    for (var j = 0; j < this.Services_[i].length; j++) {
                        options[j] = document.createElement('option');
                        options[j].setAttribute('value', this.Services_[i][j]);
                        dataList.appendChild(options[j]);
                    }
                    this.element_.appendChild(dataList);
                    break;
                }
            }

            this.resetList_();

            // Add event listeners
            this.addButton_.addEventListener('click', this.addRow_.bind(this));

            this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
        }
    };

    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialKeyvaluelist,
        classAsString: 'MaterialKeyvaluelist',
        cssClass: 'mdl-js-kvl',
        widget: true
    });
})();
