import { reservationStatistics } from "/utility/reservationStatistics.js";


const data = reservationStatistics();
console.log(data);

const roomTypes = JSON.parse(localStorage.getItem("room_types"))

const roomsContainer = document.querySelector(".rooms-container");

for (const roomType of roomTypes) {  
  const rmCard = document.createElement("div");
  rmCard.classList.add("card");
  roomsContainer.appendChild(rmCard);

  const heading = document.createElement("h4");
  heading.innerText = roomType.type;
  rmCard.appendChild(heading);

  const resContainer = document.createElement("div");
  resContainer.classList.add("res-container");
  rmCard.appendChild(resContainer);

  const imgCard = document.createElement("div");
  imgCard.classList.add("img-card");
  resContainer.appendChild(imgCard);
  const rmImg = document.createElement("img");
  rmImg.classList.add("room-img");
  rmImg.src = roomType.image_url;
  rmImg.alt = roomType.description;
  imgCard.appendChild(rmImg);

  const iconsOverlay = document.createElement("div");
  iconsOverlay.classList.add("icons-overlay");
  imgCard.appendChild(iconsOverlay);

  if (roomType.meals.breakfast){
    const breakfastIcon = document.createElement("img");
    breakfastIcon.src = "/assets/images/icons/breakfast.png";
    breakfastIcon.alt = "breakfast icon";
    iconsOverlay.appendChild(breakfastIcon);
  }

  if (roomType.meals.lunch){
    const lunchIcon = document.createElement("img");
    lunchIcon.src = "/assets/images/icons/lunch.png";
    lunchIcon.alt = "lunch icon";
    iconsOverlay.appendChild(lunchIcon);
  }

  if (roomType.meals.dinner){
    const dinnerIcon = document.createElement("img");
    dinnerIcon.src = "/assets/images/icons/dinner.png";
    dinnerIcon.alt = "dinner icon";
    iconsOverlay.appendChild(dinnerIcon);
  }

  const info = document.createElement("div");
  info.classList.add("info");
  resContainer.appendChild(info);

  const totalCount = document.createElement("p");
  totalCount.classList.add("total-count");
  totalCount.innerHTML = `<strong>Total Count: </strong>${data[roomType.type].total_count}`
  info.appendChild(totalCount);

  const reserved = document.createElement("p");
  reserved.classList.add("reserved");
  reserved.innerHTML = `<strong>Reserved: </strong>${data[roomType.type].reserved}`
  info.appendChild(reserved);

  const available = document.createElement("p");
  available.classList.add("available");
  available.innerHTML = `<strong>Available: </strong>${data[roomType.type].remaining}`
  info.appendChild(available);

  const description = document.createElement("p");
  description.classList.add("description");
  description.innerText = roomType.description;
  info.appendChild(description);
}















