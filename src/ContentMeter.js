import Utilities from './Utilities.js';

class ContentMeter {
	constructor( barSelector, contentSelector, options ) {
		this.barSelector = barSelector;
		this.contentSelector = contentSelector;

		this.init();
	}

	updateClasses() {
		if ( Utilities.getDocScrolltop() > ( this.content.height + this.content.offset )
		  || ( Utilities.getDocScrolltop() + this.content.visibleHeight ) < this.content.offset ) {

			this.barContainer.classList.add( "js-invisible" );
		} else {
			this.barContainer.classList.remove( "js-invisible" );
		}
	}

  getBarWidth( ofScrollable ) {
    let barW = 0;

    if ( !this.content ) this.readContentDimensions();

    barW = ofScrollable ? this.contentContainer.scrollTop : (Utilities.getDocScrolltop() - this.content.offset);
    barW = (barW + this.content.visibleHeight) / this.content.height * 100;
    barW = Utilities.limitTheNumber( barW, 0, 100 );

    return barW;
  }

  setBarWidth( ofScrollable = false ) {
    this.bar.style.width = `${this.getBarWidth( ofScrollable )}%`;
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

  bindUIEvents() {
    const selfScrolled = this.content.selfScrolled;

    const scrollTarget = selfScrolled ? this.contentContainer : window;
    scrollTarget.addEventListener( "scroll", () => this.setBarWidth( selfScrolled ) );

    window.addEventListener( "scroll", () => this.updateClasses() );
    window.addEventListener( "resize", () => {
      this.readContentDimensions();
      this.setBarWidth( selfScrolled )
      this.updateClasses();
    } );
  }

  createMeter() {
    const bar = document.createElement( "div" );
    this.bar = bar;

    bar.classList.add( "baza-contentmeter__bar" );
    bar.style.width = this.setBarWidth( this.content.selfScrolled );

    this.barContainer.style.overflow = "hidden";
    this.barContainer.appendChild( bar );

    this.updateClasses();
    this.bindUIEvents();
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
