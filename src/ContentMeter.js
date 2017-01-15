import Utilities from './Utilities.js';

class ContentMeter {
	constructor( barSelector, contentSelector, options ) {
		this.barSelector = barSelector;
		this.contentSelector = contentSelector;

		this.init();
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

	getBarWidth() {
		let barW = 0;

		if ( !this.content ) this.readContentDimensions();

		barW = (
			Utilities.getDocScrolltop()
			- this.content.offset
			+ this.content.visibleHeight
		) / this.content.height * 100;

		barW = Utilities.limitTheNumber( barW, 0, 100 );

		return barW;
	}

	getBarWidthOfScrollable() {
		let barW = 0;

		if ( !this.content ) this.readContentDimensions();

		barW = (
			this.contentContainer.scrollTop
			+ this.content.visibleHeight
		) / this.content.height * 100;

		barW = Utilities.limitTheNumber( barW, 0, 100 );

		return barW;
	}

	updateClasses() {
		if ( Utilities.getDocScrolltop() > ( this.content.height + this.content.offset )
		  || ( Utilities.getDocScrolltop() + this.content.visibleHeight ) < this.content.offset ) {

			this.barContainer.classList.add( "js-invisible" );
		} else {
			this.barContainer.classList.remove( "js-invisible" );
		}
	}

  init() {
    this.barContainer = Utilities.getDOMElement( this.barSelector );
    this.contentContainer = Utilities.getDOMElement( this.contentSelector );

    if ( this.barContainer !== null && this.contentContainer !== null ) {
      this.readContentDimensions();
      this.createMeter();
    } else {
      throw new Error( "Wrong selectors or given selectors match no elements." );
    }
  }
};

export default ContentMeter;
