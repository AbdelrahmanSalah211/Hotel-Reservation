



function addStaff(email, password) {

    let data = localStorage.getItem('staff');

    let staff = data.staff.find(data => data.email === email);

    if (staff) {
        console.log("this staff is already added");
        return;

    }

    let newStaff =
    {
        email: email,
        password: password,
        isAdmin: false
    }

    data.staff.push(newStaff);

    localStorage.setItem("staff", JSON.stringify(data));

}


function editStaff(email, newData) {

    let data = localStorage.getItem('staff');


    let staffIndex = data.staff.findIndex(data => data.email === email);
    if (staff === -1) {
        console.log("no staff with this email");
        return;
    }


    data.staff[staffIndex] = {
        ...data.staff[staffIndex],
        ...newData
    };



    localStorage.setItem("staff", data);

    console.log("Staff member updated successfully.");


}

function deleteStaff(email) {
    let data = localStorage.getItem('staff');


    let staffIndex = data.staff.findIndex(data => data.email === email);


    if (staffIndex === -1) {
        console.log("no staff with this email");
        return;
    }

    data.staff.splice(staffIndex, 1);

    localStorage.setItem("staff", JSON.stringify(data));


    console.log("staff deleted!");






}



function isAdmin(email) {
    let data = localStorage.getItem('staff');

    let staffIndex = data.staff.findIndex(data => data.email == email);

    data.staff[staffIndex].isAdmin = !data.staff[staffIndex].isAdmin;

    localStorage.setItem('staff', JSON.stringify(data));



}


export {
    addStaff,
    editStaff,
    deleteStaff,
    isAdmin
}

