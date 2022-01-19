
import { makeAutoObservable, observable,action } from "mobx";
import axios from `axios`


class RoomStore{
    rooms=[];
    constructor(){
        makeObservable(this,{
rooms:obserable,
fetchRooms:action,
createRoom:action,
deleteRoom:action,
createMsg:action,
        })
        fetchRooms = async () => {
            try {
              const response = await axios.get(
                "https://coded-task-axios-be.herokuapp.com/rooms"
              );
              this.rooms=response.data;
            } catch (error) {
              console.log(error);
            }
          };
    }


  
}
 createRoom = async (newRoom) => {
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
    //   setRooms([...rooms, response.data]);
    this.rooms.push(response.data) //same as the previos
    } catch (error) {
      console.log(error);
    }
  };
const deleteRoom = async (id) => {
    try {
       await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );
      let tempRooms = rooms.filter((room) => room.id !== id);
    //   setRooms(tempRooms); 
    this.rooms=tempRooms //same as the previous
    } catch (error) {
      console.log(error);
    }
  };
  const updateRoom = async (updatedRoom) => {
    try {
      const response = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${updatedRoom.id}`,
        updatedRoom
      );
      let tempRooms = rooms.map((room) =>
        room.id === updatedRoom.id ? response.data : room
      );
    //   setRooms(tempRooms);
    this.rooms=tempRooms
    } catch (error) {
      console.log(error);
    }
  };
   createMsg = async (roomId, msg) => {
    try {
      const response = await axios.post(
        `https://coded-task-axios-be.herokuapp.com/rooms/msg/${roomId}`,
        msg
      );
      let tempRooms = rooms.map((room) =>
        room.id === roomId
          ? { ...room, messages: [...room.messages, response.data] }
          : room
      );
      console.log(tempRooms);
    //   setRooms(tempRooms);
    this.rooms=tempRooms
    } catch (error) {
      console.log(error);
    }
  };

const roomStore=new RoomStore();
roomStore.fetchRooms();
export default roomStore;