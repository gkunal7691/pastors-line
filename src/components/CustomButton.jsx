import React from "react";

export default function CustomButton({name, onClick, buttonStyle}) {
  return (
    <button
      type="button"
      className={`d-flex btn  mx-2 ${buttonStyle}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
