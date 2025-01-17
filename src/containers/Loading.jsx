import React, { memo, useState } from "react";

const Loading = memo(() => {
  const [isSuccess, setIsSuccess] = useState(false);
  return (
    <div className="loading-screen">
      {isSuccess ? (
        <>
          <div className="checkmark">&#10003;</div> {/* Checkmark */}
          <p className="loading-text">Success!</p>
        </>
      ) : (
        <>
          <div className="loader"></div>
          <br />
          <p className="loading-text">Loading...</p>
        </>
      )}
    </div>
  );
});

export default Loading;
