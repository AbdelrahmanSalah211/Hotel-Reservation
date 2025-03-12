function reservation(resBranchId, resRoomType, resNumberOfRooms, resMeals, resCheckInDate, resCheckOutDate, guestInfo) {
  const toast = document.createElement("custom-toast");
  toast.type = "success";
  toast.message = "Reservation successful!";
  document.body.appendChild(toast);
  const reservationData = JSON.parse(localStorage.getItem("reservations")) || [];
  const userSession = JSON.parse(localStorage.getItem("user-session"));
  const storedBranches = JSON.parse(localStorage.getItem("branches"));
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
  dispatchEvent(new CustomEvent("successfulsubmit", { detail: { record: newReservation } }));
}

export { reservation };