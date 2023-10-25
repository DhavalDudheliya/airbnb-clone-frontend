import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PhotoGallary from "../PhotoGallary";
import AddressLink from "../AddresLink";
import { BASE_URL } from "../services/helper";

export default function () {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`${BASE_URL}/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) {
    return "";
  }

  return (
    <>
      <div>
        <div className="mt-4 bg-gray-100 -mx-8 px-44 pt-8">
          <h1 className="text-3xl">{place.title}</h1>
          <AddressLink>{place.address}</AddressLink>
          <PhotoGallary place={place} />
          <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div>
              <div className="my-4">
                <h2 className="font-semibold text-2xl">Description</h2>
                {place.description}
              </div>
              Check-in: {place.checkIn}
              <br />
              Check-out: {place.checkOut}
              <br />
              Max number of guests: {place.maxGuest}
            </div>
            <div>
              <BookingWidget place={place} />
            </div>
          </div>
          <div className="bg-white -mx-8 px-8 py-8 border-t-4 rounded-xl">
            <div>
              <h2 className="font-semibold text-2xl">Extra Info</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
              {place.extraInfo}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
