/**
 * Component Extensions for the Material Design Light in CSS, JS and HTML
 *
 * This library is a fork of the original Material Design Light library
 * @link      https://github.com/google/material-design-lite
 *
 * @author    Gabor Ivan <gixx@gixx-web.com>
 * @copyright 2012 - 2017 Gixx-web (http://www.gixx-web.com)
 * @license   https://opensource.org/licenses/MIT The MIT License (MIT)
 * @link      http://www.gixx-web.com
 */

if (typeof componentHandler === 'undefined') {
    throw new ReferenceError('You must include the Material Design Lite library first!');
}

/**
 * Component registry.
 *
 * @constructor
 */
var componentRegister = {
    /** @var {Number} */
    idCounter : 1,

    /** @var {Object} */
    registry : {},

    /**
     * Sets a component element into the registry.
     *
     * @param {HTMLElement} element
     * @param {*} component
     */
    setComponentElement : function(element, component)
    {
        if (!element.hasAttribute('id')) {
            element.setAttribute('id', 'generated-identifier-' + this.idCounter++)
        }

        var elementId = element.getAttribute('id');

        this.registry[elementId] = {
            'element': element,
            'component': component
        };
    },

    /**
     * Gets a component for a DOM element.
     *
     * @param {string} elementId
     * @return {null|Object}
     */
    getComponentById : function(elementId)
    {
        if (typeof this.registry[elementId] !== 'undefined') {
            return this.registry[elementId].component;
        }

        throw new ReferenceError('The element with id "'+elementId+'" is not a registered MDL component.');
    }
};

document.addEventListener('mdl-componentupgraded', function (event) {
    var element = event.target;
    var components = element.getAttribute('data-upgraded').split(',');
    var component = null;

    for (var i = 0; i < components.length; i++) {
        if (typeof event.target[components[i]] !== 'undefined') {
            component = event.target[components[i]];
            break;
        }
    }

    componentRegister.setComponentElement(element, component);
}, true);


// import src/file/file.js
// import src/kvl/kvl.js
// import src/avatar/avatar.js
