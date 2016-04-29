function ContentMeter(barSelector, contSelector, options) {

	this.barSelector = barSelector;
	this.contSelector = contSelector;

	this.options = options;
	this.defaults = {};
	this.settings = {};

	this.barContainer = this.getDOMElement("barSelector");
	this.contContainer = this.getDOMElement("contSelector");

};

ContentMeter.prototype = {

	getDOMElement: function(selector) {
		var base = this,
			element;

		if (typeof base[selector] === "string" 
				&& base[selector].indexOf("#") !== -1 
				&& base[selector].indexOf("#") === 0) {

			element = document.getElementById(base[selector].slice(1));

		} else if (typeof selector === "object") {
			element = selector;

		} else {
			element = {};
		}

		return element;
	}
};
