import { BASE_URL } from "./services/helper";

export default function PlaceImg({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover aspect-square rounded-2xl";
  }
  return (
    <img
      className={className}
      src={`${BASE_URL}/uploads/` + place.photos[index]}
      alt=""
    />
  );
}
