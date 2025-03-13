



function addStaff(email, name,password,gender) {

    let data = JSON.parse(localStorage.getItem('staff'));

    let staff = data.find(data => data.email === email);

    if (staff) {
        console.log("this staff is already added");
        return;

    }

    let newStaff =
    {
        email: email,
        name:name,
        password: password,
        isAdmin: false,
        gender:gender
    }

    data.push(newStaff);

    localStorage.setItem("staff", JSON.stringify(data));

}


function editStaff(email, newData) {
    let data = JSON.parse(localStorage.getItem('staff')) || [];
    
    let staffIndex = data.findIndex(staff => staff.email === email);
    
    if (staffIndex === -1) {
        console.log("No staff found with this email");
        return false;
    }
    
    data[staffIndex] = {
        ...data[staffIndex],
        ...newData
    };
    
    console.log("Updated staff data:", data);
    
    localStorage.setItem("staff", JSON.stringify(data));
    
    return true;
}

function deleteStaff(email) {
    let data = JSON.parse(localStorage.getItem('staff'));



    let staffIndex = data.findIndex(data => data.email === email);


    if (staffIndex === -1) {
        console.log("no staff with this email");
        return;
    }

    data.splice(staffIndex, 1);

    localStorage.setItem("staff", JSON.stringify(data));


    console.log("staff deleted!");






}

function getStaff() {
    return JSON.parse(localStorage.getItem('staff'));
    
}


function isAdmin(email) {
    let data = JSON.parse(localStorage.getItem('staff'));

    let staffIndex = data.findIndex(data => data.email == email);

    data[staffIndex].isAdmin = !data[staffIndex].isAdmin;

    localStorage.setItem('staff', JSON.stringify(data));




}



function signInStaff(email, password) {
    const data = JSON.parse(localStorage.getItem('staff'));
    const staff = data.find(data => data.email === email && data.password === password);
    
    if (staff) {
        
        return true;
    }

    return false;
}


export {
    addStaff,
    editStaff,
    deleteStaff,
    isAdmin,
    signInStaff,
    getStaff
}

