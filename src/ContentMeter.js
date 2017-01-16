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

    barW = (
      (ofScrollable ? this.contentContainer.scrollTop : Utilities.getDocScrolltop())
      + this.content.barBasicVal
    ) / this.content.height * 100;

    return Utilities.limitTheNumber( barW, 0, 100 );
  }

  setBarWidth( ofScrollable = false ) {
    this.bar.style.width = `${this.getBarWidth( ofScrollable )}%`;
  }

  readContentDimensions() {
    this.content = this.content || {};

    this.content.selfScrolled  = (this.contentContainer.scrollHeight > this.contentContainer.clientHeight);

  	this.content.height        = this.contentContainer.scrollHeight;
    this.content.visibleHeight = Math.min(window.innerHeight, this.contentContainer.clientHeight);
    this.content.offset        = this.content.selfScrolled ? 0 : this.contentContainer.offsetTop;
    this.content.barBasicVal   = this.content.offset * (-1) + this.content.visibleHeight;

		console.log(this.content);
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
