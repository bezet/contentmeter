function ContentMeter(barSelector, contSelector, options) {

	this.barSelector = barSelector;
	this.contSelector = contSelector;

	this.options = options;
	this.settings = {
		barByWidth: true,
		barByPosition: false,
		invisibilityClass: true
	}

	this.init();
}

ContentMeter.prototype = {

	init: function() {
		var base     = this,
			options  = base.options, 
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
		}

		// If exclusive options set to true, leave only first one enabled
		if (settings.barByWidth && settings.barByPosition) settings.barByPosition = false;

		base.createMeter();
	},	

	createMeter: function() {
		var base = this,
			bar;

		base.barContainer.style.overflow = "hidden";

		bar = document.createElement("div");
		bar.classList.add("contentmeter-bar");
		
		if (base.settings.barByWidth) {
			bar.style.width = base.getBarWidth() + "%";
		}
		
		if (base.settings.barByPosition) {
			bar.setAttribute("style", "position: absolute; width: 100%;");
			bar.style.left = base.getBarPosition() + "%";
		}

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

		if (base.settings.barByWidth) {
			window.addEventListener("scroll", function() {	
				bar.style.width = base.getBarWidth() + "%";
			});
		}

		if (base.settings.barByPosition) {
			window.addEventListener("scroll", function() {	
				bar.style.left = base.getBarPosition() + "%";
			});
		}

		if (base.settings.invisibilityClass) {
			window.addEventListener("scroll", function() {	
				base.updateClasses();
			});
		}

		window.addEventListener("resize", function() {
			base.readContentDimensions();
			bar.style.width = base.getBarWidth() + "%";
			if (base.settings.invisibilityClass) {
				base.updateClasses();
			}
		});
	},

	getDocScrolltop: function() {
		return document.documentElement.scrollTop || document.body.scrollTop;
	},

	readContentDimensions: function() {
		var base = this;

		base.content = {
			height        : base.contContainer.scrollHeight, 
			visibleHeight : base.contContainer.clientHeight,
			offset        : base.contContainer.offsetTop
		}

		base.content.visibleHeight = 
			base.content.visibleHeight > window.innerHeight ? 
				window.innerHeight : base.content.visibleHeight;
	},

	getBarWidth: function() {
		var base = this,
			barW = 0;

		if (!base.content) { 
			base.readContentDimensions(); 
		}

		barW = (
			base.getDocScrolltop() 
			- base.content.offset 
			+ base.content.visibleHeight
			) / base.content.height * 100;

		barW = barW > 0 ? barW : 0;
		barW = barW < 100 ? barW : 100;

		return barW;
	}, 

	getBarPosition: function() {
		var base   = this,
			barPos = 0;

		if (!base.content) { 
			base.readContentDimensions(); 
		}

		barPos = (
			base.getDocScrolltop() 
			- base.content.offset 
			+ base.content.visibleHeight
			) / base.content.height * 100;

		// barPos = barPos > 0 ? barPos : 0;
		// barPos = barPos < 100 ? barPos : 100;

		barPos = barPos - 100;

		return barPos;
	}, 

	updateClasses: function() {
		var base = this;
		
		if (   base.getDocScrolltop() > (base.content.height + base.content.offset) 
			|| (base.getDocScrolltop() + base.content.visibleHeight) < base.content.offset) {

			base.barContainer.classList.add("invisible");

		} else {
			base.barContainer.classList.remove("invisible");
		}
	}
}
