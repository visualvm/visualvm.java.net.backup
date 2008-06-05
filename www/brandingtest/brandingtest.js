
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


// Creates custom header
function createHeader() {
    // Sniff tasks message (If you were logged... / Edit Project)
    var tasksMessage = "";
    var documentPs = document.getElementsByTagName("p");
    for (var ii = 0; ii < documentPs.length; ii++) {
        var documentP = documentPs[ii];
        if (documentP.className == "tasknav") {
            tasksMessage = documentP.innerHTML;
            break;
        }
    }

    // Sniff login message (Logged in: / Login)
    var loginDiv = document.getElementById("login");
    var loginMessage = "";
    if (loginDiv.childNodes.length == 3) {
        // Mozilla, Safari etc.
        loginMessage = loginDiv.childNodes[1].innerHTML;
    } else {
        // IE
        loginMessage = loginDiv.childNodes[0].innerHTML;
    }

    // Create header <div>
    var headerHTML = [];
    
    headerHTML.push("<div id='header'>");
    
    headerHTML.push("  <div id='loginbar'>");
    headerHTML.push("    <div id='loginbar_message'>" + tasksMessage + "</div>");
    headerHTML.push("    <div id='loginbar_login'>" + loginMessage + "</div>");
    headerHTML.push("    <div id='loginbar_clear'></div>");
    headerHTML.push("  </div>");
    
    headerHTML.push("  <div id='logo'><img src='https://visualvm.dev.java.net/brandingtest/imgs/header.png'/></div>");
    headerHTML.push("  <div id='menu'>");
    headerHTML.push("    <a class='menu_link' href='#'>Home</a>");
    headerHTML.push("    <a class='menu_link' href='#'>Features</a>");
    headerHTML.push("    <a class='menu_link' href='#'>Download</a>");
    headerHTML.push("    <a class='menu_link' href='#'>Documentation</a>");
    headerHTML.push("    <a class='menu_link' href='#'>Plugins</a>");
    headerHTML.push("    &nbsp;|&nbsp;");
    headerHTML.push("    <a class='menu_link_minor' href='#'>Sources</a>");
    headerHTML.push("    <a class='menu_link_minor' href='#'>Issues</a>");
    headerHTML.push("    <a class='menu_link_minor' href='#'>Mailing Lists</a>");
    headerHTML.push("  </div>");
    
    headerHTML.push("</div>");
    
    var containerElement = document.createElement("div");
    containerElement.id = "containerElement";
    containerElement.innerHTML = headerHTML.join('');

    // Inject header <div> between hidden banner and toptabs
    var topTabsElement = document.getElementById("collabnet");
    document.body.insertBefore(containerElement, topTabsElement);
}


// -------------------------------------------------------------------------
// --- Code entrypoint, customizing site appearance if enabled -------------
// -------------------------------------------------------------------------


// Predefined cookie controlling site customizations
var CUSTOMIZE_SITE = "customize_site_cookie";
var customizeSite = getCookie(CUSTOMIZE_SITE);


if (customizeSite == "true") { // Site branding is customized
    
    // Apply custom css style
    document.write('<link rel="stylesheet" type="text/css" href="https://visualvm.dev.java.net/brandingtest/brandingtest.css"/>');
    
    // window.onload hook making the customizations
    addLoadEventHandler(function() {
        
        // Create custom header
        createHeader();

        // Show page contents
        document.body.style.display="block";

	// jump to anchor if one is given
	if (window.location.hash != null && window.location.hash != "")
		window.location.hash = window.location.hash;
    });
    
} else { // Site branding is default one
    
    // Show non-customized page contents
    document.body.style.display="block";
    
}