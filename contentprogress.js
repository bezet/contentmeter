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

	getDOMElement: function(selectorProp) {
		var base = this,
			element;

		if (typeof base[selectorProp] === "string" 
				&& base[selectorProp].indexOf("#") !== -1 
				&& base[selectorProp].indexOf("#") === 0) {

			element = document.getElementById(base[selectorProp].slice(1));

		} else if (typeof base[selectorProp] === "object") {
			element = base[selectorProp];

		} else {
			element = {};
		}

		return element;
	}
};
