/**
 * faqapp components namespace
 *
 * @namespace faqapp
 */

/**
 * jQuery Namespace
 *
 * @namespace jQuery
 */

/**
 * jquery.fn is used for prototype methods on all jquery objects.
 *
 * @class fn
 *
 * @memberOf jQuery
 */

$(document).ready(function()
{
    "use strict";

    $("[data-faqmodule]").com_faqapp_enhanceAsfaqComponent(faqData);
    $("[data-autocompletemodule]").com_faqapp_enhanceAsfaqAutocomplete();
    $("#searchform").com_faqapp_enhanceAsfaqSearch(faqData);
    $(".faq__content, .searchresult").on('click', '.faq-content__question', function () {
        var question = $(this);
        // remove all acivestates
        question.parent().find('.faq-content__question').removeClass('active');
        question.addClass('active');
    });
    $(".faq__content, .searchresult").on('click', '.faq-content__question.active', function () {
        $(this).removeClass('active');
    })
});