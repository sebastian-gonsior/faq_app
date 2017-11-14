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
            base.$searchResult = base.$el.parents('body').find('.searchresult');
            base.$input = base.$el.find('#autocomplete');

            base.$el.submit(function (event) {
                updateSearchResult(base.$input.val());
                event.preventDefault();
            });

        };

        // call init function to instantiate the module
        base.init();

        function updateSearchResult (resultObj) {

            // set visibility for results
            base.$el.parents('body').find('.faq__content').hide();
            base.$el.parents('body').find('.faq__search').show();

            // array as searchvalues, seperated by space
            var searchValues = resultObj.split(' ');
            // variable for results
            var result = [];
            // remove doubles from results and store it in this var
            var uniqueResults = [];

            // remove last item if its empty (if last char was ' ' in input)
            if (searchValues[searchValues.length - 1] === "") {
                searchValues.pop();
            }

            // some iterations over arrays to filter results
            $.each(searchValues, function (i, searchValue) {
                $.each(base.faqObj, function (index, category) {
                    $.each(category.fragen, function (key, value) {
                        if (value.frage.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0 ||
                            value.antwort.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0) {
                            // push resuts in array
                            result.push(value);
                        }
                    });
                });
            });

            // kick doubles out
            $.each(result, function (i, el) {
                if ($.inArray(el, uniqueResults) === -1) {
                    uniqueResults.push(el);
                }
            });

            // clear result dom element
            base.$searchResult.empty();

            // append results in result dom element if there is a result
            if (uniqueResults.length !== 0) {
                // draw categories and content
                $.each(uniqueResults, function (key, value) {
                    base.$searchResult.append('<div class="faq-content__question">' + value.frage + '</div>');
                    base.$searchResult.append('<div class="faq-content__answer">' + value.antwort + '</div>');
                });

                // mark words

            } else {
                base.$searchResult.append('<h3>Nichts gefunden :(</h3>');
            }
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