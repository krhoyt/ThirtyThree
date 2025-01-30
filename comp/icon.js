export default class TTIcon extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = /* template */ `
      <style>
        :host {
          align-items: center;
          box-sizing: border-box;
          display: inline-flex;
          justify-content: center;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        }        

        p {
          box-sizing: border-box;
          color: var( --icon-color, #161616 );
          cursor: var( --icon-cursor, default );
          direction: ltr;
          display: inline-block;
          font-family: 'Material Symbols Outlined';
          font-size: var( --icon-size, 24px );
          font-style: normal;
          font-weight: normal;
          height: var( --icon-size, 24px );
          letter-spacing: normal;
          line-height: var( --icon-size, 24px );
          margin: 0;
          max-height: var( --icon-size, 24px );         
          max-width: var( --icon-size, 24px );                    
          min-height: var( --icon-size, 24px );                               
          min-width: var( --icon-size, 24px );
          padding: 0;
          text-align: center;
          text-rendering: optimizeLegibility;
          text-transform: none;
          white-space: nowrap;
          width: var( --icon-size, 24px );
          word-wrap: normal;                    
        }
      </style>
      <p part="icon"></p>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$icon = this.shadowRoot.querySelector( 'p' );    
  }

  // When things change
  _render() {
    this.$icon.innerText = this.name === null ? '' : this.name;

    if( this.name !== null ) {
      const variation = [];

      if( this.filled )
        variation.push( '\'FILL\' 1' );
  
      if( this.weight !== null ) {
        variation.push( `'wght' ${this.weight}` );
      }
  
      this.$icon.style.fontVariationSettings = variation.toString();    
    }
  }

  // Promote properties
  // Values may be set before module load
  _upgrade( property ) {
    if( this.hasOwnProperty( property ) ) {
      const value = this[property];
      delete this[property];
      this[property] = value;
    }    
  }    

  // Setup
  connectedCallback() {
    this._upgrade( 'filled' );                
    this._upgrade( 'hidden' );    
    this._upgrade( 'name' );        
    this._upgrade( 'weight' );                
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'filled',
      'hidden',
      'name',
      'weight'
    ];
  }

  // Observed tag attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  }

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get filled() {
    return this.hasAttribute( 'filled' );
  }

  set filled( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'filled' );
      } else {
        this.setAttribute( 'filled', '' );
      }
    } else {
      this.removeAttribute( 'filled' );
    }
  }

  get hidden() {
    return this.hasAttribute( 'hidden' );
  }

  set hidden( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'hidden' );
      } else {
        this.setAttribute( 'hidden', '' );
      }
    } else {
      this.removeAttribute( 'hidden' );
    }
  }

  get name() {
    if( this.hasAttribute( 'name' ) ) {
      return this.getAttribute( 'name' );
    }

    return null;
  }

  set name( value ) {
    if( value !== null ) {
      this.setAttribute( 'name', value );
    } else {
      this.removeAttribute( 'name' );
    }
  }

  get weight() {
    if( this.hasAttribute( 'weight' ) ) {
      return parseInt( this.getAttribute( 'weight' ) );
    }

    return null;
  }

  set weight( value ) {
    if( value !== null ) {
      this.setAttribute( 'weight', value );
    } else {
      this.removeAttribute( 'weight' );
    }
  }  
}

window.customElements.define( 'tt-icon', TTIcon );
