import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faX } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

function ClubCard({ name, link, description, tags, onLike, onDislike }) {
  return (
    <div className="flex flex-col w-[450px] h-[650px] gap-4 bg-base-200 p-8 rounded-2xl shadow-xl">
      <div className="flex h-[300px] bg-gradient-to-r from-blue-300 to-pink-200 justify-center items-center rounded p-8">
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

  const location = useLocation();
  const { preferences } = location.state || { preferences: [] };

  const { name, url, description, tags } = clubs[clubIndex];

  const handleAnimationEnd = (callback) => {
    setTimeout(() => {
      callback();
    }, 310);
  };

  const onLike = () => {
    setAnimationDirection(-1);
    handleAnimationEnd(() => {
      setMatches([...matches, clubs[clubIndex]]);
      setClubIndex((prev) => Math.min(prev + 1, clubs.length - 1));
    });
  };

  const onDislike = () => {
    setAnimationDirection(1);
    handleAnimationEnd(() => {
      setClubIndex((prev) => Math.min(prev + 1, clubs.length - 1));
    });
  };

  console.log(matches);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/clubs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ preferences }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch clubs");
        }

        const data = await response.json();
        setClubs(data);
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
            <ClubCard
              name={name}
              link={url}
              description={description}
              tags={tags}
              onLike={onLike}
              onDislike={onDislike}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default Matching;
