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

    this.barContainer = document.querySelector(this.settings.barSelector);
    this.contentContainer = document.querySelector(this.settings.contentSelector);

    if (this.barContainer !== null && this.contentContainer !== null) {
      this.readContentDimensions();
      this.createMeter();
    } else {
      throw new Error('Wrong selectors or given selectors match no elements.');
    }
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

  calcBarScale() {
    if (!this.content) {
      this.readContentDimensions();
    }

    const containerScrollTop = this.content.selfScrolled ?
      this.contentContainer.scrollTop : Utilities.getDocScrolltop();
    const barW = ((containerScrollTop + this.content.barBasicVal) / this.content.height);

    return Utilities.limitTheNumber(barW, 0, 1);
  }

  setBarWidth() {
    this.bar.style.transform = `scale(${this.calcBarScale()}, 1)`;
  }

  setCounterValue() {
    this.counter.textContent = `${Math.ceil(this.calcBarScale() * 100)}`;
  }

  resizeHandler() {
    this.readContentDimensions();
    this.setBarWidth();
    this.setCounterValue();
  }

  scrollHandler() {
    this.setBarWidth();
    this.setCounterValue();
  }

  bindEvents() {
    const scrollTarget = this.content.selfScrolled ? this.contentContainer : window;

    scrollTarget.addEventListener('scroll', () => this.scrollHandler());
    window.addEventListener('resize', () => this.resizeHandler());
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
