function ContentMeter(barSelector, contSelector, options) {

	this.barSelector = barSelector;
	this.contSelector = contSelector;

	this.options = options;
	this.settings = {
		invisibilityClass: true
	};

	this.init();
};

ContentMeter.prototype = {

	init: function() {
		var base = this,
			options = base.options, 
			settings = base.settings;

		function getDOMElement(selector) {
			var element;

			if (typeof selector === "string" 
				&& selector.indexOf("#") !== -1 
				&& selector.indexOf("#") === 0) {

				element = document.getElementById(selector.slice(1));

			} else if (typeof selector === "object") {
				element = selector;

			} else {
				element = {};
			}

			return element;
		}

		base.barContainer = getDOMElement(base.barSelector);
		base.contContainer = getDOMElement(base.contSelector);

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
		bar.style.width = base.getBarWidth() + "%";
		bar.classList.add("contentmeter-bar");

		if (base.settings.invisibilityClass) {
			base.updateClasses();
		}

		base.bar = bar;
		base.barContainer.appendChild(bar);

		base.bindUIEvents();
	},

	bindUIEvents: function() {
		var base = this, 
			bar  = base.bar;

		window.addEventListener("scroll", function() {	
			bar.style.width = base.getBarWidth() + "%";
			if (base.settings.invisibilityClass) {
				base.updateClasses();
			}
		});

		window.addEventListener("resize", function() {
			base.setContentVars();
			bar.style.width = base.getBarWidth() + "%";
			if (base.settings.invisibilityClass) {
				base.updateClasses();
			}
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

		barW = (
			base.getDocScrolltop() 
			- base.cont.contentOffset 
			+ base.cont.visibleContentH
			) / base.cont.contentH * 100;

		barW = barW >= 0 ? barW : 0;
		barW = barW < 100 ? barW : 100;

		return barW;
	}, 

	updateClasses: function() {
		var base = this;
		
		if (   (base.getDocScrolltop() > (base.cont.contentH + base.cont.contentOffset) 
			|| (base.getDocScrolltop() + base.cont.visibleContentH) < base.cont.contentOffset)) {

			base.barContainer.classList.add("invisible");

		} else {
			base.barContainer.classList.remove("invisible");
		}
	}
};
