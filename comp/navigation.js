export default class TTNavigation extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          align-items: center;
          background-color: var( --scene-background-color, red );
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          padding: 12px 0 16px 0;
          position: relative;
        }
      </style>
      <slot></slot>
    `;

    // Events
    this.doNavigation = this.doNavigation.bind( this );

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$slot = this.shadowRoot.querySelector( 'slot' );
    this.$slot.addEventListener( 'slotchange', () => {
      for( let c = 0; c < this.children.length; c++ ) {
        this.children[c].setAttribute( 'data-index', c );
        this.children[c].removeEventListener( 'click', this.doNavigation );
        this.children[c].addEventListener( 'click', this.doNavigation );
      }
    } );
  }

  doNavigation( evt ) {
    const index = parseInt( evt.currentTarget.getAttribute( 'data-index' ) );

    if( index !== this.selectedIndex ) {
      this.selectedIndex = index;
      this.dispatchEvent( new CustomEvent( 'tt-change', {
        detail: {
          selectedIndex: this.selectedIndex
        }
      } ) );
    }
  }

  // When attributes change
  _render() {
    const selected = this.selectedIndex === null ? 0 : this.selectedIndex;

    for( let c = 0; c < this.children.length; c++ ) {
      this.children[c].selected = selected === c ? true : false;
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
    this._upgrade( 'selectedIndex' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'selected-index'
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
  get selectedIndex() {
    if( this.hasAttribute( 'selected-index' ) ) {
      return parseInt( this.getAttribute( 'selected-index' ) );
    }

    return null;
  }

  set selectedIndex( value ) {
    if( value !== null ) {
      this.setAttribute( 'selected-index', value );
    } else {
      this.removeAttribute( 'selected-index' );
    }
  }      
}

window.customElements.define( 'tt-navigation', TTNavigation );
