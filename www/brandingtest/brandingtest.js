
// Sets "long-life" cookie (expires December 31th, 2020)
function setCookie(name, value) {
    var cookie_string = name + "=" + escape(value);
    cookie_string += "; expires=" + new Date(2020, 12, 31).toGMTString();
    document.cookie = cookie_string;
}

// Gets cookie
function getCookie(name) {
    var results = document.cookie.match ('(^|;) ?' + name + '=([^;]*)(;|$)');
    if (results) return unescape(results[2]);
    else return null;
}

// Adds new window.onload handler (FIFO)
function addLoadEventHandler(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            func();
            if (oldonload) oldonload();
        }
    }
}


// -------------------------------------------------------------------------
// --- Code entrypoint, customizing site appearance if enabled -------------
// -------------------------------------------------------------------------


// Predefined cookie controlling site customizations
var CUSTOMIZE_SITE = "customize_site_cookie";
var customizeSite = getCookie(CUSTOMIZE_SITE);


if (customizeSite == "true") {
//    // Hide page contents while doing customizations
//    hideElement(document.body);
    
    document.write('<link rel="stylesheet" type="text/css" href="https://visualvm.dev.java.net/brandingtest/brandingtest.css"/>');
    
    // window.onload hook making the customizations
    addLoadEventHandler(function() {
        // Hide unwanted default CollabNet elements
//        hideUnwantedElements();
        
//        createHeader();

        // Show page contents
        document.body.style.display="block";

	// jump to anchor if one is given
	if (window.location.hash != null && window.location.hash != "")
		window.location.hash = window.location.hash;
    });
} else {
    document.body.style.display="block";
}