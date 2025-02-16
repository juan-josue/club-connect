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
      navigate("/matching", { state: { preferences: tags } });
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
      header: "Who's your campus crush? 💘",
      body: "Swipe right on St. George, Scarborough, or Mississauga—or all three!",
      tags: ["UTM", "St George", "UTSC"],
    },
    {
      stepName: "Interests",
      header: "What are you into? 🎯",
      body: "Pick some keywords that resonate with you. The more you choose, the better your matches!",
      tags: [
        "AI",
        "Architecture",
        "Consulting",
        "Cultural",
        "Dance",
        "Debate",
        "Drama",
        "Entrepreneurship",
        "Finance",
        "Fitness",
        "Gaming",
        "Media",
        "Music",
        "Networking",
        "Psychology",
        "Religious",
        "Science",
        "Social Impact",
        "Student Government",
        "Technology",
      ],
    },
    {
      stepName: "Time",
      header: "Busy bee or free as a bird? 🐝",
      body: "Let us know how much time you want to spend. From once-a-week chill to full dedication, it's all good.",
      tags: ["Low Commitment", "Medium Commitment", "High Commitment"],
    },
    {
      stepName: "Style",
      header: "What’s your club energy? 🔥",
      body: "Competitive edge, social butterfly, or professional networker—find your perfect club fit.",
      tags: [
        "Casual",
        "Competitive",
        "Professional",
        "Social",
        "Academic",
        "Community-Oriented",
      ],
    },
  ];

  console.log(tags);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-[600px] gap-16">
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
