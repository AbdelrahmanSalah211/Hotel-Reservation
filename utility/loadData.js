export function loadData() {
    // let;

    if (!window.localStorage.getItem("hotel")) {

        fetch("/assets/data/hotel.json")
            .then((res) => res.json())
            .then(
                data => {
                    window.localStorage.setItem("hotel", JSON.stringify(data.branches));
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

    if (!window.localStorage.getItem("rooms")) {

        fetch("/assets/data/rooms.json")
            .then((res) => res.json())
            .then(
                data => {
                    window.localStorage.setItem("rooms", JSON.stringify(data.room_types));
                }
            );

    }

}
// loadData(); // for dev