import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Step({
  step,
  onContinue,
  onBack,
  onAddTag,
  isSelected,
  pageDetails: { stepName, header, body, tags },
}) {
  return (
    <>
      {/* back navigation */}
      <div className="flex gap-4">
        {step !== 0 && (
          <button className="btn" onClick={onBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
        <h2 className="text-3xl ">{stepName}</h2>
      </div>

      {/* text */}
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl">{header}</h2>
        <p className="text-lg">{body}</p>
      </div>

      {/* tags */}
      <div className="flex flex-wrap gap-4">
        {tags.map((tag, index) => {
          return (
            <button
              key={index}
              onClick={() => onAddTag(stepName.toLowerCase(), tag)}
              className={`btn btn-secondary text-lg ${
                isSelected(stepName.toLowerCase(), tag)
                  ? "btn-active"
                  : "btn-dash"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* continue and progress */}
      <div className="flex flex-col w-full gap-4">
        <button className="btn btn-primary" onClick={onContinue}>
          Continue
        </button>

        <ul className="steps">
          <li className={`step step-primary`}>Campus</li>
          <li className={`step ${step >= 1 && "step-primary"}`}>Interests</li>
          <li className={`step ${step >= 2 && "step-primary"}`}>Time</li>
          <li className={`step ${step >= 3 && "step-primary"}`}>Style</li>
        </ul>
      </div>
    </>
  );
}

function Preferences() {
  const [tags, setTags] = useState({
    campus: [],
    interests: [],
    time: [],
    style: [],
  });
  const [stepCount, setStepCount] = useState(0);
  const navigate = useNavigate();

  const onContinue = () => {
    if (stepCount === 3) {
      navigate("/matching");
    } else {
      setStepCount(Math.min(stepCount + 1, 3));
    }
  };

  const onBack = () => {
    setStepCount(Math.max(stepCount - 1, 0));
  };

  const onAddTag = (category, tag) => {
    setTags((prevTags) => {
      const isTagSelected = prevTags[category].includes(tag);

      return {
        ...prevTags,
        [category]: isTagSelected
          ? prevTags[category].filter((t) => t !== tag)
          : [...prevTags[category], tag],
      };
    });
  };

  const isSelected = (category, tag) => tags[category].includes(tag);

  const pageDetails = [
    {
      stepName: "Campus",
      header: "Which campuses?",
      body: "Select which of the three Unviersity of Toronto campuses you'd like be matched with.",
      tags: ["Mississauga", "St. George", "Scarborough"],
    },
    {
      stepName: "Interests",
      header: "What sort of things are you into?",
      body: "Select some of the following key words that best resonatte with you.",
      tags: ["Sports", "Tech", "Arts", "Writing", "Science", "Dramteurgy"],
    },
    {
      stepName: "Time",
      header: "What's your availability look like?",
      body: "Select what level of time commitment are you looking for.",
      tags: ["Low commitment", "Mid commitment", "High commitment"],
    },
    {
      stepName: "Style",
      header: "What engagement matches your vibe?",
      body: "Select which club engagement style best suits you.",
      tags: [
        "Competitive",
        "Casual",
        "Creative",
        "Social",
        "Hands-on",
        "Collaborative",
      ],
    },
  ];

  console.log(tags);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-[450px] gap-16">
        <Step
          step={stepCount}
          onContinue={onContinue}
          onBack={onBack}
          onAddTag={onAddTag}
          isSelected={isSelected}
          pageDetails={pageDetails[stepCount]}
        />
      </div>
    </div>
  );
}

export default Preferences;
