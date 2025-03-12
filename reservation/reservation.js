import { isLoggedIn } from "/utility/checkLogin.js";
import { navigate } from "/utility/routes.js";
import { reservation } from "/utility/reservationBooking.js";

const urlParams = new URLSearchParams(window.location.search);
const roomTypeParam = urlParams.get("roomType");
const breakfastParam = urlParams.get("breakfast");
const lunchParam = urlParams.get("lunch");
const dinnerParam = urlParams.get("dinner");

const queryString = `?roomType=King&breakfast=true&lunch=true&dinner=true`;


const reservationEventHandler = async function () {
  const smScript = document.createElement("script");
  smScript.src = `/components/SelectMenu/SelectMenu.js?v=${Date.now()}`;
  smScript.type = "module";
  smScript.async = false;
  smScript.setAttribute("data-dynamic", "");
  document.body.append(smScript);
  
  const smLink = document.createElement("link");
  smLink.rel = "stylesheet";
  smLink.href = "/components/SelectMenu/SelectMenu.css";
  smLink.setAttribute("data-dynamic", "");
  document.head.append(smLink);

  const ilScript = document.createElement("script");
  ilScript.src = `/components/InputLabel/InputLabel.js?v=${Date.now()}`;
  ilScript.async = false;
  ilScript.setAttribute("data-dynamic", "");
  document.body.append(ilScript);

  const ilLink = document.createElement("link");
  ilLink.rel = "stylesheet";
  ilLink.href = "/components/InputLabel/InputLabel.css";
  ilLink.setAttribute("data-dynamic", "");
  document.head.append(ilLink);

  const tScript = document.createElement("script");
  tScript.src = `/components/Toast/Toast.js?v=${Date.now()}`;
  tScript.async = false;
  tScript.setAttribute("data-dynamic", "");
  document.body.append(tScript);

  const tLink = document.createElement("link");
  tLink.rel = "stylesheet";
  tLink.href = "/components/Toast/Toast.css";
  tLink.setAttribute("data-dynamic", "");
  document.head.append(tLink);

  await new Promise((resolve) => ilScript.addEventListener("load", resolve));

  if (!isLoggedIn()) {
    navigate("/login");
  }

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
  location.appendChild(defaultBranchOption);

  const defaultNumberOfRoomOption = document.createElement("option");
  defaultNumberOfRoomOption.value = "";
  defaultNumberOfRoomOption.textContent = "Select Number of Rooms";
  defaultNumberOfRoomOption.selected = true;
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
    selectedBranch = storedBranches.find((branch) => branch.branch_id === e.detail.value);

    removeChildren(roomType);
    removeChildren(numberOfRooms);

    selectedBranch.rooms.forEach((room) => {
      const roomTypeOption = document.createElement("option");
      roomTypeOption.value = room.type;
      roomTypeOption.textContent = room.type;
      roomType.appendChild(roomTypeOption);
    });

    function myPromise(){
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            const selectRoomTypeParam = roomType.children[1];
            const selectRoomTypeChildren = selectRoomTypeParam.children;
            Array.from(selectRoomTypeChildren).forEach((child) => {
              if(child.value === roomTypeParam){
                child.selected = true;
                roomType.dispatchEvent(new CustomEvent("onChange", { detail: { value: child.value } }));
              }
            });
          resolve("done");
        }, 0);
      })
    }

    if(roomTypeParam){
      const str = await myPromise();
      console.log(str);
    }
  });

  roomType.addEventListener("onChange", async function (e) {
    const selectedRoomType = selectedBranch.rooms.find(
      (room) => room.type === e.detail.value
    );
    removeChildren(numberOfRooms);
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

    if (!resBranchId || !resNumberOfRooms || !resCheckInDate || !resCheckOutDate || !fName.value || !lName.value || !resPhoneNumber) {
      console.log("wrong fields");
      console.log(`resBranchId: ${resBranchId}, resRoomType: ${resRoomType}, resNumberOfRooms: ${resNumberOfRooms}, resMeals: ${resMeals}, resCheckInDate: ${resCheckInDate}, resCheckOutDate: ${resCheckOutDate}, guestInfo: ${guestInfo}`);
    } else {
      console.log("correct fields");
      console.log(`resBranchId: ${resBranchId}, resRoomType: ${resRoomType}, resNumberOfRooms: ${resNumberOfRooms}, resMeals: ${resMeals}, resCheckInDate: ${resCheckInDate}, resCheckOutDate: ${resCheckOutDate}, guestInfo: ${guestInfo}`);
      reservation(resBranchId, resRoomType, resNumberOfRooms, resMeals, resCheckInDate, resCheckOutDate, guestInfo);
      setTimeout(() => {
        if(window.location.pathname == "/reservation/reservation.html"){
          navigate("/");
        } else if (window.location.pathname == "/admin/reservation.html"){
          const modal = document.querySelector("dialog");
          modal.close();
        }
      }, 4000);
    }
  });

  function removeChildren(selectMenu) {
    const customchildren = selectMenu.children;
    const select = customchildren[1];
    const childrenDelete = select.children;
    Array.from(childrenDelete).forEach((child) => {
      select.removeChild(child);
    });
  }
}

if (document.readyState == "interactive" || document.readyState == "complete") {
  reservationEventHandler()
} else {
  document.addEventListener("DOMContentLoaded", reservationEventHandler);
}

// document.addEventListener("DOMContentLoaded", reservationEventHandler);

// module.exports = { reservationEventHandler };

export default reservationEventHandler;
