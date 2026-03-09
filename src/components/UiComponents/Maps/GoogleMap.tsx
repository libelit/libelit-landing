"use client";

function Map({ location }: { location?: any }) {
  // lat: 27.6889684053813,long: 85.3279700415166

  return location ? (
    !location.projectLocationLatitude || !location.projectLocationLongitude ? (
      <div className="flex-center h-100 color-primary-700">
        Project location not found.
      </div>
    ) : (
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen={true}
        style={{ border: "none" }}
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyABofnOZpc89saFtIwt4zjLOR3vVD0vzI0
    &q=${location.projectLocationLatitude},${location.projectLocationLongitude}&center=${location.projectLocationLatitude},${location.projectLocationLongitude}&zoom=16`}
      ></iframe>
    )
  ) : (
    <div className="flex-center h-100">
      <div className="loading"></div>
    </div>
  );
}

export default Map;
