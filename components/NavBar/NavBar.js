class NavBar extends HTMLElement {
    constructor() {
        super();
    }

    get classList() {
        return this.getAttribute('class');
    }

    set classList(value) {
        this.setAttribute('class', value);
    }

    getListitems() {
        return Array.from(this.getElementsByClassName('nav-item'));
    }

    getLogo() {
        return Array.from(this.getElementsByClassName('nav-logo'));
    }

    connectedCallback() {
        this.render();
    }

    render(){
        this.innerHTML += `
            <nav class=${this.classList}>
                <div class="nav-logo-container">

                </div>
                <ul class="nav-list">

                </ul>
            </nav>
        `;

        this.removeAttribute('class');

        const listItems = this.getListitems();
        listItems.forEach((item) => {
            this.querySelector('.nav-list').appendChild(item);
        })

        const logos = this.getLogo();
        this.querySelector('.nav-logo-container').appendChild(this.getLogo()[logos.length - 1]);


        function embed(mutationList, observer) {
            for (const mutation of mutationList) {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(
                        (node) => {
                            if (node instanceof HTMLElement && (node.classList.contains('nav-item') || node.classList.contains('nav-logo'))) {
                                if (node.classList.contains('nav-logo')) {
                                    if (this.querySelector('.nav-logo-container').children.length > 0){
                                        this.querySelector('.nav-logo-container').children[0].remove();
                                    }
                                    node.remove();
                                    this.querySelector('.nav-logo-container').appendChild(node);
                                }else if(node.classList.contains('nav-item')){
                                    node.remove();
                                    this.querySelector('.nav-list').appendChild(node);
                                }
                            }
                        }
                    );
                }
            }
        }

        const observer = new MutationObserver(embed);
        observer.observe(this, { childList: true });
    }
}

customElements.define('nav-bar', NavBar);