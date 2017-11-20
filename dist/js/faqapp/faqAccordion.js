(function (jQuery) {
    "use strict";

    if (!jQuery.com) {
        jQuery.com = {};
    }

    if (!jQuery.com.faqapp) {
        jQuery.com.faqapp = {};
    }
    jQuery.com.faqapp.faqAccordion = function (el) {
        /**
         * To avoid scope issues, use 'base' instead of 'this'
         * to reference this class from internal events and functions.
         */

        var base = this;

        /**
         * init plugin on element
         */

        base.init = function () {

            // Access to jQuery and DOM versions of element
            base.el = el;
            base.$el = jQuery(el);

            console.log("log");
        };

        // call init function to instantiate the module
        base.init();
    };

    /**
     * Converts a given element so to have faqAccordion functionality.
     */
    jQuery.fn.com_faqapp_enhanceAsfaqAccordion = function (options) {
        return this.each(function () {
            if (!jQuery.data(this, 'faqAccordion')) {
                jQuery.data(this, 'faqAccordion', new jQuery.com.faqapp.faqAccordion(this, options));
            }
        });
    };

})(jQuery);