// index.js generated by Online Javascript compressor http://javascriptcompressor.com/

// Sets "long-life" cookie (expires December 31th, 2020)
function setCookie(name, value) {
    var cookie_string = name + "=" + escape(value);
    cookie_string += "; expires=" + new Date(2020, 12, 31).toGMTString();
    cookie_string += "; domain=.visualvm.java.net";
    cookie_string += "; path=/";
    document.cookie = cookie_string;
}

// Gets cookie
function getCookie(name) {
    var results = document.cookie.match ('(^|;) ?' + name + '=([^;]*)(;|$)');
    if (results) return unescape(results[2]);
    else return null;
}

// Changes page style to load banner image
function setBannerImage() {
    if (!document.styleSheets) return;
    if (AVAILABLE_BANNERS < 2) return;

    var imageIndex = bannerImageIndex == null ? 1 :
                     parseInt(bannerImageIndex);
    if (imageIndex < 0 || imageIndex > AVAILABLE_BANNERS)
        imageIndex = 1;

    var rules = new Array();
    if (document.styleSheets[STYLESHEET_INDEX].cssRules)
        rules = document.styleSheets[STYLESHEET_INDEX].cssRules;
    else
        rules = document.styleSheets[STYLESHEET_INDEX].rules;
    rules[0].style.backgroundImage =
        "url(http://visualvm.java.net/images/main_background_" + imageIndex + ".jpg)";

    setCookie(BANNER_IMAGE_INDEX, ++imageIndex + '');
}

function addScreenshotsLink() {
    Shadowbox.init({
        skipSetup: true
    });

    var bannertextcontainer = document.getElementById("top_div_info");
    var bannertext = bannertextcontainer.innerHTML;
    bannertext += " <a href=\"javascript:showScreenshots();\">See screenshots</a>.";
    bannertextcontainer.innerHTML = bannertext;
}

// Number of available banner images to display on this page
var AVAILABLE_BANNERS = 6;

// Index of index.css in document
var STYLESHEET_INDEX = 6;

// Predefined cookie tracking banner image to be displayed
var BANNER_IMAGE_INDEX = "banner_image_index_cookie";
var bannerImageIndex = getCookie(BANNER_IMAGE_INDEX);

setBannerImage();