class ContentMeter {
	constructor( barSelector, contSelector, options ) {
		this.barSelector = barSelector;
		this.contSelector = contSelector;

		this.init();
	}

  getDOMElement( selector ) {
    let element = null;

    if ( typeof selector === "string"
      && selector.indexOf( "#" ) !== -1
      && selector.indexOf( "#" ) === 0
    ) {
      element = document.getElementById( selector.slice(1) );

    } else if ( typeof selector === "object"
      && selector.nodeType !== undefined
      && selector.length === undefined
    ) {
      element = selector;
    }

    return element;
  }

  readContentDimensions() {
    this.content = {
      height        : this.contentContainer.scrollHeight,
      visibleHeight : this.contentContainer.clientHeight,
      offset        : this.contentContainer.offsetTop,
      selfScrolled  : false
    }

    if ( this.content.visibleHeight > window.innerHeight ) {
      this.content.visibleHeight = window.innerHeight;
    } else {
      this.content.selfScrolled = true;
    }
  }

	createMeter() {
		const bar = document.createElement( "div" );
    bar.classList.add( "baza-contentmeter__bar" );

		if ( !this.content.selfScrolled ) {
			bar.style.width = this.getBarWidth() + "%";
		} else {
			bar.style.width = this.getBarWidthOfScrollable() + "%";
		}

    this.barContainer.style.overflow = "hidden";

		this.updateClasses();

		this.bar = bar;
		this.barContainer.appendChild( bar );

		this.bindUIEvents();
	}

	bindUIEvents() {
		const bar = this.bar;
    const contentContainer = this.contentContainer;

		if ( !this.content.selfScrolled ) {
			window.addEventListener( "scroll", () => bar.style.width = this.getBarWidth() + "%" );
		} else {
			contentContainer.addEventListener( "scroll", () => bar.style.width = this.getBarWidthOfScrollable() + "%" );
      window.addEventListener( "scroll", () => this.updateClasses() );
		}

		window.addEventListener( "resize", () => {
			this.readContentDimensions();
			bar.style.width = this.getBarWidth() + "%";
			this.updateClasses();
		} );
	}

	getDocScrolltop() {
		return document.documentElement.scrollTop || document.body.scrollTop;
	}

	limitTheNumber( theNumber, min, max ) {
		let number = theNumber;

		number = number > min ? number : min;
		number = number < max ? number : max;

		return number;
	}

	getBarWidth() {
		let barW = 0;

		if ( !this.content ) this.readContentDimensions();

		barW = (
			this.getDocScrolltop()
			- this.content.offset
			+ this.content.visibleHeight
		) / this.content.height * 100;

		barW = this.limitTheNumber( barW, 0, 100 );

		return barW;
	}

	getBarWidthOfScrollable() {
		let barW = 0;

		if ( !this.content ) this.readContentDimensions();

		barW = (
			this.contentContainer.scrollTop
			+ this.content.visibleHeight
		) / this.content.height * 100;

		barW = this.limitTheNumber( barW, 0, 100 );

		return barW;
	}

	updateClasses() {
		if ( this.getDocScrolltop() > ( this.content.height + this.content.offset )
		  || ( this.getDocScrolltop() + this.content.visibleHeight ) < this.content.offset ) {

			this.barContainer.classList.add( "js-invisible" );
		} else {
			this.barContainer.classList.remove( "js-invisible" );
		}
	}

  init() {
    this.barContainer = this.getDOMElement( this.barSelector );
    this.contentContainer = this.getDOMElement( this.contSelector );

    if ( this.barContainer !== null && this.contentContainer !== null ) {
      this.readContentDimensions();
      this.createMeter();
    } else {
      throw new Error( "Wrong selectors or given selectors match no elements." );
    }
  }
};

export default ContentMeter;
