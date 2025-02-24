class RoomCard extends HTMLElement {
    constructor(){
        super();

        this.bookBtn = null;
    }

    connectedCallback(){
        this.innerHTML  = `
            <div class="cntnr card">
                <div class="imgCntnr">
                    <img src="./images/room1.jpg" alt="roomImg">
                </div>
                <div class="bodyCntnr">
                    <div class="textBody">

                    </div>
                    <button class="bookBtn">Book</button>
                </div>
            </div>
        `;

        //* initial styling
        if(!document.getElementById("Room-card-style")){

            const style     = document.createElement("link")
            style.href      = "RoomCard.css";
            style.rel       = "stylesheet";
            style.id        = "Room-card-style";
            document.head.prepend(style);
        }

        //* elements refs
        this.bookBtn           = this.querySelector(".bookBtn");
        const imgCntnr          = this.querySelector(".imgCntnr");
        const imgE              = this.querySelector("img");
        const textBodyAdopted   = this.querySelector(".textBody");
        
        
    //! control children adoption to my custom element
        
        //! the callback function to embed children nodes within
        const embed = function(mutationList, observer){
            //console.log(this);

            //* get every mutation record
            for(const mutation of mutationList){
                
                //* is there added nodes?
                if (mutation.addedNodes.length > 0){
                    
                    //* catch the added node (child)
                    mutation.addedNodes.forEach(


                        (node) =>{

                            // console.log(node);
                            //* disconnect the user-added node (child)
                            node.remove();

                            //* connect the user-added node in its place
                            if (node instanceof HTMLElement){

                                //* if the node is image override the image
                                if (node.tagName === 'IMG') {
                                        // imgE.src = node.src;
                                        // imgE.alt = node.alt;
                        
                                    imgE.remove();
                                    imgCntnr.appendChild(node);

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
                // embed.bind(this) : if you want to refrence the RoomCard object and querySelect;
        
        //! start the observer for childList change
        childrenObserver.observe(this, {childList:true});

    //! book event
        //* create the event object
        this.bookEvent = new CustomEvent("book");
        
        //* when to fire event logic
        this.bookBtn.addEventListener (
            "click",
            () =>{
                console.log("clicked");
                // let roomCard fire the book event
                if(this.onBook instanceof Function){

                    this.dispatchEvent(new Event("book"));
                }
                
                
            }
        );

        //* the handler
        this.onBook;

        //* default book event listener
        this.addEventListener(
            "book", 
            ()=>{
                this.onBook();
            },
        );

    }

    disconnectedCallback(){}

}
customElements.define('room-card', RoomCard);