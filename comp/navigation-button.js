export default class TTNavigationButton extends HTMLElement {
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

        button {
          align-items: center;
          background: none;
          border: none;
          box-sizing: border-box;
          cursor: pointer;
          display: inline-flex;
          flex-direction: column;
          gap: 4px;
          justify-content: center;
          margin: 0;
          outline: none;
          padding: 0;
          position: relative;
          -webkit-tap-highlight-color: transparent;          
        }

        span[part=icon] {
          align-items: center;
          border-radius: 16px;
          box-sizing: border-box;
          color: var( --scene-color, #161616 );
          cursor: pointer;
          direction: ltr;
          display: inline-flex;
          font-family: 'Material Symbols Outlined';
          font-size: 20px;
          font-style: normal;
          font-variation-settings:
            'FILL' 0,
            'wght' 300,
            'GRAD' 0,
            'opsz' 20;
          font-weight: normal;
          height: 32px;
          justify-content: center;
          letter-spacing: normal;
          line-height: 20px;
          margin: 0;
          max-height: 32px;         
          max-width: 64px;                    
          min-height: 32px;                               
          min-width: 64px;
          padding: 0;
          text-align: center;
          text-rendering: optimizeLegibility;
          text-transform: none;
          white-space: nowrap;
          width: 64px;
          word-wrap: normal;                             
        }

        span[part=label] {
          box-sizing: border-box;
          color: var( --scene-color, #ffffff );
          cursor: pointer;
          flex-basis: 0;
          flex-grow: 1;
          font-family: 'Roboto', sans-serif;
          font-size: 12px;
          font-weight: 400;
          margin: 0;
          padding: 0;
          text-align: center;
          text-rendering: optimizeLegibility;
        }

        :host( [selected] ) span[part=icon] {
          font-variation-settings:
            'FILL' 1,
            'wght' 300,
            'GRAD' 0,
            'opsz' 20;          
        }

        :host( [selected] ) span[part=label] {
          font-weight: 700;
        }

        :host( :not( [label] ) ) span[part=label] {
          visibility: hidden;
        }
      </style>
      <button part="button" type="button">
        <span part="icon"></span>
        <span part="label"></span>
      </button>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$button = this.shadowRoot.querySelector( 'button' );
    this.$icon = this.shadowRoot.querySelector( 'span[part=icon]' );
    this.$label = this.shadowRoot.querySelector( 'span[part=label]' );
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
    this.$label.innerText = this.label === null ? '' : this.label;
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
    this._upgrade( 'iconName' );
    this._upgrade( 'label' );
    this._upgrade( 'selected' );
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'icon-name',
      'label',
      'selected'
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

  get selected() {
    return this.hasAttribute( 'selected' );
  }

  set selected( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'selected' );
      } else {
        this.setAttribute( 'selected', '' );
      }
    } else {
      this.removeAttribute( 'selected' );
    }
  }  
}

window.customElements.define( 'tt-navigation-button', TTNavigationButton );
