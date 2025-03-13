//TODO: function that detects currenet directory
class RoomCard extends HTMLElement 
{
    constructor()
    {
        super();

        this.bookBtn = null;
    }

    connectedCallback()
    {
        this.innerHTML  = `
            <div class="cntnr card">
                <div class="imgCntnr">
                    <img src="/assets/images/triple.webp" alt="roomImg">
                </div>
                <div class="bodyCntnr">
                    <div class="textBody">

                    </div>
                    <button class="bookBtn">Book</button>
                </div>
            </div>
        `;

        //* elements refs
        this.bookBtn           = this.querySelector(".bookBtn");
        const imgCntnr          = this.querySelector(".imgCntnr");
        const imgE              = this.querySelector("img");
        const textBodyAdopted   = this.querySelector(".textBody");
        
        
    //! control children adoption to my custom element
        
        //! the callback function to embed children nodes within
        const embed = function(mutationList, observer)
        {
            //* get every mutation record
            for(const mutation of mutationList)
            {    
                //* is there added nodes?
                if (mutation.addedNodes.length > 0)
                {    
                    //* catch the added node (child)
                    mutation.addedNodes.forEach
                    (
                        (node) =>
                        {
                            //* disconnect the user-added node (child)
                            node.remove();

                            //* connect the user-added node in its place
                            if (node instanceof HTMLElement){

                                //* if the node is image override the image
                                if (node.tagName === 'IMG')
                                {
                                    imgE.remove();
                                    imgCntnr.appendChild(node);
                                }
                                else
                                {
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
            () =>
            {
                // let roomCard fire the book event
                if(this.onBook instanceof Function)
                {
                    this.dispatchEvent(new Event("book"));
                }
            }
        );

        //* the handler
        this.onBook;

        //* default book event listener
        this.addEventListener(
            "book", 
            ()=>this.onBook()
        );
    }

    disconnectedCallback(){}

}
try 
{
    customElements.define('room-card', RoomCard);
} 
catch (error) 
{
    console.error("`room-card` custom element maybe already Defined 😉")    
}

// for dev
// onload = function(){
//     const roomCard1 = document.createElement("room-card");
//     const hOne1 = document.createElement("h1");
//     hOne1.innerText = "head"
//     document.body.appendChild(roomCard1);
    
//     roomCard1.appendChild(hOne1);
    
//     this.setTimeout(function(){
//         hOne1.remove();

//     },100)
// }