import React from "react";
import NoPath from "../../assets/images/notfound.svg";

const NotFound = () => {
  return (
    <div className="text-center my-5 min-vh-100">
      <img src={NoPath} />
    </div>
  );
};

export default NotFound;
