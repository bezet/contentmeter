import Utilities from './utilities';

class Contentmeter {
  constructor(barSelector, contentSelector) {
    this.barSelector = barSelector;
    this.contentSelector = contentSelector;

    this.init();
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

  bindUIEvents() {
    const scrollTarget = this.content.selfScrolled ? this.contentContainer : window;
    scrollTarget.addEventListener('scroll', () => {
      this.setBarWidth();
      this.setCounterValue();
    });

    window.addEventListener('resize', () => {
      this.readContentDimensions();
      this.setBarWidth();
      this.setCounterValue();
    });
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

    this.bindUIEvents();
  }

  init() {
    this.barContainer = Utilities.getDOMElement(this.barSelector);
    this.contentContainer = Utilities.getDOMElement(this.contentSelector);

    if (this.barContainer !== null && this.contentContainer !== null) {
      this.readContentDimensions();
      this.createMeter();
    } else {
      throw new Error('Wrong selectors or given selectors match no elements.');
    }
  }
}

export default Contentmeter;
