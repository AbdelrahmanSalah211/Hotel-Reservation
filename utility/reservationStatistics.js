function reservationStatistics() {
  const branches = JSON.parse(localStorage.getItem("branches"));
  const roomTypes = JSON.parse(localStorage.getItem("room_types"));
  const data = {};
  branches.forEach(branch => {
    branch.rooms.forEach(room => {
      if (data[room.type]) {
        data[room.type].total_count += room.total_count;
        data[room.type].reserved += room.total_count - room.count;
        data[room.type].remaining += room.count;
      } else {
        data[room.type] = {
          total_count: room.total_count,
          reserved: room.total_count - room.count,
          remaining: room.count,
        }
      }
    })
  });
  roomTypes.forEach(room => {
    if(data[room.type]){
      data[room.type]. meals = room.meals;
    }
  });
  // console.log(data);
  return data;
}

export { reservationStatistics };