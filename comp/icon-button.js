export default class TTIconButton extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline-block;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        }

        button {
          align-items: center;
          background: none;
          background-color: var( --button-background-color, none );
          border: none;
          border: var( --button-border, none );
          box-sizing: border-box;
          cursor: pointer;
          display: inline-flex;
          flex-direction: row;
          height: 48px;
          justify-content: center;
          margin: 0;
          outline: none;
          padding: 0;
          position: relative;
          width: 48px;
          -webkit-tap-highlight-color: transparent;          
        }

        span {
          align-items: center;
          box-sizing: border-box;
          color: var( --scene-color, #161616 );
          cursor: pointer;
          direction: ltr;
          display: inline-flex;
          font-family: 'Material Symbols Outlined';
          font-size: 24px;
          font-style: normal;
          font-weight: normal;
          height: 24px;
          justify-content: center;
          letter-spacing: normal;
          line-height: 24px;
          margin: 0;
          max-height: 24px;         
          max-width: 24px;                    
          min-height: 24px;                               
          min-width: 24px;
          padding: 0;
          text-align: center;
          text-rendering: optimizeLegibility;
          text-transform: none;
          white-space: nowrap;
          width: 64px;
          word-wrap: normal;                             
        }        
      </style>
      <button part="button" type="button">
        <span></span>
      </button>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$button = this.shadowRoot.querySelector( 'button' );
    this.$icon = this.shadowRoot.querySelector( 'span' );
  }

  blur() {
    this.$button.blur();
  }

  click() {
    this.$button.click();
  }

  focus() {
    this.$button.focus();
  }  

   // When attributes change
  _render() {
    this.$icon.innerText = this.iconName === null ? '' : this.iconName;
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
    this._upgrade( 'hidden' );
    this._upgrade( 'iconName' );    
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'hidden',
      'icon-name'
    ];
  }

  // Observed attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  }

  // Attributes
  // Reflected
  // Boolean, Number, String, null
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

  get iconName() {
    if( this.hasAttribute( 'icon-name' ) ) {
      return this.getAttribute( 'icon-name' );
    }

    return null;
  }

  set iconName( value ) {
    if( value !== null ) {
      this.setAttribute( 'icon-name', value );
    } else {
      this.removeAttribute( 'icon-name' );
    }
  }   
}

window.customElements.define( 'tt-icon-button', TTIconButton );
