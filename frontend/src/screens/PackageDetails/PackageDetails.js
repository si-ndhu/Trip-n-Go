import "./PackageDetails.css";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import APIs from "Constants";

function PackageDetails() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tripId = searchParams.get("trip");
  const [trip, setTrip] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get(`${APIs.PACKAGE_DETAILS}/${tripId}`).then((res) => {
      setTrip(res.data);
      setLoading(false);
    });
  }, [tripId]);

  return (
    <>
      <div className="package-details-container">
        <div className="package-container">

          <div className="package-image-container">
            <img
              src={trip.image} // Use the dynamic URL from trip.image
              alt="Static Map"
              className="package-image"
            />

            <div className="image-overlay">
            </div>
          </div>

          <div className="package-overlay">
            <span className="package-title">{trip.title}</span>
          </div>
        </div>

        <div className="description">{trip.description}</div>

        <div className="map-image-container">
          <img
            src={`https://res.cloudinary.com/datzhsgw6/image/upload/v1691425736/mapimage_q2rdpv.png`}
            alt="Static Map"
            className="static-map-image"
          />
        </div>

        <div className="location">Location: {trip.location}</div>
        <div className="cost">Cost: ${trip.cost}</div>
        <div className="rating">Rating: {trip.rating}</div>

        <div className="button-container">
          <button
            className="button button-primary button-200 button-sm-100p btn-book-now"
            onClick={() => navigate("/payment")}
          >
            Book now
          </button>
        </div>
      </div>
    </>
  );
}

export default PackageDetails;
