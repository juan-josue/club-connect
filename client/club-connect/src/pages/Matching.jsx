import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faX } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const gradients = [
  "from-blue-300 to-pink-200",
  "from-green-300 to-yellow-200",
  "from-purple-300 to-indigo-200",
  "from-red-300 to-orange-200",
  "from-teal-300 to-cyan-200"
];

function getRandomGradient() {
  return gradients[Math.floor(Math.random() * gradients.length)];
}

function ClubCard({ name, link, description, tags, onLike, onDislike, gradient }) {
  return (
    <div className="flex flex-col w-[450px] h-[650px] gap-4 bg-base-200 p-8 rounded-2xl shadow-xl">
      <div className={`flex h-[300px] bg-gradient-to-r ${gradient} justify-center items-center rounded p-8`}>
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

      <div className="flex w-full justify-center gap-16">
        <button onClick={onDislike} className="btn btn-circle bg-base-100 p-8">
          <FontAwesomeIcon icon={faX} className="text-primary" />
        </button>
        <button onClick={onLike} className="btn btn-circle bg-primary p-8">
          <FontAwesomeIcon icon={faHeart} className="text-white" />
        </button>
      </div>
    </div>
  );
}

function Matching() {
  const [clubIndex, setClubIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [animationDirection, setAnimationDirection] = useState(0);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const location = useLocation();
  const { preferences } = location.state || { preferences: [] };

  const handleAnimationEnd = (callback) => {
    setTimeout(() => {
      callback();
    }, 310);
  };

  const onLike = () => {
    setAnimationDirection(-1);
    handleAnimationEnd(() => {
      const newMatches = [...matches, clubs[clubIndex]];
      if (clubIndex === clubs.length - 1) {
        navigate("/results", { state: { results: newMatches } });
      } else {
        setMatches(newMatches);
        setClubIndex((prev) => prev + 1);
      }
    });
  };

  const onDislike = () => {
    setAnimationDirection(1);
    handleAnimationEnd(() => {
      if (clubIndex === clubs.length - 1) {
        navigate("/results", { state: { results: matches } });
      } else {
        setClubIndex((prev) => Math.min(prev + 1, clubs.length - 1));
      }
    });
  };

  console.log(matches);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/clubs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            preferences: Object.values(preferences).flat(),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch clubs");
        }

        const data = await response.json();

        const clubsWithGradients = data.map((club) => ({
          ...club,
          gradient: getRandomGradient()
        }));

        setClubs(clubsWithGradients);

        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };

    fetchClubs();
  }, [preferences]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <span className="loading loading-ring text-primary w-[200px]"></span>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={clubIndex}
            initial={{
              x: animationDirection === 0 ? 0 : animationDirection * 200,
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: animationDirection * -200, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {clubs && (
              <ClubCard
                name={clubs[clubIndex]["name"]}
                link={clubs[clubIndex]["link"]}
                description={clubs[clubIndex]["description"]}
                tags={clubs[clubIndex]["tags"]}
                onLike={onLike}
                onDislike={onDislike}
                gradient={clubs[clubIndex]["gradient"]}
              />
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default Matching;
