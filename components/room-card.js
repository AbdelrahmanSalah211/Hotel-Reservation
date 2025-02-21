class RoomCard extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML  = 
    `
            <div class="cntnr card">
                <div class="imgCntnr">
                    <img src="room1.jpg" alt="room1Img">
                </div>
                <div class="bodyCntnr">
                    <div class="textBody">

                    </div>
                    <button class="bookBtn">Book</button>
                </div>
            </div>
        `;

        // initial styling
        this.style.display = "block";
        this.style.boxSizing = "border-box"
        // this.style.backgroundColor = "yellow";
        this.style.width = "100%";


        this.querySelector(".cntnr").style.display = "flex";
        this.querySelector(".cntnr").style.width = "100%";
        this.querySelector(".cntnr").style.flexDirection = "row";
        this.querySelector(".imgCntnr").style.width ="35%";
        const imgNode = this.querySelector("img");
        imgNode.style.display = "block";
        this.querySelector("img").style.width = "100%";
        
        this.querySelector(".bodyCntnr").style.display = "flex";
        this.querySelector(".bodyCntnr").style.flexDirection = "column";
        this.querySelector(".bodyCntnr").style.justifyContent = "space-between";
        this.querySelector(".bodyCntnr").style.width = "65%";
        this.querySelector(".bodyCntnr").style.paddingLeft = "5%";
        
        const bookBtn = this.querySelector(".bookBtn");
        // bookBtn.style.alignSelf = "baseline";
        bookBtn.style.marginBottom = "24px";
        
        
        //! control children adoption to my custom element
        //! the callback function to embed children nodes within
        const textBodyAdopted = this.querySelector(".textBody");
        const embed = function(mutationList, observer){
            // get every mutation
            for(const mutation of mutationList){
                // catch the added node (child)
                if (mutation.addedNodes.length > 0){
                    mutation.addedNodes.forEach(
                        (node) =>{

                            if (node instanceof HTMLElement){
                                console.log(node);
                                // disconnect the added node (child)
                                node.remove();
                                // connect the added node in the body container
                                    // if the node is image override the image
                                if (node.tagName === 'IMG') {
                                        imgNode.src = node.src;
                                        imgNode.alt = node.alt;
                                }else{

                                    textBodyAdopted.appendChild(node);
                                }
                            }

                        }

                    )
                }
            }
        }
            //! create observer 
        const childrenObserver = new MutationObserver(embed);
            //! start the observer for childList change
        childrenObserver.observe(this, {childList:true});
    }

}
customElements.define('room-card', RoomCard);