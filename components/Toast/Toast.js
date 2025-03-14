if (!customElements.get('custom-toast')) {
    class Toast extends HTMLElement {
        constructor() {
            super();
        }

        get classList() {
            return this.getAttribute('class');
        }

        set classList(value) {
            this.setAttribute('class', value);
        }

        get message() {
            return this.getAttribute('message');
        }

        set message(message) {
            this.setAttribute('message', message);
        }

        get type() {
            return this.getAttribute('type');
        }

        set type(type) {
            this.setAttribute('type', type);
        }

        get time() {
            this.getAttribute('time');
        }

        set time(time) {
            this.setAttribute('time', time);
        }

        get animation_duration() {
            return this.getAttribute('animation_duration');
        }

        set animation_duration(duration) {
            this.setAttribute('animation_duration', duration);
        }

        getIcon() {
            switch (this.type) {
                case 'success':
                    return {
                        icon: `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                            <path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z"></path>
                        </svg>
                    `
                    };
                case 'error':
                    return {
                        icon: `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                            <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                        </svg>
                    `
                    };
                case 'warning':
                    return {
                        icon: `
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z"></path>
                            </g>
                        </svg>
                    `
                    };
                default:
                    return {
                        icon: `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                            <path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z"></path>
                        </svg>
                    `
                    };
            }
        }

        connectedCallback() {
            this.render();
        }

        fire() {
            console.log('toast fired');
            this.getElementsByClassName('toast-container')[0].classList.add('active');
            setTimeout(() => {
                console.log('toast removed');
                this.getElementsByClassName('toast-container')[0].classList.remove('active');
            }, this.time || 3000);
        }

        render() {
            this.innerHTML = `
            <div class="toast-container" id="toast-container">
                <div class="toast-type ${this.type}">${this.getIcon(this.type).icon}</div>
                <div class="toast-message-container">
                    <p class="toast-message">${this.message}</p>
                </div>
            </div>
        `;

            document.documentElement.style.setProperty("--animation-duration", this.animation_duration || "0.5s");
        }

    }


    customElements.define('custom-toast', Toast);
}