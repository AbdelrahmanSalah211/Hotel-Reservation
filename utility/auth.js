function getUsers(){
    try {
        const data = localStorage.getItem("guests");

    if(data){
        return data ? JSON.parse(data) : {guests: []};
    }
    } catch (error) {
        console.error(error);
        return {guests: []};   
    }
}


function saveUsers(data) {
    try {
        localStorage.setItem("guests",JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving users data:', error);
        return false;
    }
}

function existEmail(userData) {
    const data = getUsers();
   return  data.guests.some(user => user.email === userData.email);
}


function generateGuestId() {
    const data = getUsers();
    if (data.guests.length === 0) {
      return 'G001';
    }
    
    // Find the highest guest ID number and increment it
    const highestId = data.guests
      .map(guest => parseInt(guest.guest_id.substring(1)))
      .reduce((max, current) => Math.max(max, current), 0);
    
    // Format the new ID with leading zeros
    return `G${(highestId + 1).toString().padStart(3, '0')}`;
  }



 function registerFirstStep(formData) {
    const email = formData.get("email");
    if(existEmail({email})){
        return false;
    }

    const firstStepData = {
        fname: formData.get("fname"),
        lname: formData.get("lname"),
        email
    }

    localStorage.setItem("register-info", JSON.stringify(firstStepData));
    return true;    
}



  function registerSecondStep(formData) {
    const userData = JSON.parse(localStorage.getItem("register-info"));

    const newUser = {
        guest_id: generateGuestId(),
        first_name: userData.fname,
        last_name: userData.lname,
        email: userData.email,
        password: formData.get("password")
    }


    const data = getUsers();
    data.guests.push(newUser);
    

    if (saveUsers(data)) {
        localStorage.removeItem("register-info");
        return true;
        
    }

    return false;
    
}
function saveToLocalStorage(formData) {

    const formObj = {}
    for (const [key,value] of formData) {
        formObj[key] = value; 
    }
    localStorage.setItem("register-info", JSON.stringify(formObj));
}



function signin(email,password){
    console.log(email,password);
    
    const data = getUsers();
    console.log(data);
    
   const user = data.guests.find(user=>user.email === email && user.password === password);
   console.log(user);
   
    if(user){
        const userSession={
            guest_id : user.guest_id,
            first_name : user.first_name,
            last_name : user.last_name,
            email : user.email
    }
    localStorage.setItem("user-session", JSON.stringify(userSession));
    return true;
}
return false;
};


function initializeUsersData() {
    const data = getUsers();
    if(!data){
        fetch("../assets/data/guests.json").then(response => response.json()).then(data => {
            console.log(data);
            
            saveUsers(data);}).catch(error => console.error(error));
    }
}




export { 
    registerFirstStep,
    registerSecondStep,
    saveToLocalStorage,
    signin,
    initializeUsersData

}





// function save(data) {
//     const user = {
//         first_name:data.fname,
//         last_name:data.last_name,
//         email:data.email
//     }
// }