export default class TTInput extends HTMLElement {
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

        :host( [hidden] ) {
          display: none;
        }

        button {
          align-items: center;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          height: 48px;
          justify-content: center;
          margin: 0;
          opacity: 0;
          overflow: hidden;
          padding: 0;
          min-width: 0;
          transition:
            opacity 150ms ease-out,
            min-width 150ms ease-out,
            width 150ms ease-out;
          width: 0;         
          -webkit-tap-highlight-color: transparent;           
        }

        button span {
          color: #000000;
        }        

        div {
          background-color: #000000;
          bottom: 0;
          height: 1px;
          left: 0;
          opacity: 0.60;          
          position: absolute;
          right: 0;
          transition: 
            background-color 150ms ease-out,
            opacity 150ms ease-out,
            height 150ms ease-out;
        }

        input {
          appearance: none;
          background-color: transparent;
          border: none;
          color: #000000;
          flex-basis: 0;
          flex-grow: 1;
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          font-weight: 400;
          height: 28px;
          letter-spacing: 0.15px;
          margin: 16px 0 0 0;
          min-width: 0;
          outline: none;
          padding: 0 0 0 16px;
          text-rendering: optimizeLegibility;    
          -webkit-tap-highlight-color: transparent;
        }

        label {
          align-items: center;
          background: none;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          box-sizing: border-box;
          cursor: text;
          display: flex;
          flex-direction: row;
          height: 56px;
          margin: 0;
          min-height: 56px;
          outline: none;
          padding: 0;
          position: relative;
          width: 100%;
          -webkit-tap-highlight-color: transparent;
        }

        p {
          box-sizing: border-box;
          color: #000000;
          cursor: pointer;
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          font-weight: 400;
          margin: 0;
          padding: 0;
          text-align: center;
          text-rendering: optimizeLegibility;          
        }

        button {
          opacity: 0;
          overflow: hidden;
          min-width: 0;
          transition:
            opacity 150ms ease-out,
            min-width 150ms ease-out,
            width 150ms ease-out;
          width: 0;      
          -webkit-tap-highlight-color: transparent;              
        }

        span {
          box-sizing: border-box;
          color: #000000;
          cursor: default;
          direction: ltr;
          display: inline-block;
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
          width: 24px;
          word-wrap: normal;                  
        } 

        span[part=error] {
          color: red;
          cursor: text;
          opacity: 1.0;
          overflow: hidden;
          min-width: 48px;
          text-align: center;
          transition:
            opacity 150ms ease-out,
            min-width 150ms ease-out,
            width 150ms ease-out;
          width: 48px;
        }

        button span {
          cursor: pointer;
        }

        p[part=hint] {
          flex-basis: 0;
          flex-grow: 1;          
          font-size: 12px;          
          opacity: 0.60;
          padding: 5px 16px 0 16px;
          text-align: left;
        }

        p[part=label] {
          cursor: text;
          left: 16px;
          opacity: 0.60;
          position: absolute;
          top: 50%;
          transform: translateY( -50% );
          transform-origin: left top;
          transition: 
            color 150ms ease-out,
            opacity 150ms ease-out,
            transform 150ms ease-out;          
        }

        p[part=suffix] {
          cursor: text;
          height: 28px;
          line-height: 28px;                    
          margin: 16px 16px 0 0;
          opacity: 0.60;
          transition: 
            margin 150ms ease-out,
            opacity 150ms ease-out;
        }

        label:focus-within button {
          opacity: 0.80;
          min-width: 48px;
          width: 48px;
        }

        label:focus-within div {
          background-color: var( --input-focus-color, #000000 );
          height: 3px;
          opacity: 1.0;
        }

        label:focus-within p[part=label] {
          color: var( --input-focus-color );          
          opacity: 1.0;
          transform: translateY( -100% ) scale( 0.75 );
        }

        :host( :not( [hint] ) ) p[part=hint] {
          display: none;
        }

        :host( [error] ) div {
          background-color: red;
        }

        :host( [error] ) p[part=hint] {
          color: red;          
          display: block;
        }

        :host( [error] ) p[part=label] {
          color: red;
        }

        :host( :not( [error] ) ) span[part=error] {
          min-width: 0;
          opacity: 0;
          width: 0;
        }

        :host( [filled] ) label {
          background-color: lightgrey;          
        }

        :host( [invalid] ) span[part=error] {
          display: inline-block;
        }

        :host( :not( [suffix] ) ) p[part=suffix] {
          display: none;
        }        

        :host( :not( [value] ) ) label button {
          opacity: 0;
          min-width: 0;
          width: 0;
        }

        :host( :not( [value] ) ) label p[part=suffix] {
          opacity: 0;
        }

        :host( :not( [value] ) ) label:focus-within p[part=suffix] {
          opacity: 0.60;
        }        

        :host( [value] ) label:focus-within p[part=suffix] {
          margin: 16px 0 0 0;          
          opacity: 0.80;
        }

        :host( [value] ) label p[part=label] {
          transform: translateY( -100% ) scale( 0.75 );          
        }

        :host( [value] ) label:focus-within p[part=label] {
          opacity: 0.80;
        }
      </style>
      <label part="field">
        <input part="input" />  
        <p part="suffix"></p>
        <span part="error">error</span>
        <button part="clear">
          <span>cancel</span>
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
    this.$clear.addEventListener( this._touch ? 'touchstart' : 'click', ( evt ) => {
      evt.preventDefault();
      this.value = null;
      this.$input.focus();
      this.dispatchEvent( new CustomEvent( 'tt-clear' ) );
    } );
    this.$hint = this.shadowRoot.querySelector( 'p[part=hint]' );
    this.$input = this.shadowRoot.querySelector( 'input' );
    this.$input.addEventListener( 'keyup', () => {
      this.value = this.$input.value.length === 0 ? null : this.$input.value;
      this.dispatchEvent( new CustomEvent( 'change', {detail: this.value} ) );
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
    if( this.error === null ) {
      this.$hint.innerText = this.hint;      
    } else {
      this.$hint.innerText = this.error;
    }

    this.$input.readOnly = this.readOnly;
    this.$input.type = this.type === null ? 'text' : this.type;    
    this.$input.inputMode = this.mode === null ? 'text' : this.mode;
    this.$input.value = this.value === null ? '' : this.value;
    this.$suffix.innerText = this.suffix;
    this.$label.innerText = this.label;    
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
    this._upgrade( 'label' );
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
      'label',
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
    if( this.hasAttribute( 'invalid' ) ) {
      return this.getAttribute( 'invalid' );
    }

    return null;
  }

  set invalid( value ) {
    if( value !== null ) {
      this.setAttribute( 'invalid', value );
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

window.customElements.define( 'tt-input', TTInput );
