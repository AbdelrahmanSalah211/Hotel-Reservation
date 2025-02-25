function loadGuests(){
    let guests;
    fetch("/assets/data/guests.json")
    .then((res)=> res.json())
    .then(
        data=>{
            if(!window.localStorage.getItem("guests")){
                window.localStorage.setItem("guests", JSON.stringify(data.guests));
            }
        }
    );
}
// loadGuests(); // for dev