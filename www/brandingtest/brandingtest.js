
// Sets "long-life" cookie (expires December 31th, 2020)
function setCookie(name, value) {
    var cookie_string = name + "=" + escape(value);
    cookie_string += "; expires=" + new Date(2020, 12, 31).toGMTString();
    cookie_string += "; domain=visualvm.dev.java.net";
    cookie_string += "; path=/brandingtest";
    document.cookie = cookie_string;
}

// Gets cookie
function getCookie(name) {
    var results = document.cookie.match ('(^|;) ?' + name + '=([^;]*)(;|$)');
    if (results) return unescape(results[2]);
    else return null;
}

// Enables custom theme
function enableTheme() {
    setCookie(CUSTOMIZE_SITE, "true");
    history.go(0);
}

// Disables custom theme
function disableTheme() {
    setCookie(CUSTOMIZE_SITE, "false");
    history.go(0);
}

// Adds new window.onload handler (FIFO)
function addLastLoadEventHandler(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) oldonload();
            func();
        }
    }
}

// Adds new window.onload handler (LIFO)
function addFirstLoadEventHandler(func) {
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
    
    headerHTML.push("<div id='loginbar'>");
    headerHTML.push("<div id='loginbar_message'>" + tasksMessage + "</div>");
    headerHTML.push("<div id='loginbar_login'>" + loginMessage + "</div>");
    headerHTML.push("<div id='loginbar_clear'></div>");
    headerHTML.push("</div>");
    
    headerHTML.push("<div id='logobar'>");
    headerHTML.push("<div id='visualvm_logo'><a href='https://visualvm.dev.java.net/brandingtest/testindex.html'><img src='https://visualvm.dev.java.net/brandingtest/imgs/banner_logo.png'/></a></div>");
    headerHTML.push("<div id='javanet_logo'><a href='http://www.java.net/'><img src='https://visualvm.dev.java.net/brandingtest/imgs/banner_javanet.png'/></a></div>");
    headerHTML.push("<div id='logobar_clear'></div>");
    headerHTML.push("</div>");
    
    headerHTML.push("<div id='menu'>");
    headerHTML.push("<a class='menu_link' href='https://visualvm.dev.java.net/brandingtest/testindex.html'>Home</a>");
    headerHTML.push("<a class='menu_link' href='https://visualvm.dev.java.net/brandingtest/features.html'>Features</a>");
    headerHTML.push("<a class='menu_link' href='https://visualvm.dev.java.net/brandingtest/download.html'>Download</a>");
    headerHTML.push("<a class='menu_link' href='https://visualvm.dev.java.net/docindex.html'>Documentation</a>");
    headerHTML.push("<a class='menu_link' href='https://visualvm.dev.java.net/brandingtest/plugins.html'>Plugins</a>");
    headerHTML.push("&nbsp;|&nbsp;");
    headerHTML.push("<a class='menu_link_minor' href='https://visualvm.dev.java.net/source/browse/visualvm/'>Sources</a>");
    headerHTML.push("<a class='menu_link_minor' href='https://visualvm.dev.java.net/servlets/ProjectIssues'>Issues</a>");
    headerHTML.push("<a class='menu_link_minor' href='https://visualvm.dev.java.net/servlets/ProjectMailingListList'>Mailing Lists</a>");
    headerHTML.push("</div>");
    
    var containerElement = document.createElement("div");
    containerElement.id = "header";
    containerElement.innerHTML = headerHTML.join('');

    // Inject header <div> before collabnet section
    var topTabsElement = document.getElementById("collabnet");
    document.body.insertBefore(containerElement, topTabsElement);
}

// Creates custom footer
function createFooter() {
    // Create footer <div>
    var footerHTML = [];
    
    footerHTML.push("<div id='cfooter_links_container'>");
    footerHTML.push("  <div id='cfooter_links'>");

    footerHTML.push("    <div id='project_links'>");
    footerHTML.push("      Owners: <a href='mailto:jsedlacek@dev.java.net'>Jiri Sedlacek</a>, <a href='mailto:thurka@dev.java.net'>Tomas Hurka</a> |");
    footerHTML.push("      License: <a href='https://visualvm.dev.java.net/legal/gplv2+ce.html'>GPLv2&nbsp;+&nbsp;CE</a> |");
    footerHTML.push("      <a href='mailto:feedback@visualvm.dev.java.net'>Feedback</a> |");
    footerHTML.push("      <a href='javascript:disableTheme();'>Default Theme</a>");
    footerHTML.push("    </div>");
            
    footerHTML.push("    <div id='portal_links'>");
    footerHTML.push("      <a href='http://java.net/terms.csp'>Terms of Use</a> |");
    footerHTML.push("      <a href='http://www.sun.com/privacy'>Privacy</a> |");
    footerHTML.push("      <a href='http://www.sun.com/suntrademarks/'>Trademarks</a> |");
    footerHTML.push("      <a href='https://java-net.dev.java.net/sitemap.html'>Site Map</a>");
    footerHTML.push("    </div>");

    footerHTML.push("  </div>");
    footerHTML.push("</div>");

    footerHTML.push("<div id='cfooter_logos'>");
            
    footerHTML.push("  <a href='http://www.sun.com/'><img src='https://visualvm.dev.java.net/branding/images/logo_sun_small.gif'/></a>");
    footerHTML.push("  <a href='http://www.oreilly.com/'><img src='https://visualvm.dev.java.net/branding/images/montague_logo_oreilly.gif'/></a>");
    footerHTML.push("  <a href='http://www.collab.net/special/clickpbc0502.html'><img src='https://visualvm.dev.java.net/branding/images/poweredby.gif'/></a>");
            
    footerHTML.push("</div>");

    footerHTML.push("<div id='cfooter_clear'></div>");
    
    var containerElement = document.createElement("div");
    containerElement.id = "cfooter";
    containerElement.innerHTML = footerHTML.join('');
    
    // Inject footer <div> at the end of the document
    document.body.appendChild(containerElement);
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
    addLastLoadEventHandler(function() {
        
        // Create custom header
        createHeader();
        
        // Create custom footer
        createFooter();

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