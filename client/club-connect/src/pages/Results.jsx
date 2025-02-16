import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Results() {
  const [selectedClub, setSelectedClub] = useState(null);

  const location = useLocation();
  const { results } = location.state || { results: [] };

  const onSelect = (club) => {
    setSelectedClub(club.name);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {selectedClub ? (
        "yuh"
      ) : (
        <div className="flex flex-col gap-16 w-[416px] overflow-y-scroll">
          {/* text */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl">These are your club matches!</h2>
            <p className="text-lg">
              From here you can quickly apply to the clubs.
            </p>
          </div>

          {/* match grid */}
          <div className="grid grid-cols-2 gap-4">
            {results.map((club, index) => (
              <div
                key={index}
                onClick={() => onSelect(club)}
                className={`flex h-[200px] w-[200px] bg-gradient-to-r ${club.gradient} justify-center items-center rounded-3xl p-8`}
              >
                <h2 className="text-base-100 text-2xl font-bold">
                  {club.name}
                </h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
