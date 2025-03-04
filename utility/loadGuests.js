export function loadGuests(){
    let guests;

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
// loadGuests(); // for dev