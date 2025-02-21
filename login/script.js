class MyInput extends HTMLElement {
    constructor() {
        super();
        this.isPasswordVisible = false;
    };


    connectedCallback() {
        this.render();
    }


    get labelName() {
        return this.getAttribute('label-name');
    }

    set labelName(val) {
        this.setAttribute("label-name", val);
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

    // static get observedAttributes() {
    //     return ["label-name", "label-for", "input-id", "placeholder", "type"];
    // }


    get inputId() {
        return this.getAttribute('input-id');
    }
    set inputId(val) {
        this.setAttribute('input-id', val);
    }


    handleInput(event) {
        this.dispatchEvent(new CustomEvent("input-change", {
            detail: event.target.value,
            bubbles: true,
            composed: true
        }));
    }


    getIcon() {

        return `<svg class="icon" id="toggle-password" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="${this.isPasswordVisible
                ? 'M12 4.5C7.305 4.5 3.281 7.47 1.5 12c1.781 4.53 5.805 7.5 10.5 7.5s8.719-2.97 10.5-7.5c-1.781-4.53-5.805-7.5-10.5-7.5zm0 12a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0-7.5a3 3 0 100 6 3 3 0 000-6z'
                : 'M12 4.5C7.305 4.5 3.281 7.47 1.5 12c1.165 2.96 3.18 5.49 5.81 7.05l-1.11 1.11a1 1 0 101.42 1.42l16-16a1 1 0 10-1.42-1.42l-2.39 2.39c-1.68-.99-3.65-1.53-5.81-1.53zM12 7c1.47 0 2.77.41 3.93 1.11L9.11 15.93A5 5 0 0112 7zm-7.35 5A10.7 10.7 0 014 12c1.39-3.21 4.86-5.5 8-5.5 1.72 0 3.33.45 4.72 1.22l-1.42 1.42A7.68 7.68 0 0012 9.5c-2.4 0-4.72 1.17-6.35 3.5zM12 14.5a3.5 3.5 0 01-2.44-5.94l4.88 4.88A3.48 3.48 0 0112 14.5zm6.35 1.5A10.7 10.7 0 0120 12c-1.39 3.21-4.86 5.5-8 5.5-1.72 0-3.33-.45-4.72-1.22l1.42-1.42A7.68 7.68 0 0012 14.5c2.4 0 4.72-1.17 6.35-3.5z'}"/>
    </svg>`;



    }



    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
        const input = this.querySelector("#password");
        input.type = this.isPasswordVisible ? "text" : "password";
        this.querySelector("#toggle-password").outerHTML = this.getIcon();
        this.querySelector("#toggle-password").addEventListener('click', this.togglePasswordVisibility.bind(this));
    }


    getIconAndRender() {
        this.getIcon();
        this.render();
    }



    render() {
        const link = document.createElement('link');
        link.href = "login.css";
        link.rel = "stylesheet";

        const container = document.createElement('div');

        container.innerHTML = `
       
            <div class="input-container">
                <div class="input-wrapper">
                    <input id="${this.inputId}" type="${this.type}" placeholder=" ">
                    <label for="${this.inputId}">${this.labelName}</label>
                    ${this.type === "password" ? this.getIcon() : ""}
                </div>
        </div>
        `;


        this.append(link);
        this.append(container);

        this.querySelector("input").addEventListener("input", this.handleInput.bind(this));

        if (this.type === "password") {
            this.querySelector("#toggle-password").addEventListener("click", this.togglePasswordVisibility.bind(this));
        }
    }


}

customElements.define('my-input', MyInput);



