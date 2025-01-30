export default class TTToolbar extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          align-items: center;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          position: relative;
        }

        p {
          box-sizing: border-box;
          color: var( --scene-color, #ffffff );
          cursor: default;
          flex-basis: 0;
          flex-grow: 1;
          font-family: 'Roboto', sans-serif;
          font-size: 24px;
          font-weight: 400;
          line-height: 48px;
          margin: 0 0 0 4px;
          padding: 0;
          text-align: left;
          text-rendering: optimizeLegibility;
        }

        :host( :not( [label] ) ) p {
          visibility: hidden;
        }
      </style>
      <slot></slot>
      <p part="label"></p>
      <slot name="suffix"></slot>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$label = this.shadowRoot.querySelector( 'p' );
  }

  // When attributes change
  _render() {
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
    this._upgrade( 'label' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'label'
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

window.customElements.define( 'tt-toolbar', TTToolbar );
