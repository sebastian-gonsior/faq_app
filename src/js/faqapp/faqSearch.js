(function (jQuery) {
    "use strict";

    if (!jQuery.com) {
        jQuery.com = {};
    }

    if (!jQuery.com.faqapp) {
        jQuery.com.faqapp = {};
    }
    jQuery.com.faqapp.faqSearch = function (el, faqObj) {
        /**
         * To avoid scope issues, use 'base' instead of 'this'
         * to reference this class from internal events and functions.
         */

        var base = this;

        /**
         * get the faqObj this class
         */

        base.faqObj = {};

        /**
         * init plugin on element
         */

        base.init = function () {

            // merge options from function arguments with default plugin options
            jQuery.extend(base.faqObj, faqObj);

            // Access to jQuery and DOM versions of element
            base.el = el;
            base.$el = jQuery(el);
            base.$searchResult = base.$el.parents().find('.searchresult');
            base.$input = base.$el.parents().find('#autocomplete');

            // get DOM elements to render results
            base.$input = base.$el.find('#autocomplete');

            base.$el.submit(function (event) {
                var value = base.$input.val();
                updateSearchResult(value);
                event.preventDefault();
            });

        };

        // call init function to instantiate the module
        base.init();

        function updateSearchResult (resultObj) {

            var searchValues = resultObj.split(' ');
            var result = [];

            if (searchValues[searchValues.length - 1] === "") {
                searchValues.pop();
            }

            $.each(searchValues, function (i, searchValue) {
                if (searchValue.length > 2) {
                    $.each(base.faqObj, function (index, category) {
                        $.each(category.fragen, function (key, value) {
                            if (value.frage.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0 || value.antwort.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0) {
                                result.push(value);
                            }
                        });
                    });
                }
            });

            var uniqueRes = [];

            $.each(result, function (i, el) {
                if ($.inArray(el, uniqueRes) === -1) {
                    uniqueRes.push(el);
                }
            });

            base.$searchResult.empty();

            // draw categories and content
            $.each(uniqueRes, function (key, value) {
                base.$searchResult.append('<div class="faq-content__question">' + value.frage + '</div>');
                base.$searchResult.append('<div class="faq-content__answer">' + value.antwort + '</div>');
            });

        }
    };

    /**
     * Converts a given element so to have faqSearch functionality.
     */
    jQuery.fn.com_faqapp_enhanceAsfaqSearch = function (options) {
        return this.each(function () {
            if (!jQuery.data(this, 'faqSearch')) {
                jQuery.data(this, 'faqSearch', new jQuery.com.faqapp.faqSearch(this, options));
            }
        });
    };

})(jQuery);