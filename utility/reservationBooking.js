function reservation(resBranchId, resRoomType, resNumberOfRooms, resMeals, resCheckInDate, resCheckOutDate, guestInfo){
  const reservationData = JSON.parse(localStorage.getItem("reservations"));
  const lastId = reservationData[reservationData.length - 1].id;
  const newReservation = {
    reservation_id: lastId + 1,
    branch_id: resBranchId,
    guest_id: 3,
    room_type: resRoomType,
    number_of_rooms: resNumberOfRooms,
    guest_name: guestInfo.resName,
    phone_number: guestInfo.resPhoneNumber,
    check_in: resCheckInDate,
    check_out: resCheckOutDate,
    meals: resMeals,
  };

  reservationData.push(newReservation);
  localStorage.setItem("reservations", JSON.stringify(reservationData));
}

export { reservation };