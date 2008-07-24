// -----------------------------------------------------------------------------
// --- visualvm.dev.java.net customizations ------------------------------------
// --- 
// --- author: Jiri Sedlacek ---------------------------------------------------
// -----------------------------------------------------------------------------


// Sets "long-life" cookie (expires December 31th, 2020)
function setCookie(name, value) {
    var cookie_string = name + "=" + escape(value);
    cookie_string += "; expires=" + new Date(2020, 12, 31).toGMTString();
    cookie_string += "; domain=.visualvm.dev.java.net";
    cookie_string += "; path=/";
    document.cookie = cookie_string;
}

// Gets cookie
function getCookie(name) {
    var results = document.cookie.match ('(^|;) ?' + name + '=([^;]*)(;|$)');
    if (results) return unescape(results[2]);
    else return null;
}

// Enables custom theme
function customTheme() {
    setCookie(DISABLE_VISUALVM_THEME, "false");
    history.go(0);
}

// Disables custom theme
function defaultTheme() {
    setCookie(DISABLE_VISUALVM_THEME, "true");
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
    headerHTML.push("<div id='visualvm_logo'><a href='https://visualvm.dev.java.net/index.html'><img src='https://visualvm.dev.java.net/theme/images/banner_logo.png'/></a></div>");
    headerHTML.push("<div id='javanet_logo'><a href='http://www.java.net/'><img src='https://visualvm.dev.java.net/theme/images/banner_javanet.png'/></a></div>");
    headerHTML.push("<div id='logobar_clear'></div>");
    headerHTML.push("</div>");
    
    headerHTML.push("<div id='menu'>");
    headerHTML.push("<a class='menu_link' href='https://visualvm.dev.java.net/index.html'>Home</a>");
    headerHTML.push("<a class='menu_link' href='https://visualvm.dev.java.net/features.html'>Features</a>");
    headerHTML.push("<a class='menu_link' href='https://visualvm.dev.java.net/download.html'>Download</a>");
    headerHTML.push("<a class='menu_link' href='https://visualvm.dev.java.net/docindex.html'>Documentation</a>");
    headerHTML.push("<a class='menu_link' href='https://visualvm.dev.java.net/plugins.html'>Plugins</a>");
    headerHTML.push("&nbsp;|&nbsp;");
    headerHTML.push("<a class='menu_link_minor' href='https://visualvm.dev.java.net/servlets/ProjectIssues'>Issues</a>");
    headerHTML.push("<a class='menu_link_minor' href='https://visualvm.dev.java.net/servlets/ProjectMailingListList'>Mailing Lists</a>");
    headerHTML.push("<a class='menu_link_minor' href='https://visualvm.dev.java.net/source/browse/visualvm/'>Sources</a>");
    headerHTML.push("</div>");
    
    if (devmode == "true") {
        headerHTML.push("<div id='pageactions'>");
        headerHTML.push("Page actions:");
        headerHTML.push("</div>");
    }
    
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
    footerHTML.push("      Project owners: <a href='mailto:jsedlacek@dev.java.net'>Jiri Sedlacek</a>, <a href='mailto:thurka@dev.java.net'>Tomas Hurka</a> |");
    footerHTML.push("      License: <a href='https://visualvm.dev.java.net/legal/gplv2+ce.html'>GPLv2&nbsp;+&nbsp;CE</a> |");
    footerHTML.push("      <a href='mailto:feedback@visualvm.dev.java.net'>Feedback</a> |");
    footerHTML.push("      <a href='javascript:defaultTheme();'>Default Theme</a>");
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

// Updates Project Tools in default theme
function updateProjectTools() {
    var toolsHTML = [];
    
    toolsHTML.push("<li><a href=\"https://visualvm.dev.java.net/features.html\">Features</a></li>");
    toolsHTML.push("<li><a href=\"https://visualvm.dev.java.net/download.html\">Download</a></li>");
    toolsHTML.push("<li><a href=\"https://visualvm.dev.java.net/docindex.html\">Documentation</a></li>");
    toolsHTML.push("<li><a href=\"https://visualvm.dev.java.net/plugins.html\">Plugins</a></li>");
    toolsHTML.push("<li><a href=\"javascript:customTheme();\">VisualVM project theme</a></li>");
    
    var containerElement = document.getElementById("project_tools_2");
    containerElement.innerHTML = toolsHTML.join('');
}


// Completes web page for displaying
function finishPage() {
    // Show page contents
    document.body.style.display="block";

    // jump to anchor if one is given
    if (window.location.hash != null && window.location.hash != "")
        window.location.hash = window.location.hash;
}

// Attaches click event to an element
function startListening(element, eventhandler) {
    if (element.addEventListener) element.addEventListener("click", eventhandler, false);
    else if (element.attachEvent) element.attachEvent("onclick", eventhandler);
}

// Tracks mailto: link
function trackMailto(event) {
    var href = (event.srcElement) ? event.srcElement.href : this.href;
    var mailto = "/mailto/" + href.substring(7);
    pageTracker._trackPageview(mailto);
}

// Tracks link
function trackLink(event) {
    var e = (event.srcElement) ? event.srcElement : this;
    while (e.tagName != "A") e = e.parentNode;
    var link = (e.pathname.charAt(0) == "/") ? e.pathname : "/" + e.pathname;
    if (e.search && e.pathname.indexOf(e.search) == -1) link += e.search;
    if (e.hostname != location.host) link = "/external_link/" + e.hostname + link;
    pageTracker._trackPageview(link);
} 

// Setup Google Analytics page tracking
function trackPage() {
    
    // Default Google Analytics
    pageTracker = _gat._getTracker("UA-1306237-2");
    pageTracker._initData();
    pageTracker._trackPageview();
    
    // Custom tracking files, mailtos and external links
    if (document.getElementsByTagName) {
        var links = document.getElementsByTagName("a");
        for (var i = 0; i < links.length; i++) {
            if (links[i].protocol == "mailto:") startListening(links[i], trackMailto);
            else if (links[i].hostname == location.host) {
                var path = links[i].pathname + links[i].search;
                var isDocument = path.match(/(?:zip|torrent|nbm|pdf|odt)($|\&)/);
                if (isDocument) startListening(links[i], trackLink);
            } else startListening(links[i], trackLink);
        }
    }

}


// -------------------------------------------------------------------------
// --- Code entrypoint, customizing site appearance by default -------------
// -------------------------------------------------------------------------

// Google Analytics page tracker
var pageTracker;

// Predefined cookie controlling site customizations
var DISABLE_VISUALVM_THEME = "disable_visualvm_theme_cookie";
var disableTheme = getCookie(DISABLE_VISUALVM_THEME);

// Predefined cookie controlling site development/production mode
var DEVMODE_FLAG_COOKIE = "devmode_flag_cookie";
var devmode = getCookie(DEVMODE_FLAG_COOKIE);


// Apply visualvm css style
document.write('<link rel="stylesheet" type="text/css" href="https://visualvm.dev.java.net/css/visualvm.css"/>');

// Add a favicon
document.write('<link rel="icon" type="image/png" href="https://visualvm.dev.java.net/favicon.png">');
document.write('<link rel="shortcut icon" type="image/png" href="https://visualvm.dev.java.net/favicon.png">');


if (disableTheme == "true") { // Site branding is default java.net
    
    // Show non-customized page contents
    document.body.style.display="block";
    
    // Update Project Tools
    updateProjectTools();
    
    // window.onload hook for Google Analytics
    addLastLoadEventHandler(function() {
        
        // Complete web page for displaying
        finishPage();
        
        // Google Analytics
        trackPage();
    });
    
} else { // Site branding is customized
    
    // Apply custom css style
    document.write('<link rel="stylesheet" type="text/css" href="https://visualvm.dev.java.net/theme/css/theme.css"/>');
    
    // window.onload hook making the customizations
    addLastLoadEventHandler(function() {
        
        // Create custom header
        createHeader();
        
        // Create custom footer
        createFooter();

        // Complete web page for displaying
        finishPage();
        
        // Google Analytics
        trackPage();
    });
    
}