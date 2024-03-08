const ENTER = 'Enter';
const SPACE = ' ';

/**
 * Button
 * Component with support for icons on both sides of the text.
 *
 * @example
 * <mnml-button>
 *   <i class="iconoir-profile-circle" slot="start"></i>
 *   Change user
 *   <i class="iconoir-nav-arrow-down" slot="end"></i>
 * </mnml-button>`
 *
 * @element mnml-button
 *
 * @attr {string} aria-describedby - The id of the element that describes the button.
 * @attr {string} aria-label - The label for the button.
 * @attr {string} aria-labelledby - The id of the element that labels the button.
 * @attr {string} aria-pressed - Indicates whether the button is pressed.
 * @attr {boolean} disabled - Whether the button is disabled.
 * @attr {string} href - The URL to which the button links.
 *
 * @prop {string} menu - The type of menu that the button opens.
 *
 * @slot - For the button text.
 * @slot start - For the icon to be placed before the text.
 * @slot end - For the icon to be placed after the text.
 *
 * @csspart button - The button element.
 * @csspart start - The start icon.
 * @csspart text - The button text.
 * @csspart end - The end icon.
 */
export class Button extends HTMLElement {
  static attrs = {
    ariaDescribedBy: 'aria-describedby',
    ariaLabel: 'aria-label',
    ariaLabelledBy: 'aria-labelledby',
    ariaPressed: 'aria-pressed',
    disabled: 'disabled',
    href: 'href',
    menu: 'menu',
  };

  get ariaDescribedBy() {
    return this.getAttribute(Button.attrs.ariaDescribedBy);
  };

  get menu() {
    return this.getAttribute(Button.attrs.menu) !== null;
  };

  get ariaLabel() {
    return this.getAttribute(Button.attrs.ariaLabel);
  };

  get ariaLabelledBy() {
    return this.getAttribute(Button.attrs.ariaLabelledBy);
  };

  get ariaPressed() {
    return this.getAttribute(Button.attrs.ariaPressed);
  };

  get disabled() {
    return this.getAttribute(Button.attrs.disabled) !== null;
  }

  get href() {
    return this.getAttribute(Button.attrs.href);
  };

  connectedCallback() {
    if (this.shadowRoot) return;

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const btn = document.createElement(this.href ? 'a' : 'button');

    if (this.href) {
      btn.href = this.href;
    }

    if (this.ariaDescribedBy) {
      btn.setAttribute(Button.attrs.ariaDescribedBy, this.ariaDescribedBy);
    }

    if (this.ariaLabelledBy) {
      btn.setAttribute(Button.attrs.ariaLabelledBy, this.ariaLabelledBy);
    }

    if (this.ariaLabel) {
      btn.setAttribute(Button.attrs.ariaLabel, this.ariaLabel);
    }

    if (this.ariaPressed) {
      btn.setAttribute(Button.attrs.ariaPressed, this.ariaPressed);
    }

    if (this.ariaHasPopup) {
      btn.setAttribute(Button.attrs.ariaHasPopup, this.ariaHasPopup);
    }

    if (this.disabled) {
      btn.setAttribute(Button.attrs.disabled, '');
    }

    if (this.menu) {
      btn.setAttribute('aria-haspopup', this.menu);
    }

    btn.setAttribute('tabindex', '0');
    btn.setAttribute('part', 'button');

    const startSlot = document.createElement('slot');
    startSlot.setAttribute('name', 'start');
    startSlot.setAttribute('part', 'start');

    const slot = document.createElement('slot');
    slot.setAttribute('part', 'text');

    const endSlot = document.createElement('slot');
    startSlot.setAttribute('name', 'end');
    endSlot.setAttribute('part', 'end');

    btn.appendChild(startSlot);
    btn.appendChild(slot);
    btn.appendChild(endSlot);

    btn.addEventListener('keydown', this.handleKeydown.bind(this));

    shadowRoot.appendChild(btn);
  }

  disconnectedCallback() {
    this.shadowRoot?.querySelector('button')?.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown(event) {
    if ([ENTER, SPACE].includes(event.key)) {
      this.click();
    }
  }
}

customElements.define('mnml-button', Button);


//   static styles = css`
//     button {
//       display: flex;
//       align-items: center;
//     }
//   `;
