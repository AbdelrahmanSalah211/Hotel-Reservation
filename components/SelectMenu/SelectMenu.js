let SelectMenu;

if (!customElements.get('select-menu')) {
   SelectMenu = class extends HTMLElement {
    constructor() {
      super();
      this.selectedValue = null;
      this.childObserver = null;
    }

    connectedCallback() {
      const children = this.querySelectorAll('.select-menu-child');
      const label = document.createElement('label');
      this.classList.add('select-menu-container');
      label.innerHTML = `${this.label}`;
      this.appendChild(label);
      const select = document.createElement('select');
      select.classList.add('custom-select');
      select.required = true;
      children.forEach(child => {
        const newChild = child.cloneNode(true);
        select.appendChild(newChild);
        this.removeChild(child);
        if (child.hasAttribute('selected')) {
          this.selectedValue = child.value;
        }
      });

      if (this.selectedValue === null && select.children.length > 0) {
        this.selectedValue = select.children[0].value;
      }

      select.addEventListener('change', (e) => {
        this.selectedValue = e.target.value;
        console.log(`e.taget.value: ${e.target.value}`);
        this.dispatchEvent(new CustomEvent('onChange', {
          detail: { value: this.selectedValue },
          bubbles: true
        }));
      });

      this.appendChild(select);

      const mutationObserverCallback = (mutationsList, observer) => {
        console.log(mutationsList);
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            const select = this.querySelector('select');
            if (select && mutation.addedNodes.length > 0) {
              this.childObserver.disconnect();
              mutation.addedNodes.forEach(node => {
                const newChild = node.cloneNode(true);
                newChild.classList.add('select-menu-child');
                select.appendChild(newChild);
                if (node.parentNode === this && node !== select && !select.contains(node)) {
                  this.removeChild(node);
                }
              });
              this.childObserver.observe(this, {
                childList: true
              });
            } else if (select && mutation.removedNodes.length > 0) {
              mutation.removedNodes.forEach(node => {
                const matchedChildren = this.querySelectorAll('.select-menu-child');
                matchedChildren.forEach(child => {
                  if (child.value === node.value) {
                    select.removeChild(child);
                  }
                })
              })
            }
          }
        }
      }

      this.childObserver = new MutationObserver(mutationObserverCallback);
      this.childObserver.observe(this, {
        childList: true
      })


    }

    disonnectedCallback() {
      if (this.childObserver) {
        this.childObserver.disconnect();
      }
    }

    get label() {
      return this.getAttribute('label');
    }

    set label(value) {
      this.setAttribute('label', value);
    }

    static get observedAttributes() {
      return ['label'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'label') {
        const label = this.querySelector('label');
        if (label) {
          label.innerHTML = `${newValue}`;
        }
      }
    }

    get value() {
      const select = this.querySelector('select');
      return select ? select.value : null;
    }

    setValue(value) {
      const select = this.querySelector('select');
      if (select) {
        select.value = value;
        this.selectedValue = value;
      }
    }

  }

  customElements.define('select-menu', SelectMenu)
}

export default SelectMenu