import React, { memo, useState } from "react";

const Loading = memo(() => {
  const [isSuccess, setIsSuccess] = useState(false);
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,_0,_0,_0.25)] flex justify-center items-center z-50 flex-col">
      {isSuccess ? (
        <>
          <div className="text-green-500 text-6xl mb-2">&#10003;</div>{" "}
          {/* Checkmark */}
          <p className="text-white text-xl">Success!</p>
        </>
      ) : (
        <>
          <div className="border-8 border-white border-t-8 border-t-white rounded-full w-16 h-16 animate-spin"></div>
          <p className="text-white text-lg mt-2">Loading...</p>
        </>
      )}
    </div>
  );
});

export default Loading;
