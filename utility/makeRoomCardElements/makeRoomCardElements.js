function makeRoomCardElements(roomsObject){
    let roomCardElement;
    let roomType;
    let roomDescription;
    let roomImage;
    let roomMeals;

    let alternator =0;
    for(let roomObject of roomsObject["room_types"]){
        console.log(roomObject);

        // create element contents
        roomCardElement = document.createElement("room-card");
        
        roomType        = document.createElement("h1");
        roomDescription = document.createElement("p");
        roomMeals       = document.createElement("p");
        roomImage       = document.createElement("img");
        
        // fill content with data
        roomType.innerHTML          = roomObject["type"] + " Room";
        roomDescription.innerHTML   = roomObject["description"];
        roomMeals.innerText = "Meals of the Day: " +
                              ((roomObject["meals"]["breakfast"])?"breakfast ":"") +
                              ((roomObject["meals"]["lunch"])    ?"lunch "    :"") +
                              ((roomObject["meals"]["dinner"])   ?"dinner "   :"");
        roomImage.src = roomObject["image_url"];

        // connect the element to the Dom
        document.body.appendChild(roomCardElement);
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
// .then(data=>makeRoomCardElements(data))