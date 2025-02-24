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

    // static get observedAttributes() {
    //     return ["label-name", "label-for", "input-id", "placeholder", "type"];
    // }


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
        this.dispatchEvent(new CustomEvent("onClick-inputs", {
            detail: event.target.value,
            bubbles: true,
            composed: true
        }));
    }


    // handleInput(event) {

    //     this.dispatchEvent(new CustomEvent("onChange-inputs", {
    //         detail: event.target.value,
    //         bubbles: true, 
    //         composed: true
    //     }));
    // }

    getIcon() {

        return `<img class="icon" id="toggle-password" src=${this.isPasswordVisible ? "../Icons/imgs/eye.png" : "../Icons/imgs/eye-close-up.png"}>`

    }



    togglePasswordVisibility() {




        this.isPasswordVisible = !this.isPasswordVisible;
        const input = this.querySelector(`#${this.inputId}`);
        console.log(input);

        // console.log();
        input.type = this.isPasswordVisible ? "text" : "password";
        this.querySelector("#toggle-password").outerHTML = this.getIcon();
        this.querySelector("#toggle-password").addEventListener('click', this.togglePasswordVisibility.bind(this));

    }


    // checkIfFileCssExist(){
    // const link = document.createElement('link');
    // link.href = "login.css";
    // link.rel = "stylesheet";

    //         console.log(document.getElementsByTagName('head')[0]);

    //     return document.getElementsByTagName('head')[0]? "": document.getElementsByTagName('head')[0].prepend(link);
    // }








    render() {


        const container = document.createElement('div');

        container.innerHTML = `
            <div class="input-container">
                <div class="input-wrapper">
                    <input name=${this.inputName} id="${this.inputId}" type="${this.type}" placeholder=" ">
                    <label for=${this.forLabel} for="${this.inputId}">${this.labelName}</label>
                    ${this.type === "password" ? this.getIcon() : ""}
                </div>
        </div>
        `;

        ;



        this.append(container);

        this.querySelector("input").addEventListener("input", this.handleInput.bind(this));

        if (this.type === "password") {

            this.querySelector("#toggle-password").addEventListener("click", this.togglePasswordVisibility.bind(this));
        }



    }


}

customElements.define('my-input', MyInput);



