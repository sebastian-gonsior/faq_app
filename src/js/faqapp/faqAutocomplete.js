(function (jQuery) {
    "use strict";

    if (!jQuery.com) {
        jQuery.com = {};
    }

    if (!jQuery.com.faqapp) {
        jQuery.com.faqapp = {};
    }
    jQuery.com.faqapp.faqAutocomplete = function (el) {
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

            // get DOM elements to render results
            base.$input = base.$el.find('#autocomplete');

            // get questions for autocomplete
            base.$question = base.$el.parents('body').find('.faq-content__question');
            base.$answer = base.$el.parents('body').find('.faq-content__answer');
            base.$dialog = base.$el.parents('body').find('.autocomplete__dialog');
            base.$form = base.$el.parents('body').find('#searchform');

            var questionString = '';
            var answerString = '';

            $.each(base.$question, function (key, value) {
                questionString += value.innerHTML + ' ';
            });

            $.each(base.$answer, function (key, value) {
                answerString += value.innerHTML + ' ';
            });

            // remove specialchars
            // some dirty regex
            questionString = questionString.replace(/(<([^>]+)>)/ig, '');
            answerString = answerString.replace(/(<([^>]+)>)/ig, '');

            questionString = questionString.replace(/[?.,()"]/g, '');
            answerString = answerString.replace(/[?.,"()]/g, '');

            questionString = questionString.replace(/^[a-zA-ZäöüÄÖÜ ._-]+$/g, '');
            answerString = answerString.replace(/^[a-zA-ZäöüÄÖÜ ._-]+$/, '');

            // store in array
            var questionStringArray = questionString.split(' ');
            var answerStringArray = answerString.split(' ');

            // remove doublicates
            var uniqueStringArray = [];

            // contact question and answer array
            var searchText = questionStringArray.concat(answerStringArray);

            // remove doubles
            $.each(searchText, function (i, el) {
                if ($.inArray(el, uniqueStringArray) === -1) {
                    uniqueStringArray.push(el);
                }
            });

            // sort it, looks better in overlay
            uniqueStringArray.sort();

            // if there are more than two chars, look for results on keypu
            base.$input.on('keyup', function () {
                if ($(this).val().length > 2) {
                    findResults($(this).val(), uniqueStringArray);
                }
            });

            base.$input.on('blur', function () {
                base.$dialog.removeClass('active');
            });

            base.$input.on('focus', function () {
                if ($(this).val().length > 2) {
                    findResults($(this).val(), uniqueStringArray);
                }
            });

            base.$dialog.on('click', '.autocomplete__item', function () {
                base.$input.val($(this).html());
                base.$form.submit();
            })

        };

        // call init function to instantiate the module
        base.init();

        // find results from questions
        function findResults (val, src) {
            base.$dialog.empty();
            $.each(src, function (srcKey, srcEntry) {
                if (srcEntry.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
                    base.$dialog.addClass('active');
                    base.$dialog.append('<li class="autocomplete__item">'+srcEntry+'</li>');
                }
            });
        }
    };

    /**
     * Converts a given element so to have faqAutocomplete functionality.
     */
    jQuery.fn.com_faqapp_enhanceAsfaqAutocomplete = function (options) {
        return this.each(function () {
            if (!jQuery.data(this, 'faqAutocomplete')) {
                jQuery.data(this, 'faqAutocomplete', new jQuery.com.faqapp.faqAutocomplete(this, options));
            }
        });
    };

})(jQuery);