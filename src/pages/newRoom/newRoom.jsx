import "./room.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { roomInputs } from "../../formSource";
import { useFetch } from "../../hooks/useFetch";
import { axiosInstance } from "../../config";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const { data, loading, refetchData } = useFetch();

  useEffect(() => {
    refetchData("/hotel");
  },[])

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => room);

    try {
      const roomDetail = await axiosInstance.post("/room/createRoom", {
        ...info,
        hotelId,
      });

      if (roomDetail.data?.id){
        await axiosInstance.post("/room/createRoomNumber", {
          roomId: roomDetail.data?.id,
          roomNumbers
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="id"
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    setHotelId(selectedId);
                  }}                  
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a hotel
                  </option>
                  {loading ? (
                    <option disabled>Loading...</option>
                  ) : (
                    data?.map((hotel) => (
                      <option key={hotel.id} value={hotel.id}>
                        {hotel.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
