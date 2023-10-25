import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../services/helper";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get(`${BASE_URL}/user-places`).then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <h2 className="font-semibold text-3xl"> List of all added places</h2>
        <br />
        <Link
          className="inline-flex gap-1 bg-primary py-2 px-4 rounded-full text-white"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new places
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              className="flex bg-gray-100 p-6 rounded-2xl gap-4 m-4"
            >
              <div className="w-32 h-32 bg-gray-300 grow shrink-0 rounded-2xl">
                {place.photos.length > 0 && (
                  <>
                    <img
                      className="object-cover aspect-square rounded-2xl"
                      src={`${BASE_URL}/uploads/` + place.photos[0]}
                      alt=""
                    />
                  </>
                )}
              </div>
              <div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="mt-2 text-sm">{place.description}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
