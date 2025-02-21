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
        console.log(Array.from(this.children).filter((child) => child.classList.contains('nav-item')))
        return Array.from(this.children).filter((child) => child.classList.contains('nav-item'));
    }

    getLogo() {
        return Array.from(this.children).filter((child) => child.classList.contains('nav-logo'));
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
        console.log(listItems);
        listItems.forEach((item) => {
            const navItem = document.createElement('li');
            navItem.classList.add("nav-item-container");

            item.classList.remove('nav-item');
            navItem.appendChild(item);

            this.querySelector('.nav-list').appendChild(navItem);
        })

        const logos = this.getLogo();
        this.querySelector('.nav-logo-container').appendChild(this.getLogo()[logos.length - 1]);
        for(let i = 0; i < logos.length - 1; i++){
            logos[i].remove();
        }


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
                                    const navItem = document.createElement('li');
                                    navItem.classList.add('nav-item-container');
                                    node.remove();
                                    navItem.appendChild(node);
                                    this.querySelector('.nav-list').appendChild(navItem);
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