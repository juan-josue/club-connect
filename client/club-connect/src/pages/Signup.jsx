import React, { useState } from "react";
import videoBg from "../assets/bg-video.mp4";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [utorid, setUtorid] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ utorid, password, firstName, lastName }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/preferences", { state: { user: data.user } });
      } else {
        setErrorMessage(data.error || "Register failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <>
      <div className="flex h-screen">
        {/* video container */}
        <div className="p-4 h-full w-1/2 relative overflow-hidden">
          <video
            src={videoBg}
            autoPlay
            loop
            muted
            playsInline
            className="video-bg object-cover w-full h-full"
          />

          <div className="overlay-content absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-8xl font-bold mb-4 opacity-75 capitalize">
              Discover your next UofT club with CLUB-CONNECT!
            </h1>
          </div>
        </div>

        {/* log in form */}
        <div className="flex flex-col justify-center gap-16 p-16 w-1/2">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">Ready to Meet Your Match? 💌</h1>
            <p>
              Been here before?{" "}
              <a className="link" onClick={() => navigate("/")}>
                Log In
              </a>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="input w-1/2"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input w-1/2"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <input
              type="text"
              placeholder="utorid"
              className="input w-full"
              required
              value={utorid}
              onChange={(e) => setUtorid(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="input w-full"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary" onClick={handleRegister}>
              Sign up
            </button>
          </div>

          <hr className="border-t border-gray-200" />

          <p className="text-center text-lg">
            Think of it as Tinder... but for finding your perfect club match.
            Swipe, connect, and join your new favorite community!
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
