export function loadData() {
    // let;

    if(!window.localStorage.getItem("branches")){
        
        fetch("/assets/data/hotel.json")
        .then((res)=> res.json())
        .then(
            data=>{
                window.localStorage.setItem("branches", JSON.stringify(data.branches));
            }
        );
    }

    if (!window.localStorage.getItem("reservations")) {

        fetch("/assets/data/reservations.json")
            .then((res) => res.json())
            .then(
                data => {
                    window.localStorage.setItem("reservations", JSON.stringify(data.reservations));
                }
            );
    }
    
    if(!window.localStorage.getItem("room_types")){

        fetch("/assets/data/rooms.json")
        .then((res)=> res.json())
        .then(
            data=>{
                window.localStorage.setItem("room_types", JSON.stringify(data.room_types));
            }
        );
    
    }


    if(!window.localStorage.getItem("guests")){
        
        fetch("/assets/data/guests.json")
        .then((res)=> res.json())
        .then(
            data=>{
                window.localStorage.setItem("guests", JSON.stringify(data.guests));
            }
        );
    
    }

}
// loadData(); // for dev