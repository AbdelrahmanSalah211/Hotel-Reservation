class MyInput extends HTMLElement {
    constructor() {
        super();
        this.isPasswordVisible = false;

    };


    connectedCallback() {
        this.render();
    }


    get labelName() {
        return this.getAttribute('label_name');
    }

    set labelName(val) {
        this.setAttribute("label_name", val);
    }

    get labelFor() {
        return this.getAttribute('label-for');
    }

    set labelFor(val) {
        this.setAttribute("label-for", val);
    }


    get type() {
        return this.getAttribute("type") || "text";
    }

    set type(value) {
        this.setAttribute("type", value);
    }


    get placeholder() {
        return this.getAttribute("placeholder") || "Enter text...";
    }

    static get observedAttributes() {
        return ["label-name", "label-for", "input-id", "placeholder", "type"];
    }


    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    get inputId() {
        return this.getAttribute('input-id');
    }
    set inputId(val) {
        this.setAttribute('input-id', val);
    }


    get forLabel() {
        return this.getAttribute('label-for');
    }
    set forLabel(val) {
        this.getAttribute('label-for', val);
    }



    get inputName() {
        return this.getAttribute('input-name');
    }
    set inputName(val) {
        this.getAttribute('input-name', val);
    }



    handleInput(event) {
        this.dispatchEvent(new CustomEvent("on-input-change", {
            detail: { value: event.target.value, id: this.inputId },
            bubbles: true
        }));
    }


 

    getIcon() {

        return `<div class="my-input-toggle-password" >
        
            <svg class="my-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${this.isPasswordVisible 
                        ? '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>' 
                        : '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>'}
            </svg>        
        </div>`

    }



    togglePasswordVisibility() {




        this.isPasswordVisible = !this.isPasswordVisible;
        const input = this.querySelector(`#${this.inputId}`);
        if(input){
        input.type = this.isPasswordVisible ? "text" : "password";

        this.querySelector(".my-input-toggle-password").outerHTML = this.getIcon();
        this.querySelector(".my-input-toggle-password").addEventListener('click', this.togglePasswordVisibility.bind(this));
        }

    }


    






    render() {


        this.innerHTML = '';
        const container = document.createElement('div');
        container.className = "input-container";

        const isPassword = this.type === "password";


        // if (!document.querySelector('link[href="../components/InputLabel/InputLabel.css"]')) {
        //     this.checkIfFileCssExist();
        // }



        container.innerHTML = `
            
                <div class="input-wrapper">

                    <input
                    class="my-input ${isPassword? "my-input-password" : ""}"
                    name=${this.inputName}
                     id="${this.inputId}" 
                     type="${this.type}" 
                     placeholder=" ",
                     required
                    >
                    <label class="my-input-label" for=${this.forLabel || ''}">${this.labelName}</label>
                    ${isPassword ? this.getIcon() : ""}
                </div>
        `;

        ;


        this.appendChild(container);


        const input = this.querySelector("input");
        if (input) {
            input.addEventListener("input", this.handleInput.bind(this));
        }

        if (isPassword) {
            const toggleBtn = this.querySelector(".my-input-toggle-password");
            if(toggleBtn){
            toggleBtn.addEventListener("click", this.togglePasswordVisibility.bind(this));
            }
        }



    }


}

customElements.define('my-input', MyInput);



