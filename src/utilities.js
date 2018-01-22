class Utilities {
  static getDOMElement( selector ) {
    let element = null;

    if ( typeof selector === 'string'
      && selector.indexOf( '#' ) !== -1
      && selector.indexOf( '#' ) === 0
    ) {
      element = document.getElementById( selector.slice( 1 ) );

    } else if ( typeof selector === 'object'
      && selector.nodeType !== undefined
      && selector.length === undefined
    ) {
      element = selector;
    }

    return element;
  }

  static createDOMElement( element, className, parent, callback ) {
    const DOMElement = document.createElement( element );
    DOMElement.classList.add( className );

    if ( parent ) {
      parent.appendChild( DOMElement );
    }

    if ( callback ) {
      callback( DOMElement );
    }

    return DOMElement;
  }

  static getDocScrolltop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }

  static limitTheNumber( theNumber, min, max ) {
    return ( theNumber > min ) ? ( ( theNumber < max ) ? theNumber : max ) : min;
  }
}

export default Utilities;
