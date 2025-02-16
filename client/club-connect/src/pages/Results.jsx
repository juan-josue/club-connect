import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

function ClubCard({ name, link, description, tags, gradient, onBack }) {
  console.log(link)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4">
        <button className="btn" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h2 className="text-3xl ">Back to matches</h2>
      </div>
      <div className="flex flex-col w-[450px] h-[650px] gap-4 bg-base-200 p-8 rounded-2xl shadow-xl">
        <div
          className={`flex h-[300px] bg-gradient-to-r ${gradient} justify-center items-center rounded p-8`}
        >
          <h2 className="text-base-100 text-3xl font-bold">{name}</h2>
        </div>

        <div className="flex gap-4 justify-start">
          {tags.map((tag, index) => {
            return (
              <div key={index} className="badge badge-secondary">
                {tag}
              </div>
            );
          })}
        </div>

        <p>
          {description.length > 250
            ? `${description.slice(0, 250)}...`
            : description}
        </p>

        <a className="link" href={link} target="_blank">
          Club Page
        </a>

        <button className="btn btn-primary w-full">Apply?</button>
      </div>
    </div>
  );
}

function Results() {
  const [selectedClub, setSelectedClub] = useState(null);

  const location = useLocation();
  const { results } = location.state || { results: [] };

  console.log('matches', results)

  const onSelect = (club) => {
    setSelectedClub(club);
  };

  const onBack = () => {
    setSelectedClub(null);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {selectedClub ? (
        <ClubCard
          name={selectedClub["name"]}
          link={selectedClub["url"]}
          description={selectedClub["description"]}
          tags={selectedClub["tags"]}
          gradient={selectedClub["gradient"]}
          onBack={onBack}
        />
      ) : (
        <div className="flex flex-col gap-16 w-[416px] overflow-y-scroll">
          {/* text */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl">{`It's a match 🩵!`}</h2>
            <p className="text-lg">
              {`These clubs are waiting for you! Take the next step and make it official.`}
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
                <h2 className="text-base-100 text-xl font-bold">
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
