import React from "react";
import { shopImg, mobile, mapIcon } from "./images";
import { Divider } from "@mui/material";
const Location = (props) => {
  const { locationArea } = props;
  const { partnername, phone, location: area } = locationArea;
  const { location, lat, lng } = area;
  return (
    <div className="location-wrapper">
      <div className="image-section">
        <div className="shop-image">
          <img src={shopImg} height="auto" width="100%" alt="shop" />
        </div>
        <div className="shop-name">{partnername}</div>
      </div>
      <div className="detail-section">
        <div className="details">
          <div className="iconImg">
            <img src={mobile} alt="mobileIcon" height="45px" width="45px" />
          </div>
          <div className="value">{phone}</div>
        </div>
        <Divider sx={{ color: "#EBEBEB" }} />
        <div className="details">
          <div className="mapIconImg">
            <img src={mapIcon} alt="locationIcon" height="45px" width="45px" />
          </div>
          <div className="value">{location}</div>
        </div>
        <Divider sx={{ color: "#EBEBEB" }} />

        <div className="shop-map">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?q=${lat},${lng}&key=AIzaSyBXCXy5xr8nUjWEJsY7zcV98JVEdhOi4NM
            `}
            height="150"
            title="shop-area"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Location;
