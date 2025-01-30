export default class TTTextField extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
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
          cursor: pointer;
          display: none;
          height: 48px;
          justify-content: center;
          margin: 0;
          padding: 0;
          width: 48px;
          -webkit-tap-highlight-color: transparent;                     
        }

        div {
          background-color: #000000;
          bottom: 0;
          box-sizing: border-box;
          height: 1px;
          left: 0;
          position: absolute;
          right: 0;
        }

        input {
          background: none;
          box-sizing: border-box;
          border: none;
          color: #000000;
          flex-basis: 0;
          flex-grow: 1;
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          font-weight: 400;          
          margin: 16px 0 0 0;
          min-width: 0;
          outline: none;
          padding: 0;
        }

        label {
          align-items: center;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;          
          box-sizing: border-box;
          cursor: text;
          display: flex;
          flex-direction: row;
          height: 56px;
          padding: 0 0 0 16px;
          position: relative;
          width: 100%;
        }

        label:focus-within div {
          height: 3px;
        }

        p {
          box-sizing: border-box;
          color: #000000;
          cursor: text;
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          font-weight: 400;
          margin: 0;
          padding: 0;
          text-align: center;
          text-rendering: optimizeLegibility;                    
        }

        p[part=hint] {
          cursor: default;
          font-size: 12px;
          margin: 4px 0 0 16px;
          text-align: left;
        }

        p[part=label] {
          cursor: text;
          left: 16px;
          pointer-events: none;
          position: absolute;
          top: 50%;
          transform: translateY( -50% );
          transform-origin: left top;
        }

        p[part=suffix] {
          margin: 16px 12px 0 0;
        }

        label:focus-within p[part=label] {
          transform: translateY( -100% ) scale( 0.75 );
        }

        label:focus-within p[part=suffix] {
          display: inline-block;
        }

        span {
          box-sizing: border-box;
          color: #000000;
          cursor: text;
          direction: ltr;
          display: inline;
          font-family: 'Material Symbols Outlined';
          font-size: 24px;
          font-style: normal;
          font-variation-settings:
            'FILL' 1,
            'wght' 400,
            'GRAD' 0,
            'opsz' 24;                    
          font-weight: normal;
          height: 24px;
          line-height: 24px;
          max-height: 24px;         
          max-width: 24px;                    
          min-height: 24px;                               
          min-width: 24px;
          text-rendering: optimizeLegibility;
          width: 24px;
        }

        button span {
          cursor: pointer;
        }

        span[part=error] {
          color: red;
        }

        :host( :not( [error] ) ) span[part=error] {
          display: none;
        }

        :host( [filled] ) label {
          background-color: lightgrey;
        }

        :host( [invalid] ) div {
          background-color: red;
        }

        :host( [invalid] ) p[part=label],
        :host( [invalid] ) p[part=hint] {
          color: red;
        }

        :host( [invalid] ) span[part=error] {
          display: inline-block;
        }

        :host( [invalid]:not( [value] ) ) span[part=error] {
          margin: 0 16px 0 0;
        }

        :host( [invalid][value] ) span[part=error] {
          margin: 0 16px 0 0;
        }

        :host( [invalid][value] ) label:focus-within span[part=error] {
          margin: 0 0 0 12px;
        }        

        :host( :not( [suffix] ) ) p[part=suffix] {
          display: none;
        }        

        :host( :not( [value] ) ) button {
          display: none;
        }        

        :host( [value] ) label:focus-within button {
          display: flex;
        }

        :host( :not( [value] ) ) p[part=suffix] {
          display: none;
        }

        :host( :not( [value] ) ) label:focus-within p[part=suffix] {
          display: inline-block;
          margin: 16px 16px 0 0;          
        }        

        :host( [invalid][value] ) p[part=suffix] {
          display: inline-block;
          margin: 12px 12px 0 0;          
        }        

        :host( [invalid]:not( [value] ) ) label:focus-within p[part=suffix] {
          display: inline-block;
          margin: 12px 12px 0 0;          
        }        

        :host( [value] ) p[part=label] {
          transform: translateY( -100% ) scale( 0.75 );          
        }

        :host( [value] ) p[part=suffix] {
          margin: 16px 16px 0 0;
        }        

        :host( [value] ) label:focus-within p[part=suffix] {
          margin: 16px 0 0 0;
        }
      </style>
      <label part="field">
        <input part="input" />  
        <p part="suffix"></p>
        <span part="error">error</span>
        <button part="clear">
          <span part="icon">cancel</span>
        </button>
        <p part="label"></p>
        <div part="line"></div>
      </label>
      <p part="hint"></p>
    `;

    // Private
    this._touch = ( 'ontouchstart' in document.documentElement ) ? true : false;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$clear = this.shadowRoot.querySelector( 'button' );
    this.$clear.addEventListener( this._touch ? 'touchstart' : 'click', () => this.clear( true ) );
    this.$hint = this.shadowRoot.querySelector( 'p[part=hint]' );
    this.$input = this.shadowRoot.querySelector( 'input' );
    this.$input.addEventListener( 'keyup', () => {
      this.value = this.$input.value.length === 0 ? null : this.$input.value;
      this.dispatchEvent( new CustomEvent( 'tt-change', {
        detail: {
          value: this.value
        }
     } ) );
    } );
    this.$label = this.shadowRoot.querySelector( 'p[part=label]' );
    this.$suffix = this.shadowRoot.querySelector( 'p[part=suffix]' );
  }

  blur() {
    this.$input.blur();
  }

  clear( focus = true ) {
    this.value = null;
    
    if( focus ) {
      this.focus();
    }

    this.dispatchEvent( new CustomEvent( 'tt-clear' ) );
  }

  focus() {
    this.$input.focus();
  }

  // When things change
  _render() {    
    this.$label.innerText = this.label === null ? '' : this.label;
    this.$input.readOnly = this.readOnly;
    this.$input.type = this.type === null ? 'text' : this.type;    
    this.$input.inputMode = this.mode === null ? 'text' : this.mode;
    this.$input.value = this.value === null ? '' : this.value;
    this.$suffix.innerText = this.suffix === null ? '' : this.suffix;
    this.$hint.innerText = this.hint === null ? '' : this.hint;
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
    this._upgrade( 'hint' ); 
    this._upgrade( 'invalid' ); 
    this._upgrade( 'mode' );    
    this._upgrade( 'name' );        
    this._upgrade( 'suffix' );            
    this._upgrade( 'type' );    
    this._upgrade( 'value' );    
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'filled',
      'hidden',
      'hint',
      'invalid',
      'mode',
      'name',
      'suffix',
      'type',
      'value'
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

  get hint() {
    if( this.hasAttribute( 'hint' ) ) {
      return this.getAttribute( 'hint' );
    }

    return null;
  }

  set hint( value ) {
    if( value !== null ) {
      this.setAttribute( 'hint', value );
    } else {
      this.removeAttribute( 'hint' );
    }
  }  

  get invalid() {
    return this.hasAttribute( 'invalid' );
  }

  set invalid( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'invalid' );
      } else {
        this.setAttribute( 'invalid', '' );
      }
    } else {
      this.removeAttribute( 'invalid' );
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
  
  get mode() {
    if( this.hasAttribute( 'mode' ) ) {
      return this.getAttribute( 'mode' );
    }

    return null;
  }

  set mode( value ) {
    if( value !== null ) {
      this.setAttribute( 'mode', value );
    } else {
      this.removeAttribute( 'mode' );
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

  get suffix() {
    if( this.hasAttribute( 'suffix' ) ) {
      return this.getAttribute( 'suffix' );
    }

    return null;
  }

  set suffix( value ) {
    if( value !== null ) {
      this.setAttribute( 'suffix', value );
    } else {
      this.removeAttribute( 'suffix' );
    }
  }      

  get type() {
    if( this.hasAttribute( 'type' ) ) {
      return this.getAttribute( 'type' );
    }

    return null;
  }

  set type( value ) {
    if( value !== null ) {
      this.setAttribute( 'type', value );
    } else {
      this.removeAttribute( 'type' );
    }
  }      

  get value() {
    if( this.hasAttribute( 'value' ) ) {
      return this.getAttribute( 'value' );
    }

    return null;
  }

  set value( value ) {
    if( value !== null ) {
      this.setAttribute( 'value', value );
    } else {
      this.removeAttribute( 'value' );
    }
  }        
}

window.customElements.define( 'tt-text-field', TTTextField );
