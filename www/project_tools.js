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

// Hides an element
function hideElement(element) {
    if (element != null) element.style.display = "none";
}

// Hides an element defined by Id
function hideElementById(elementId) {
    hideElement(document.getElementById(elementId));
}

// Hides default framework elements
function hideUnwantedElements() {
    // Hide portal header
    hideElementById("collabnet");

    // Hide banner area
//    hideElementById("banner");

    // Hide navigation tabs
    hideElementById("toptabs");

    // Hide breadcrumbs navigation
    hideElementById("breadcrumbs");

    // Hide left navigation column
    hideElementById("navcol");

    // Hide project tasks (Edit Project | If you were registered...)
    var documentPs = document.getElementsByTagName("p");
    for (var ii = 0; ii < documentPs.length; ii++) {
        var documentP = documentPs[ii];
        if (documentP.className == "tasknav") {
            hideElement(documentP);
            break;
        }
    }

    // Hide project header
    hideElementById("apphead");

    // Hide project details
    var documentTables = document.getElementsByTagName("table");
    for (var i = 0; i < documentTables.length; i++) {
        var documentTable = documentTables[i];
        if (documentTable.className == "axial") {
            hideElement(documentTable);
            break;
        }
    }

    // Hide page footer
    hideElementById("footer");
}

// Creates header containing login etc.
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
    headerHTML.push("<div style=\"background: yellow; padding: 2px;\">");
    headerHTML.push("  <div style=\"float: left;\">");
    headerHTML.push(   tasksMessage);
    headerHTML.push("  </div>");
    headerHTML.push("  <div style=\"float: right;\">");
    headerHTML.push(   loginMessage);
    headerHTML.push("  </div>");
    headerHTML.push("  <div style=\"clear: both;\"></div>");
    headerHTML.push("</div>");
    var containerElement = document.createElement("div");
    containerElement.id = "containerElement";
    containerElement.innerHTML = headerHTML.join('');

    // Inject header <div> before hidden banner
    var bannerElement = document.getElementById("banner");
    bannerElement.parentNode.insertBefore(containerElement, bannerElement);
}


// Adds new window.onload handler
function addLoadEventHandler(func) {
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

// -------------------------------------------------------------------------
// --- Code entrypoint, customizing site appearance if enabled -------------
// -------------------------------------------------------------------------


// Predefined cookie controlling site customizations
var CUSTOMIZE_SITE = "customize_site_cookie";
var customizeSite = getCookie(CUSTOMIZE_SITE);


if (customizeSite == "true") {
    // Hide page contents while doing customizations
    hideElement(document.body);

    // window.onload hook making the customizations
    addLoadEventHandler(function() {
        // Hide unwanted default CollabNet elements
        hideUnwantedElements();

//        createHeader();

        // Show page contents
        document.body.style.display = "block";
    });
}