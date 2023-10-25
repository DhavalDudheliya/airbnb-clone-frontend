import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { BASE_URL } from "./services/helper";

export default function ({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookingPlace() {
    const response = await axios.post(`${BASE_URL}/bookings`, {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phoneNo,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl border-t-4 ">
      <div className="text-2xl text-center">
        Price : ₹{place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in: </label>
            <input
              className="border border-gray rounded-md p-2"
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
              type="date"
            />
          </div>
          <div className="border-l py-3 px-4">
            <label>Check out: </label>
            <input
              className="border border-gray rounded-md p-2"
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
              type="date"
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests: </label>
          <input
            type="number"
            value={numberOfGuests}
            placeholder="2"
            onChange={(event) => setNumberOfGuests(event.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <>
            <div className="py-3 px-4 border-t">
              <label>You full name: </label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <label>Phone Number: </label>
              <input
                type="tel"
                value={phoneNo}
                onChange={(event) => setPhoneNo(event.target.value)}
              />
            </div>
          </>
        )}
      </div>
      <button onClick={bookingPlace} className="primary mt-4">
        Book place{" "}
        {numberOfNights > 0 && <span>₹{numberOfNights * place.price} </span>}
      </button>
    </div>
  );
}
