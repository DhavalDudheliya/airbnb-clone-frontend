import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddresLink";
import PhotoGallary from "../PhotoGallary";
import BookingDates from "../BookingDates";
import { BASE_URL } from "../services/helper";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`${BASE_URL}/bookings`).then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="mt-16">
      <h1 className="text-3xl">{booking.place.address}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-xl mb-4">You booking information</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">{booking.price}</div>
        </div>
      </div>
      <div className="mt-4 bg-gray-100 -mx-8 px-44 pt-8">
        <PhotoGallary place={booking.place} />
      </div>
    </div>
  );
}
