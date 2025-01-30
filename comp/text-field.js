export default class TTTextField extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline-flex;
          flex-direction: column;
          position: relative;
        }

        button {
          align-items: center;
          background: none;
          border: none;
          cursor: pointer;
          display: inline-flex;
          height: 47px;
          justify-content: center;
          padding: 0;
          margin: 0;
          width: 48px;
          -webkit-tap-highlight-color: transparent;
        }

        button:hover {
          background-color: #e8e8e8;
        }

        div {
          align-items: center;
          display: flex;
          flex-direction: row;
        }

        i {
          box-sizing: border-box;
          color: #161616;
          direction: ltr;
          display: inline-block;
          font-family: 'Material Symbols Outlined';
          font-size: 20px;
          font-style: normal;
          font-weight: normal;
          height: 20px;
          letter-spacing: normal;
          line-height: 20px;
          margin: 0;
          max-height: 20px;         
          max-width: 20px;                    
          min-height: 16px;                               
          min-width: 20px;
          padding: 0;
          text-align: center;
          text-rendering: optimizeLegibility;
          text-transform: none;
          white-space: nowrap;
          width: 20px;
          word-wrap: normal;                       
        }

        i[part=icon] {
          margin: 0 14px 0 14px;
        }

        input {
          appearance: none;
          background: none;
          border: none;
          box-sizing: border-box;
          color: #161616;
          cursor: text;
          display: inline-flex;
          flex-basis: 0;
          flex-grow: 1;
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          font-weight: 400;
          height: 47px;
          margin: 0;
          min-width: 0;
          outline: none;
          padding: 0 16px 0 16px;
          text-rendering: optimizeLegibility;  
          -webkit-tap-highlight-color: transparent;
        }

        label {
          align-items: center;
          background-color: #f4f4f4;
          border-bottom: solid 1px #8d8d8d;          
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          cursor: text;
          display: flex;
          flex-direction: row;
          margin: 0;
          outline: solid 2px transparent;
          outline-offset: -2px;
          padding: 0;
          position: relative;
          -webkit-tap-highlight-color: transparent;
        }

        label > i {
          color: #da1e28;
        }

        label:focus-within {
          outline: solid 2px #0f62fe;
        }

        p {
          box-sizing: border-box;
          color: #161616;
          cursor: default;
          font-family: 'Roboto', sans-serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.32px;
          margin: 0;
          padding: 0;
          text-rendering: optimizeLegibility;                    
        }

        p[part=label] {
          color: #525252;
          font-size: 12px;
          margin: 0 0 8px 48px;
        }

        p[part=suffix] {
          line-height: 47px;
          margin: 0 14px 0 14px;
        }

        :host( [value] ) p[part=suffix] {
          margin: 0 0 0 14px;
        }

        :host( :not( [value] ) ) button {
          display: none;
        }

        :host( :not( [value] ) ) label > i {
          margin: 0 14px 0 14px;
        }        

        :host( :not( [invalid] ) ) label > i {
          display: none;
        }
      </style>
      <p part="label"></p>
      <div>
        <i part="icon"></i>      
        <label part="field">
          <input part="input" />  
          <p part="suffix"></p>
          <i>error</i>
          <button part="clear">
            <i>cancel</i>
          </button>
        </label>
      </div>
      <p part="helper"></p>
      <p part="error"></p>
    `;

    // Private
    this._touch = ( 'ontouchstart' in document.documentElement ) ? true : false;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$clear = this.shadowRoot.querySelector( 'button' );
    this.$clear.addEventListener( this._touch ? 'touchstart' : 'click', () => this.clear( true ) );
    this.$error = this.shadowRoot.querySelector( 'p[part=error]' );
    this.$helper = this.shadowRoot.querySelector( 'p[part=helper]' );
    this.$icon = this.shadowRoot.querySelector( 'i[part=icon]' );
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
    this.$icon.innerText = this.icon === null ? '' : this.icon;
    this.$input.placeholder = this.placeholder === null ? '' : this.placeholder;
    this.$input.type = this.type === null ? 'text' : this.type;    
    this.$input.inputMode = this.mode === null ? 'text' : this.mode;
    this.$input.value = this.value === null ? '' : this.value;
    this.$suffix.innerText = this.suffix === null ? '' : this.suffix;
    this.$helper.innerText = this.helper === null ? '' : this.helper;
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
    this._upgrade( 'helper' ); 
    this._upgrade( 'icon' );     
    this._upgrade( 'invalid' ); 
    this._upgrade( 'mode' );    
    this._upgrade( 'name' );        
    this._upgrade( 'placeholder' );        
    this._upgrade( 'suffix' );            
    this._upgrade( 'type' );    
    this._upgrade( 'value' );    
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'hidden',
      'helper',
      'icon',
      'invalid',
      'mode',
      'name',
      'placeholder',
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

  get helper() {
    if( this.hasAttribute( 'helper' ) ) {
      return this.getAttribute( 'helper' );
    }

    return null;
  }

  set helper( value ) {
    if( value !== null ) {
      this.setAttribute( 'helper', value );
    } else {
      this.removeAttribute( 'helper' );
    }
  }  

  get icon() {
    if( this.hasAttribute( 'icon' ) ) {
      return this.getAttribute( 'icon' );
    }

    return null;
  }

  set icon( value ) {
    if( value !== null ) {
      this.setAttribute( 'icon', value );
    } else {
      this.removeAttribute( 'icon' );
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
  
  get placeholder() {
    if( this.hasAttribute( 'placeholder' ) ) {
      return this.getAttribute( 'placeholder' );
    }

    return null;
  }

  set placeholder( value ) {
    if( value !== null ) {
      this.setAttribute( 'placeholder', value );
    } else {
      this.removeAttribute( 'placeholder' );
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
