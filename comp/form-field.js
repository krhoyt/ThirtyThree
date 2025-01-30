export default class TTFormField extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        }

        p {
          box-sizing: border-box;
          color: #000000;
          cursor: default;
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          font-weight: 400;
          margin: 0;
          padding: 0;
          text-rendering: optimizeLegibility;                    
        }

        ::slotted( tt-icon ) {
          --icon-color: var( --primary-color );
        }
      </style>
      <div>
        <slot name="icon"></slot>
      </div>
      <div>
        <p part="label"></p>
        <slot></slot>      
      </div>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$label = this.shadowRoot.querySelector( 'p' );
  }

  // When things change
  _render() {
    this.$label.innerText = this.label === null ? '' : this.label;
  }

  // Properties set before module loaded
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
    this._upgrade( 'label' );                        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'hidden',
      'label'
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

  get label() {
    if( this.hasAttribute( 'label' ) ) {
      return this.getAttribute( 'label' );
    }

    return null;
  }

  set label( value ) {
    if( value !== null ) {
      this.setAttribute( 'label', value );
    } else {
      this.removeAttribute( 'label' );
    }
  }  
}

window.customElements.define( 'tt-form-field', TTFormField );
