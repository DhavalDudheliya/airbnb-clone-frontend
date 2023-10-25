import { useEffect, useState } from "react";
import PhotoUploader from "../PhotosUploader";
import Perks from "../Perks";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../services/helper";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckout] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`${BASE_URL}/places/` + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckout(data.checkOut);
      setMaxGuest(data.maxGuest);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(event) {
    event.preventDefault();
    const placeData = {
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      price,
    };
    if (id) {
      // Update place
      await axios.put(`${BASE_URL}/places"`, {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // Add new Place
      await axios.post(`${BASE_URL}/places`, placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={savePlace}>
          {preInput(
            "Title",
            "Title for you place. Should be short and catchy as in advertisement"
          )}
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="My lovely farm"
          />
          {preInput("Address", "Address to your place")}
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Address"
          ></input>
          {preInput("Photos", "more = better")}
          <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          {preInput("Description", "Description of your place")}
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
          {preInput("Perks", "Select all the perks of your place")}
          <div className="grid gap-2 mt-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <Perks selected={perks} onChange={setPerks} />
          </div>
          {preInput("Extra Info", "House rule, etc.")}
          <textarea
            value={extraInfo}
            onChange={(event) => setExtraInfo(event.target.value)}
          />
          {preInput(
            "Check in&out times, max guests",
            "Add check in and out times, remeber to have some time window for cleaning the room between guests"
          )}
          <div className="grid grid-col-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                type="number"
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
                placeholder="14"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="number"
                value={checkOut}
                onChange={(event) => setCheckout(event.target.value)}
                placeholder="11"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max guests</h3>
              <input
                type="number"
                value={maxGuest}
                onChange={(event) => setMaxGuest(event.target.value)}
                placeholder="1"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price</h3>
              <input
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="100"
              />
            </div>
          </div>
          <div>
            <button className="primary my-4">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
