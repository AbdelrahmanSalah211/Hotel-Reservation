// const userSession={
//   guest_id : "G00A",
//   first_name : "abdelrahman",
//   last_name : "salah",
//   email : "abdelrahman@gmail.com"
// }
// localStorage.setItem("user-session", JSON.stringify(userSession));

const reservations = [
  {
    "reservation_id": "1",
    "branch_id": "HB201",
    "guest_id": "G001",
    "room_type": "Single",
    "number_of_rooms": 4,
    "resident_name": "Alice Johnson",
    "phone_number": "+012-343-456-7",
    "check_in": "2025-03-01",
    "check_out": "2025-03-05",
    "meals": { "breakfast": true, "lunch": false, "dinner": true }
  },
  {
    "reservation_id": "2",
    "branch_id": "HB201",
    "guest_id": "G002",
    "room_type": "Double",
    "number_of_rooms": 2,
    "resident_name": "Michael Smith",
    "phone_number": "+012-343-456-8",
    "check_in": "2025-03-10",
    "check_out": "2025-03-15",
    "meals": {"breakfast": true, "lunch": true, "dinner": true}
  },
  {
    "reservation_id": "3",
    "branch_id": "HB202",
    "guest_id": "G003",
    "room_type": "Triple",
    "number_of_rooms": 3,
    "resident_name": "Sophia Brown",
    "phone_number": "+012-343-456-9",
    "check_in": "2025-04-05",
    "check_out": "2025-04-08",
    "meals": {"breakfast": false, "lunch": true, "dinner": false}
  },
  {
    "reservation_id": "4",
    "branch_id": "HB202",
    "guest_id": "G004",
    "room_type": "Queen",
    "number_of_rooms": 1,
    "resident_name": "Daniel Wilson",
    "phone_number": "+012-343-456-10",
    "check_in": "2025-04-12",
    "check_out": "2025-04-18",
    "meals": {"breakfast": true, "lunch": false, "dinner": true}
  }
]

localStorage.setItem("reservations", JSON.stringify(reservations));

function reservation(resBranchId, resRoomType, resNumberOfRooms, resMeals, resCheckInDate, resCheckOutDate, guestInfo) {
  const toast = document.createElement("custom-toast");
  toast.type = "success";
  toast.message = "Reservation successful!";
  document.body.appendChild(toast);
  const reservationData = JSON.parse(localStorage.getItem("reservations")) || [];
  const userSession = JSON.parse(localStorage.getItem("user-session"));
  const storedBranches = JSON.parse(localStorage.getItem("branches"));
  // const branch = storedBranches.find(
  //   (branch) => branch.branch_id === resBranchId
  // );
  // const room = branch.rooms.find((room) => room.type === resRoomType);
  storedBranches.forEach((branch) => {
    if (branch.branch_id === resBranchId) {
      branch.rooms.forEach((room) => {
        if (room.type === resRoomType) {
          room.count -= resNumberOfRooms;
        }
      });
    }
  });
  console.log(reservationData);
  if(reservationData.length === 0){
    var newId = 0;
  } else {
    var newId = `${ parseInt(reservationData[reservationData.length - 1].reservation_id) + 1 }`;
  }
  // const newId = `${
  //   parseInt(reservationData[reservationData.length - 1].reservation_id) + 1
  // }`;
  const newReservation = {
    reservation_id: newId,
    branch_id: resBranchId,
    guest_id: userSession.guest_id,
    room_type: resRoomType,
    number_of_rooms: resNumberOfRooms,
    guest_name: guestInfo.resName,
    phone_number: guestInfo.resPhoneNumber,
    check_in: resCheckInDate,
    check_out: resCheckOutDate,
    meals: resMeals,
  };
  console.log(newReservation);
  reservationData.push(newReservation);
  localStorage.setItem("branches", JSON.stringify(storedBranches));
  localStorage.setItem("reservations", JSON.stringify(reservationData));
  toast.fire();
}

export { reservation };