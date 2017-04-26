(function ($) {
    $.extend($.expr[':'], {
        reallyEmpty: function (elem) {
            return !elem.firstChild ||
                elem.firstChild.nodeType === 3 && !!/^\s|\n$/.test(elem.firstChild.textContent);
        }
    });

})(jQuery);

//replace HTML tags
function replaceTags(oldtag, newtag) {
  $(oldtag).replaceWith(function() {
    if ($(oldtag).hasClass('replaced')) {
        return '<' + oldtag + ' class="replaced">' + $(this).text() + '</' + oldtag + '>';
    }else {
        return '<' + newtag + ' class="replaced">' + $(this).html() + '</' + newtag + '>';
    }
  });
}

//get URL Parameter
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};