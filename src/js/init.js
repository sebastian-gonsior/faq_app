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
});