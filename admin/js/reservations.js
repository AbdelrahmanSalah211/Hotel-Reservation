//* globals
var parent = document.getElementById("reservation-subpage"); // to attach tables to
var addBtn = document.getElementsByClassName("add-btn")[0];
var dialog = document.getElementsByTagName("dialog")[0];
var recordModal = document.getElementsByClassName("records-modal")[0];
var closeX = document.getElementsByClassName("close-x")[0];
var closeXs = document.querySelectorAll(".close-x");

//* logic exe
//todo: make validation using try catch
//todo: see to remove the no date message when new record is added (load fn, or addfn)
//! create table (after validation of data existence)
if(localStorage.branches)
{
    var hotels = JSON.parse(window.localStorage.branches);
    if(hotels[0]["branch_id"])
    {
        var tables = createReservationTables();

        if(localStorage.reservations)
        {
            var reservations = JSON.parse(window.localStorage.reservations);
            if(reservations instanceof Array)
            {
                if(reservations.length === 0)
                {
                    const noReservations = parent.appendChild(document.createElement("center"));
                    noReservations.classList.add("no-reservations");
                    noReservations.innerText = "no data to be shown";
                }
                else
                {
                    loadReservationTables()
                }
            }
        }
        else
        {
            const noReservations = parent.appendChild(document.createElement("center"));
            noReservations.classList.add("no-reservations");
            noReservations.innerText = "no data to be shown";
        }
    }
    else
    {
        const noHotel = parent.appendChild(document.createElement("center"));
        noHotel.classList.add("no-hotel");
        noHotel.innerText = "This is not a hotel yet or you lost your data";
    }
    
}else{
    const noHotel = parent.appendChild(document.createElement("center"));
    noHotel.classList.add("no-hotel");
    noHotel.innerText = "This is not a hotel yet or you lost your data";
}



//!  events
addBtn.addEventListener
(
    "click",
    function(){
        dialog.showModal();
    }
)

closeXs.forEach((closeX)=>{

    closeX.addEventListener(
        "click",
        function(){
            console.log(this);
            closeX.closest("dialog").close();
        }
    )
})
//! fetching and attaching reservation form in the dailog
// run only if the doc at least interactive
if (document.readyState == "interactive" || document.readyState == "complete")
{
    attachForm()
}
else
{
    document.addEventListener(
        "DOMContentLoaded",
        attachForm
    )
}

async function attachForm() {
    //! HTML
    const res = await fetch("/reservation/reservation.html");
    const html = await res.text();
    const parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    const reservationForm = doc.getElementsByClassName("reservation-form")[0];
    dialog.appendChild(reservationForm);
    dispatchEvent( new CustomEvent("loadform") );
    console.log(reservationForm)

    // attach <input class="submit-btn" type="submit" value="Book">
    const closeBtn = document.createElement("input");
    closeBtn.classList.add("close-btn", "btn");
    closeBtn.type = "button";
    closeBtn.value = "Close";
    reservationForm.appendChild(closeBtn);

    closeBtn.onclick = ()=> dialog.close();

    //! CSS
    // const styleSheets = doc.getElementsByTagName("head")[0].getElementsByTagName("link")
    const pageHead = document.getElementsByTagName("head")[0];
    const style = document.createElement("link");
    style.rel="stylesheet";
    style.href = "/reservation/reservation.css";
    pageHead.appendChild(style);
    // if(!Array.from(pageHead.getElementsByTagName("link")).map(lnk => lnk.href).includes(style.href))

    //! JS
    // runScrip("/components/SelectMenu/SelectMenu.js");
    // runScrip("/components/InputLabel/InputLabel.js");
    // runScrip("/components/Toast/Toast.js");
    runScrip("/reservation/reservation.js");

}

// customizing form
// addEventListener("loadform", confForm)
// function confForm(event)
// {
//     var reservationForm = document.getElementsByClassName("reservation-form")[0];        
// }

//! successful submit actions
addEventListener("successfulSubmit", // change event to "success" dispatched by Salah
    function(event){
        const record = event.detail.record
        const tableId = event.detail.record.branch_id;

        //add record
        addReservationRecord(record,tableId)
        dialog.close();
    }
)

