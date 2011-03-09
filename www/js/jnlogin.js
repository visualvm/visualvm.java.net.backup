var JNLogin = {
    _getSsoCookie:
        function () {
            return $.cookies.get('SSO');
        },

    _getCookieComponent:
        function (index) {
            ssoCookie = this._getSsoCookie ();
            bits = ssoCookie.split (':');
            return bits[index];
        },

    username:
        function () {
            return this._getCookieComponent (0);
        },

    expiration:
        function () {
            var expStr = this._getCookieComponent (1);
            var expNum = new Number (expStr);
            return new Date (expNum * 1000);
        },

    loggedIn:
        function () {
            if (this._getSsoCookie ()) {
                var expDate = this.expiration ();
                var today = new Date ();
                return expDate > today;
            } else {
                return false;
            }
        },

    init:
        function (idList) {
            var that = this;

            var username = 'username';
            var login = 'loginbox';
            var logout = 'loggedin';

            if (idList) {
                username = idList.username || username;
                login = idList.login || login;
                logout = idList.logout || logout;
            }

            $(document).ready (function () {
                if (that.loggedIn ()) {
                    $("#" + username).html (that.username ());
                    $("#" + logout).show ();
                } else {
                    $("#" + login).show ();
                };
            });
        }
}.

init ();