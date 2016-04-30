function ContentMeter(barSelector, contSelector, options) {

	this.barSelector = barSelector;
	this.contSelector = contSelector;

	this.options = options;
	this.settings = {
		// option1: true,
		// option2: true,
		// option3: true
	};

	this.init();
};

ContentMeter.prototype = {

	init: function() {
		var base = this,
			options = base.options, 
			settings = base.settings;

		function getDOMElement(selectorProp) {
			var element;

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

		base.barContainer = getDOMElement("barSelector");
		base.contContainer = getDOMElement("contSelector");

		for (var option in options) {
			settings[option] = options[option];
		};

		base.createMeter();
	},	

	createMeter: function() {
		var base = this,
			bar;

		base.barContainer.style.overflow = "hidden";

		bar = document.createElement("div");
		bar.classList.add("contentmeter-bar");
		bar.style.width = base.getBarWidth() + "%";
		base.bar = bar;
		
		base.barContainer.appendChild(bar);

		base.bindUIEvents();
	},

	bindUIEvents: function() {
		var base = this, 
			bar  = base.bar;

		window.addEventListener("scroll", function() {	
			bar.style.width = base.getBarWidth() + "%";
		});

		window.addEventListener("resize", function() {
			base.setContentVars();
			bar.style.width = base.getBarWidth() + "%";
		});
	},

	getDocScrolltop: function() {
		return document.documentElement.scrollTop || document.body.scrollTop;
	},

	setContentVars: function() {
		var base = this;

		base.cont = {
			contentH        : base.contContainer.scrollHeight, 
			visibleContentH : base.contContainer.clientHeight,
			contentOffset   : base.contContainer.offsetTop
		};

		base.cont.visibleContentH = 
			base.cont.visibleContentH > window.innerHeight ? 
				window.innerHeight : base.cont.visibleContentH;
	},

	getBarWidth: function() {
		var base = this,
			barW = 0;

		if (!base.cont) { 
			base.setContentVars(); 
		};

		barW = (base.getDocScrolltop() - base.cont.contentOffset + base.cont.visibleContentH) / base.cont.contentH * 100;

		return barW;
	}
};