//! show record details
document.querySelector(".reservation-table").addEventListener("click", function (event) {
    let row = event.target.closest("tr"); // Find the closest <tr> element

    if (row && row.classList.contains("reservation-record")) {
        console.log("Row clicked:", row.rowIndex); // Row index in the table
        console.log("Row data:", row.cells[0].textContent); // Extract cell data
        const record = getReservationRecord(row.cells[0].textContent);
        recordModal.getElementsByClassName("details")[0].innerHTML = 
        `
                <div class="section section-1">
                    <div class="lable">Request ID</div>
                    <div class="field">${record.reservation_id}</div>
                    <div class="lable">Location</div>
                    <div class="field">${ getHotelBranch(record.branch_id).name}</div>
                    <div class="lable">Type of Room</div>
                    <div class="field">${record.room_type}</div>
                    <div class="lable">Number of Rooms</div>
                    <div class="field">${record.number_of_rooms}</div>
                    <input type="checkbox" class="meal-field" ${record.meals.breakfast?"checked":""} disabled>
                    <span class="meal-lable">Breakfast</span>
                    <input type="checkbox" class="meal-field" ${record.meals.lunch?"checked":""} disabled>
                    <span class="meal-lable">Lunch</span>
                    <input type="checkbox" class="meal-field" ${record.meals.dinner?"checked":""} disabled>
                    <span class="meal-lable">Dinner</span>
                </div>
                <div class="section section-2">
                    <div class="lable">Check-In Date</div>
                    <div class="field">${record.check_in}</div>
                    <div class="lable">Check-Out Date</div>
                    <div class="field">${record.check_out}</div>
                    <div class="lable">First Name</div>
                    <div class="field">${record.guest_name.split(" ")[0]}</div>
                    <div class="lable">Last Name</div>
                    <div class="field">${record.guest_name.split(" ")[1]}</div>
                    <div class="lable">Phone</div>
                    <div class="field">${record.phone_number}</div>
                </div>
            
        `
        recordModal.showModal();
    }
});



//* utilities
function loadReservationTables()
{
    for (let reservation of reservations)
    {
        addReservationRecord(reservation, tables[reservation.branch_id]); // tables[reservation.branch_id] // passes tableRefer_ of id got from reservation
    }
}

function createReservationTables()
{
    // if (document.getElementsByClassName("no-hotel")){
    //     document.getElementsByClassName("no-hotel")[0].remove();
    // }

    //! create the table
    const reservationTable = document.createElement("table");   
    reservationTable.classList.add("reservation-table");
    parent.appendChild(reservationTable);

    //! create the header
    const tableHeader = document.createElement("thead");
    reservationTable.appendChild(tableHeader);
    tableHeader.classList.add("reservation-th");
    tableHeader.innerHTML = 
    `
    <tr>
        <th>#</th>
        <th>Check-in</th>
        <th>Check-out</th>
        <th>Name</th>
        <th>Reserved Rooms</th>
    </tr>
    `


    //! create the subtables
    let tables = {};

    for (let hotel of hotels)
    {
        tables[hotel.branch_id] = createReservationTable(reservationTable, hotel.branch_id, hotel.name)
    }
    
    return tables;
}

function createReservationTable(parent, id, branchName)
{
    const reservationTable = document.createElement("tbody");   
    // <tr><td colspan="3"><strong>Fruits</strong></td></tr>
    const tableTitleCont = document.createElement("tr");
    tableTitleCont.classList.add("table-title-cont")
    const tableTitle     = document.createElement("td");
    tableTitle.colSpan = "5";
    tableTitle.classList.add("table-title");
    tableTitle.innerHTML = branchName;
    
    tableTitleCont.appendChild(tableTitle);
    reservationTable.appendChild(tableTitleCont);

    reservationTable.id = id; // HB201 
    parent.appendChild(reservationTable);
    

    return reservationTable;
}

