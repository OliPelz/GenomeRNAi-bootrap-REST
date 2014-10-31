/**
 * Google Analytics Anonymize
 * @version 0.1.3
 * @author econtrolling.de
 *
 * taken from http://www.econtrolling.de/datenschutz-google-analytics/
 */

function gaanon() {
	var obj = this;
}

/**
 * gets a cookie value
 * @param String cookieName name of the cookie
 * @return Object cookie value
 */
gaanon.getCookie = function( cookieName ) {
	var cookies = document.cookie.split(";");
	var cookie;
	for( var i=0; i<cookies.length; i++ ){
		cookie = cookies[i].split("=");
		try {
			if( cookie[0].trim() == cookieName ) return cookie[1].trim();
		} catch ( e ) { }
	}
};
/**
 * sets a cookie value
 * @param Object options {name, value [expires]}
 * @return Boolean when successfull
 */
gaanon.setCookie = function( options ) {
	if( !options.name && !options.value )
		return false;

	var str = options.name+"="+options.value+"";
	if( options.expires ) {
    str+=";expires="+options.expires.toGMTString()+"";
  } else {
    str+=";expires=30";
  }
  str+=";path=/";

	document.cookie = str;

	return true;
};

/**
 * gaanon_switcher extension
 * ---- START ----
 */
/**
 * gaanon_switcher constructor
 */
function gaanon_switcher() {
	this.cookieVariable = "GA_ANON_SWITCHER";
	this.cookieExpire  = new Date(new Date().getTime() +1000*60*60*24*365);
}
/**
 * proofs if its active
 * @return boolean
 */
gaanon_switcher.prototype.isActive = function() {
	var c = gaanon.getCookie( this.cookieVariable );
	var a = ( c == "1" || c == undefined );
	return a;
};
/**
 * activates the switcher by setting a cookie
 */
gaanon_switcher.prototype.activate = function() {
	gaanon.setCookie({name: this.cookieVariable, value: "1", expires: this.cookieExpire});
};
/**
 * deactivates the switcher by setting a cookie
 */
gaanon_switcher.prototype.deactivate = function() {
	gaanon.setCookie({name: this.cookieVariable, value: "0", expires: this.cookieExpire});
};

/**
 * switches between activate / deactivate depending on the current status
 */
gaanon_switcher.prototype.toggle = function() {
	( this.isActive() ? this.deactivate() : this.activate() );
};

/**
 * set status of checkbox
 * @param checkbox
 */

gaanon_switcher.prototype.checkStatus = function(box) {
  if ( this.isActive() ) {
    box.checked = true;
  } else {
    box.checked = false;
  }
};

gaanon.prototype.switcher = new gaanon_switcher();

var gaanonym = new gaanon();

/**
 * InternetExplorer String.trim() fix
 */
if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

