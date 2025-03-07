export default function loadStaff() {
    if (!localStorage.getItem("staff")) {
        fetch("/assets/data/staff.json")
            .then((data) => data.json()
            ).then(
                data => {
                    localStorage.setItem("staff", JSON.stringify(data.staff));
             })
            .catch((error) => {
                console.log(error);

            })
    }
}