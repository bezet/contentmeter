class Utilities {
  static createDOMElement(element, className, parent, callback) {
    const DOMElement = document.createElement(element);
    DOMElement.classList.add(className);

    if (parent) {
      parent.appendChild(DOMElement);
    }

    if (callback) {
      callback(DOMElement);
    }

    return DOMElement;
  }

  static getDocScrolltop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }

  static limitTheNumber(theNumber, min, max) {
    return (theNumber > min) ? ((theNumber < max) ? theNumber : max) : min;
  }
}

export default Utilities;
