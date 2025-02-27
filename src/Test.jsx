import React from "react";

const Test = () => {
  const [etat, set_etat] = React.useState(0);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex justify-center gap-2 items-center text-3xl font-extrabold">
        <button className="btn btn-circle btn-info text-3xl font-extrabold">
          -
        </button>
        {etat}
        <button className="btn btn-circle btn-info text-3xl font-extrabold">
          +
        </button>
      </div>
    </div>
  );
};

export default Test;
