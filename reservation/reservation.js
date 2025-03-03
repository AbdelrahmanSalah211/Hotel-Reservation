const branches = [
  {
    branch_id: "HB201",
    name: "Ocean Breeze Hotel - Alexandria",
    country: "Egypt",
    rooms: [
      { type: "Single", count: 20, price_per_night: 120 },
      { type: "Twin", count: 10, price_per_night: 120 },
      { type: "Double", count: 40, price_per_night: 120 },
      { type: "Suite", count: 40, price_per_night: 120 },
      { type: "Junior-Suite", count: 3, price_per_night: 250 },
    ],
  },
  {
    branch_id: "HB202",
    name: "Ocean Breeze Hotel - Cairo",
    country: "Egypt",
    rooms: [
      { type: "Single", count: 25, price_per_night: 150 },
      { type: "Twin", count: 15, price_per_night: 150 },
      { type: "Double", count: 35, price_per_night: 150 },
      { type: "Suite", count: 45, price_per_night: 150 },
      { type: "King", count: 7, price_per_night: 220 },
      { type: "Junior-Suite", count: 4, price_per_night: 270 },
    ],
  },
];


// localStorage.setItem("branches", JSON.stringify(branches));















import { isLoggedIn } from "../utility/checkLogin.js";
import { navigate } from "../utility/routes.js";
import { reservation } from "../utility/reservationBooking.js";


const urlParams = new URLSearchParams(window.location.search);
const roomTypeParam = urlParams.get("roomType");
const breakfastParam = urlParams.get("breakfast");
const lunchParam = urlParams.get("lunch");
const dinnerParam = urlParams.get("dinner");

const queryString = `?roomType=King&breakfast=true&lunch=true&dinner=true`;

