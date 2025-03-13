class Footer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
    }

    createListItems(limit) {
        const rooms = JSON.parse(localStorage.getItem("room_types"));

        const listItems = rooms.slice(0, limit).map((room) => `
            <li>
                <a 
                    href="/reservation/reservation.html?roomType=${room["type"]}&breakfast=${room["meals"]["breakfast"]}&lunch=${room["meals"]["lunch"]}&dinner=${room["meals"]["dinner"]}"
                >
                    ${room.type} Room
                </a>
            </li>
        `).join("");
        return listItems;
    }

    render() {
        this.innerHTML = `
            <footer class="footer">
                <section class="about-us">
                    <h2>ITI<br>Hotels</h2>
                    <p>Dedicated to providing exceptional hospitality with comfort and luxury. Whether you're traveling for business or leisure, our hotels offer top-tier amenities, seamless service, and a welcoming atmosphere. Experience relaxation and convenience at its finest with ITI Hotels.</p>
                </section>
                <section class="quick-links">
                    <div class="book-now">
                        <h3>Book Now</h3>
                        <ul>
                            ${this.createListItems(5)}
                        </ul>
                    </div>
                    <div class="contact-us" id="contact-us">
                        <h3>Contact Us</h3>
                        <ul>
                            <li class="phone">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5" id="phone">
                                    <defs>
                                        <clipPath id="a">
                                            <path d="M0 38h38V0H0v38Z"></path>
                                        </clipPath>
                                    </defs>
                                    <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
                                        <path d="m35.06 10.593-3.496 3.496a4.942 4.942 0 0 1-8.341-2.528c-5.765 1.078-11.372 6.662-11.721 11.653a4.918 4.918 0 0 1 2.587 1.36 4.944 4.944 0 0 1 0 6.991l-3.495 3.495a4.943 4.943 0 0 1-6.99 0C-6.881 24.574 24.575-6.882 35.06 3.604a4.942 4.942 0 0 1 0 6.989"></path>
                                    </g>
                                </svg>
                                <p>+0123-456-789</p>
                            </li>
                            <div class="social-media-container">
                                <li class="social-media">
                                    <a href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="88.428 12.828 107.543 207.085" id="facebook">
                                            <path d="M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"></path>
                                        </svg>
                                    </a>
                                </li>
                                <li class="social-media">
                                    <a href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 16 16" id="instagram">
                                            <g fill="none" stroke-miterlimit="10">
                                                <path d="M11.5 15.5h-7a4 4 0 0 1-4-4v-7a4 4 0 0 1 4-4h7a4 4 0 0 1 4 4v7a4 4 0 0 1-4 4z"></path>
                                                <circle cx="8" cy="8" r="3.5"></circle>
                                                <circle cx="12.5" cy="3.5" r=".5"></circle>
                                            </g>
                                        </svg>
                                    </a>
                                </li>
                                <li class="social-media">
                                    <a href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 72 72" viewBox="0 0 72 72" id="twitter-x">
                                            <switch>
                                                <g>
                                                <path d="M42.5,31.2L66,6h-6L39.8,27.6L24,6H4l24.6,33.6L4,66
                                                        h6l21.3-22.8L48,66h20L42.5,31.2z M12.9,10h8l38.1,52h-8L12.9,10z"></path>
                                                </g>
                                            </switch>
                                        </svg>
                                    </a>
                                </li>
                            </div>
                        </ul>
                    </div>
                </section>
            </footer>
        `
    }
}

customElements.define('custom-footer', Footer);