(function (jQuery) {
    "use strict";

    if (!jQuery.com) {
        jQuery.com = {};
    }

    if (!jQuery.com.faqapp) {
        jQuery.com.faqapp = {};
    }
    jQuery.com.faqapp.faqComponent = function (el, faqObj) {
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

            // get DOM elements to render results
            base.$categories = base.$el.find('[data-categories]');
            base.$content = base.$el.find('[data-content]');


            // draw categories and content
            $.each( base.faqObj, function( key, value ) {
                var categoryId = key;
                base.$categories.append('<div data-category="cat_'+categoryId+'">' + value.menu + '</div>');
                base.$content.append('<div data-category="cat_'+categoryId+'" class="faq__category-wrapper"></div>');
                $.each(value.fragen, function (key, value) {
                    base.$content.find('[data-category="cat_'+categoryId+'"]').append('<div class="faq-content__question">' + value.frage + '</div>');
                    base.$content.find('[data-category="cat_'+categoryId+'"]').append('<div class="faq-content__answer">' + value.antwort + '</div>');
                });
            });

            // on click hide or show content
            $("[data-category]").on('click', function () {

                base.$el.parents('body').find('[data-content]').show();
                base.$el.parents('body').find('[data-searchresult]').hide();

                // Remove all active classes
                $("[data-category]").each(function () {
                    $(this).removeClass('active');
                });
                // Set clicked element active
                $(this).addClass('active');
                var activeCat = $(this).data('category');
                // Show & hide content
                $('[data-content] > div').each(function(){
                    if ($(this).data('category') === activeCat) {
                        $(this).show()
                    } else {
                        $(this).hide()
                    }
                });
            })
        };

        // call init function to instantiate the module
        base.init();
    };

    /**
     * Converts a given element so to have faqComponent functionality.
     */
    jQuery.fn.com_faqapp_enhanceAsfaqComponent = function (options) {
        return this.each(function () {
            if (!jQuery.data(this, 'faqComponent')) {
                jQuery.data(this, 'faqComponent', new jQuery.com.faqapp.faqComponent(this, options));
            }
        });
    };

})(jQuery);