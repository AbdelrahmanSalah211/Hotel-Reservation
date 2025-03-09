//* globals
var parent = document.getElementById("reservation-subpage"); // document.createElement("div"); // for now



//* logic exe

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

//!  add a reservation button logid
var addBtn = document.getElementsByClassName("add-btn")[0];
var dialog = document.getElementsByTagName("dialog")[0];
addBtn.addEventListener
(
    "click",
    function(){
        dialog.showModal();
    }
)

//! fetching and attaching reservation form in the dailog
var doc;
fetch("/reservation/reservation.html")
.then(res => res.text())
.then
(
    (html) => 
    {
        const parser = new DOMParser();
        doc    = parser.parseFromString(html, "text/html");

        const reservationForm = doc.getElementsByClassName("reservation-form")[0];
        dialog.appendChild(reservationForm);
        
        // attaching the styling
        const styleSheets = doc.getElementsByTagName("head")[0].getElementsByTagName("link")
        for (let style of styleSheets)
        {
            // if(!Array.from(thisHead.getElementsByTagName("link")).map(lnk => lnk.href).includes(style.href))
            style.setAttribute("data-dynamic","")    
            document.getElementsByTagName("head")[0].appendChild(style);
        }

        // attaching scripts
        const scripts = doc.getElementsByTagName("script");
        for (let script of scripts) {
            const newScript = document.createElement("script");
            newScript.src = script.src;
            newScript.type = "module"
            document.body.appendChild(newScript);
        }
    }

)

setTimeout(()=>{
    const ln = document.createElement("script");
    ln.src = "/reservation/reservation.js";
    ln.type = "module";
    document.body.appendChild(ln)
}, 100)


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
    const reservationTable = document.createElement("table");   
    reservationTable.classList.add("reservation-table");
    parent.appendChild(reservationTable);

    let tables = {};

    for (let hotel of hotels)
    {
        tables[hotel.branch_id] = createReservationTable(reservationTable, hotel.branch_id)
    }
    
    return tables;
}

function createReservationTable(parent, id)
{
    const reservationTable = document.createElement("tbody");   
    // reservationTable.classList.add("reservation-table");
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
    reservatioRecord.appendChild(createRoomTypeField(record.room_type));
    
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
    txt.innerText = chkInDate;
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
    txt.innerText = chkOutDate;
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
function createRoomTypeField(roomType)
{
    const field = document.createElement("td");
    field.classList.add("rooms"); field.title="reserved room type";
    const icon = document.createElement("div");
    icon.classList.add("rooms-icon", "icon");
    field.appendChild(icon);

    // <span class="chk-out-txt">2025-03-05</span>
    const txt = document.createElement("span");
    txt.classList.add("rooms-txt");
    txt.innerText = roomType;
    field.appendChild(txt);

    return field;
}

// 🎮
function createControlsField()
{
    const field = document.createElement("td");
    field.classList.add("ctrl");
    const editBtn = document.createElement("div");
    editBtn.classList.add("edit-btn", "icon");
    const rejectBtn = document.createElement("div");
    rejectBtn.classList.add("reject-btn", "icon");
    
    field.appendChild(rejectBtn);
    field.appendChild(editBtn);

    return field;
}

// function runScriptManually(scriptContent, isSrc = false) {
//     const script = document.createElement("script");
//     if (isSrc) {
//         script.src = scriptContent;
//     } else {
//         script.innerHTML = scriptContent;
//     }
//     document.head.appendChild(script);
// }

// // Example usage:
// // runScriptManually('console.log("Hello, World!");');
// // runScriptManually('/path/to/your/script.js', true);

// reservationId, branchId, guestId, roomType, numberOfRooms, guestName, phoneNumber, checkIn, checkOut, meals