function addReservationRecord(record, table)
{
    //! create a record
    const reservatioRecord = document.createElement("tr");
    reservatioRecord.classList.add("reservation-record")
    table.appendChild(reservatioRecord);
    
        //! create id field
    // 🆔
    const id = document.createElement("td");
    id.classList.add("record-id");
    id.innerText = record.reservation_id;
    reservatioRecord.appendChild(id);
        //! create checkin field
    reservatioRecord.appendChild(createChkInField(record.check_in));

        //! create chckout field
    reservatioRecord.appendChild(createChkOutField(record.check_out));

        //! create guest name field
    reservatioRecord.appendChild(createGuestNameField(record.guest_name));
    
        //! create room type filed
    reservatioRecord.appendChild(createRoomTypeField(record.room_type, record.number_of_rooms));
    
        //! create controls field
    reservatioRecord.appendChild(createControlsField());
        

}

// ⬇️
function createChkInField(chkInDate)
{
    const field = document.createElement("td");
    field.classList.add("chk-in"); field.title="check in date";
    // <div class="chk-in-icon icon"></div>
    const icon = document.createElement("div");
    icon.classList.add("chk-in-icon", "icon");
    field.appendChild(icon);

    // <span class="chk-in-txt">2025-03-05</span>
    const txt = document.createElement("span");
    txt.classList.add("chk-in-txt");
    txt.innerText = chkInDate.split("T")[0];
    field.appendChild(txt);

    return field;
}

// ⬆️
function createChkOutField(chkOutDate)
{
    const field = document.createElement("td");
    field.classList.add("chk-out"); field.title="check out date";
    const icon = document.createElement("div");
    icon.classList.add("chk-out-icon", "icon");
    field.appendChild(icon);

    // <span class="chk-out-txt">2025-03-05</span>
    const txt = document.createElement("span");
    txt.classList.add("chk-out-txt");
    txt.innerText = chkOutDate.split("T")[0];
    field.appendChild(txt);

    return field;
}

// 😛
function createGuestNameField(guestName)
{
    const field = document.createElement("td");
    field.classList.add("guest-name"); field.title="guest name";
    const icon = document.createElement("div");
    icon.classList.add("guest-name-icon", "icon");
    field.appendChild(icon);

    // <span class="chk-out-txt">2025-03-05</span>
    const txt = document.createElement("span");
    txt.classList.add("guest-name-txt");
    txt.innerText = guestName;
    field.appendChild(txt);

    return field;
}

// 🗝️
function createRoomTypeField(roomType, nOfRooms)
{
    const field = document.createElement("td");
    field.classList.add("rooms"); field.title="reserved room type";
    const icon = document.createElement("div");
    icon.classList.add("rooms-icon", "icon");
    field.appendChild(icon);

    // <span class="chk-out-txt">2025-03-05</span>
    const txt = document.createElement("span");
    txt.classList.add("rooms-txt");
    txt.innerText = roomType +" *"+nOfRooms;
    field.appendChild(txt);

    return field;
}

// 🎮
function createControlsField()
{
    const field = document.createElement("td");
    field.classList.add("ctrl");
    field.style.display = "none"
    const editBtn = document.createElement("div");
    editBtn.classList.add("edit-btn", "icon");
    const rejectBtn = document.createElement("div");
    rejectBtn.classList.add("reject-btn", "icon");
    
    field.appendChild(rejectBtn);
    field.appendChild(editBtn);

    return field;
}

function runScrip(scriptContent, parent = document.body, isDefer = false, isSrc = true, type = "module", isAsync = false, isDynamic = true) {
    const script = document.createElement("script");
    script.defer = isDefer;
    script.async = isAsync;
    script.type = type;
    if(isDynamic){script.setAttribute("data-dynamic", "");}

    if (isSrc)  { script.src = scriptContent +'?v='+Date.now();} 
    else        { script.innerHTML = scriptContent;}

    parent.appendChild(script);
}

function getReservationRecord(id){
    const reservations = JSON.parse(localStorage.getItem("reservations"));
    for (let record of reservations){
        if ( record.reservation_id == id){
            return record;
        }
    }
    
}

function getHotelBranch(id){
    const branches = JSON.parse(localStorage.branches);
    for (let branch of branches) {
        if (branch.branch_id == id) {
            return branch;
        }
    }
}

// reservationId, branchId, guestId, roomType, numberOfRooms, guestName, phoneNumber, checkIn, checkOut, meals