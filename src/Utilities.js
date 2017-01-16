class Utilities {
  static getDOMElement( selector ) {
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

  static getDocScrolltop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }

  static limitTheNumber( theNumber, min, max ) {
    // let number = theNumber;
    //
    // number = number > min ? number : min;
    // number = number < max ? number : max;
    //
    // return number;
    return (theNumber > min) ? ((theNumber < max) ? theNumber : max) : min;
  }
}

export default Utilities;
