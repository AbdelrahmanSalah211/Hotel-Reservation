import {navigate} from "./routes.js";

export function makeRoomCardElements(rooms, limit,container){
    let roomCardElement;
    let roomType;
    let roomDescription;
    let roomImage;
    let roomMeals;

    let alternator =0;
    // Option 1: Using slice to limit to first N elements
    for (let roomObject of rooms.slice(0, limit)){

        // create element contents
        roomCardElement = document.createElement("room-card");

        roomCardElement.onBook = ()=>navigate("/reservation",`roomType=${roomObject["type"]}&breakfast=${roomObject["meals"]["breakfast"]}&lunch=${roomObject["meals"]["lunch"]}&dinner=${roomObject["meals"]["dinner"]}`);
        
        roomType        = document.createElement("h1");
        roomDescription = document.createElement("p");
        roomMeals       = document.createElement("p");
        roomImage       = document.createElement("img");
        
        // fill content with data
        roomType.innerHTML          = roomObject["type"] + " Room";
        roomDescription.innerHTML   = roomObject["description"];
        roomMeals.innerText = "Included meals: " +
                              ((roomObject["meals"]["breakfast"])?"breakfast ":"") +
                              ((roomObject["meals"]["lunch"])    ?"lunch "    :"") +
                              ((roomObject["meals"]["dinner"])   ?"dinner"   :"");
        roomImage.src = roomObject["image_url"];

        // connect the element to the Dom
        container.appendChild(roomCardElement);
        roomCardElement.appendChild(roomType);
        roomCardElement.appendChild(roomDescription);
        roomCardElement.appendChild(roomMeals);
        roomCardElement.appendChild(roomImage);

        if(alternator%2){
            roomCardElement.getElementsByClassName("cntnr")[0].classList.add("cntnr-reverse");
        }
        alternator++;
    }
}

// for dev
// fetch("/assets/data/rooms.json")
// .then((res)=> res.json())
// .then(data=>makeRoomCardElements(data,3))