document.addEventListener("DOMContentLoaded", () => {
  // if (!isLoggedIn()) {
  //   navigate("/login");
  // }
  const form = document.querySelector(".reservation-form");
  const menus = document.querySelectorAll("select-menu");
  const location = menus[0];
  const roomType = menus[1];
  const numberOfRooms = menus[2];
  const breakfast = document.querySelector(".breakfast");
  const lunch = document.querySelector(".lunch");
  const dinner = document.querySelector(".dinner");
  const checkIn = document.querySelector("#check-in");
  const checkOut = document.querySelector("#check-out");
  const fName = document.querySelector("#first-name");
  const lName = document.querySelector("#last-name");
  const phone = document.querySelector("#phone");
  const submit = document.querySelector(".submit-btn");
  form.action = '';
  form.method = 'POST';

  const now = new Date();
  const formattedNow = now.toISOString().slice(0, 16);

  checkIn.min = formattedNow;
  checkOut.min = formattedNow;

  checkIn.addEventListener("change", () => {
    checkOut.min = checkIn.value;
  });

  const defaultBranchOption = document.createElement("option");
  defaultBranchOption.value = "";
  defaultBranchOption.textContent = "Select Branch";
  defaultBranchOption.selected = true;
  // defaultBranchOption.disabled = true;
  location.appendChild(defaultBranchOption);

  const defaultNumberOfRoomOption = document.createElement("option");
  defaultNumberOfRoomOption.value = "";
  defaultNumberOfRoomOption.textContent = "Select Number of Rooms";
  defaultNumberOfRoomOption.selected = true;
  // defaultNumberOfRoomOption.disabled = true;
  numberOfRooms.appendChild(defaultNumberOfRoomOption);

  const redirectedRoomTypeOption = document.createElement("option");
  redirectedRoomTypeOption.value = roomTypeParam;
  redirectedRoomTypeOption.textContent = roomTypeParam;
  redirectedRoomTypeOption.selected = true;
  roomType.appendChild(redirectedRoomTypeOption);

  if (breakfastParam === "true") {
    breakfast.checked = true;
  }

  if (lunchParam === "true") {
    lunch.checked = true;
  }

  if (dinnerParam === "true") {
    dinner.checked = true;
  }



  const storedBranches = JSON.parse(localStorage.getItem("branches"));

  storedBranches.forEach((branch) => {
    const locationOption = document.createElement("option");
    locationOption.value = branch.branch_id;
    locationOption.textContent = `${branch.name}, ${branch.country}`;
    location.appendChild(locationOption);
  });

  let selectedBranch;
  location.addEventListener("onChange",async function (e) {
    selectedBranch = branches.find((branch) => branch.branch_id === e.detail.value);

    RemoveChildren(roomType);
    RemoveChildren(numberOfRooms);


    selectedBranch.rooms.forEach((room) => {
      const roomTypeOption = document.createElement("option");
      roomTypeOption.value = room.type;
      roomTypeOption.textContent = room.type;
      roomType.appendChild(roomTypeOption);
    });



    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // if(roomTypeParam){
          const selectRoomTypeParam = roomType.children[1];
          const selectRoomTypeChildren = selectRoomTypeParam.children;
          Array.from(selectRoomTypeChildren).forEach((child) => {
            if(child.value === roomTypeParam){
              child.selected = true;
              roomType.dispatchEvent(new CustomEvent("onChange", { detail: { value: child.value } }));
            }
          });
        // }
        resolve("done");
      }, 0);
    })

    if(roomTypeParam){
      const str = await myPromise;
      console.log(str);
    }

  });


  roomType.addEventListener("onChange", async function (e) {
    const selectedRoomType = selectedBranch.rooms.find(
      (room) => room.type === e.detail.value
    );
    RemoveChildren(numberOfRooms);
    numberOfRooms.label = `Number of Rooms <span>( ${selectedRoomType.count} available )</span>`
    for(let i = 1; i <= selectedRoomType.count; i++){
      const numberOfRoomOption = document.createElement("option");
      numberOfRoomOption.value = i;
      numberOfRoomOption.textContent = i;
      numberOfRooms.appendChild(numberOfRoomOption);
    }
  });

  fName.addEventListener("input", function (e) {
    const val = parseInt(e.data);
    if(Number.isInteger(val)){
      fName.value = fName.value.slice(0, fName.value.length - 1);
    }
  });

  lName.addEventListener("input", function (e) {
    const val = parseInt(e.data);
    if(Number.isInteger(val)){
      lName.value = lName.value.slice(0, lName.value.length - 1);
    }
  });

  phone.addEventListener("input", function (e) {
    const val = parseInt(e.data);
    if(Number.isNaN(val)){
      phone.value = phone.value.slice(0, phone.value.length - 1);
    }
  });



  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const resBranchId = location.value;
    const resRoomType = roomType.value;
    const resNumberOfRooms = numberOfRooms.value;
    const resMeals = {
      breakfast: breakfast.checked,
      lunch: lunch.checked,
      dinner: dinner.checked,
    };
    const resCheckInDate = checkIn.value;
    const resCheckOutDate = checkOut.value;
    const resName = `${fName.value} ${lName.value}`;
    const resPhoneNumber = phone.value;
    const guestInfo = {
      resName,
      resPhoneNumber
    }
    // const errP = document.querySelector(".error-message");
    if (!resBranchId || !resNumberOfRooms || !resCheckInDate || !resCheckOutDate || !fName.value || !lName.value || !resPhoneNumber) {
      // errP.style.display = "block";
      console.log("wrong fields");
      console.log(`resBranchId: ${resBranchId}, resRoomType: ${resRoomType}, resNumberOfRooms: ${resNumberOfRooms}, resMeals: ${resMeals}, resCheckInDate: ${resCheckInDate}, resCheckOutDate: ${resCheckOutDate}, guestInfo: ${guestInfo}`);
    } else {
      // errP.style.display = "none";
      console.log("correct fields");
      console.log(`resBranchId: ${resBranchId}, resRoomType: ${resRoomType}, resNumberOfRooms: ${resNumberOfRooms}, resMeals: ${resMeals}, resCheckInDate: ${resCheckInDate}, resCheckOutDate: ${resCheckOutDate}, guestInfo: ${guestInfo}`);
      reservation(resBranchId, resRoomType, resNumberOfRooms, resMeals, resCheckInDate, resCheckOutDate, guestInfo);
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  });
});

function RemoveChildren(selectMenu) {
  const customchildren = selectMenu.children;
  const select = customchildren[1];
  const childrenDelete = select.children;
  Array.from(childrenDelete).forEach((child) => {
    select.removeChild(child);
  });
}






















