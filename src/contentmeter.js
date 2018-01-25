import Utilities from './utilities';

class Contentmeter {
  constructor(options = {}) {
    this.settings = {
      barSelector: '#content_meter',
      contentSelector: '#content_container',
    };

    Object.keys(options).forEach((option) => {
      this.settings[option] = options[option];
    });

    this.barContainer = Utilities.getDOMElement(this.settings.barSelector);
    this.contentContainer = Utilities.getDOMElement(this.settings.contentSelector);

    if (this.barContainer !== null && this.contentContainer !== null) {
      this.readContentDimensions();
      this.createMeter();
    } else {
      throw new Error('Wrong selectors or given selectors match no elements.');
    }
  }

  calcBarWidth() {
    if (!this.content) {
      this.readContentDimensions();
    }

    const containerScrollTop = this.content.selfScrolled ?
      this.contentContainer.scrollTop : Utilities.getDocScrolltop();
    const barW = ((containerScrollTop + this.content.barBasicVal) / this.content.height) * 100;

    return Utilities.limitTheNumber(barW, 0, 100);
  }

  setBarWidth() {
    this.bar.style.width = `${this.calcBarWidth()}%`;
  }

  setCounterValue() {
    this.counter.textContent = Math.ceil(this.calcBarWidth());
  }

  readContentDimensions() {
    this.content = this.content || {};

    this.content.selfScrolled =
      (this.contentContainer.scrollHeight > this.contentContainer.clientHeight);

    this.content.height = this.contentContainer.scrollHeight;
    this.content.visibleHeight = Math.min(window.innerHeight, this.contentContainer.clientHeight);
    this.content.offset = this.content.selfScrolled ? 0 : this.contentContainer.offsetTop;
    this.content.barBasicVal = (-1 * this.content.offset) + this.content.visibleHeight;
  }

  resizeHandler(event) {
    this.readContentDimensions();
    this.setBarWidth();
    this.setCounterValue();
  }

  scrollHandler(event) {
    this.setBarWidth();
    this.setCounterValue();
  }

  bindEvents() {
    const scrollTarget = this.content.selfScrolled ? this.contentContainer : window;

    scrollTarget.addEventListener('scroll', event => this.scrollHandler(event));
    window.addEventListener('resize', event => this.resizeHandler(event));
  }

  createMeter() {
    Utilities.createDOMElement(
      'div', 'contentmeter__bar', this.barContainer, (element) => {
        this.bar = element;
        this.setBarWidth();
      }
   );

    Utilities.createDOMElement(
      'div', 'contentmeter__counter', this.barContainer, (element) => {
        this.counter = element;
        this.setCounterValue();
      }
   );

    this.bindEvents();
  }
}

export default Contentmeter;
