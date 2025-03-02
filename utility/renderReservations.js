import { loadData } from "/utility/loadData.js";

function renderReservations(){
    loadData();

    for( let reservation of JSON.parse(localStorage.reservations) ){
        console.log(reservation)
        reservationRecord(document.body, reservation["reservation_id"]);
        

    }
}

function reservationRecord(parent, _id){
    const reservationRecord = document.createElement("div");
    const id = document.createElement("p");
    id.innerHTML = _id;

    parent.appendChild(reservationRecord);
    reservationRecord.appendChild(id);
}

renderReservations();


//! test code for t
//TODO: make every reservation to go to other div oncliking paid/confirm button
onload = function(){
    const cont1 = document.getElementById("cont1");
    const cont2 = document.getElementById("cont2");
    const fly   = document.getElementById("fly");

    fly.onclick = function(){
        [cont1, cont2][cont1.contains(fly) ? 1 : 0].appendChild(fly);
    }

}