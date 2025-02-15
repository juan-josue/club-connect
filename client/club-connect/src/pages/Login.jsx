import React, { useState } from "react";
import videoBg from "../assets/bg-video.mp4";
import { useNavigate } from "react-router-dom";

function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [utorid, setUtorid] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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
            <h1 className="text-4xl font-bold mb-4">
              Discover your next community!
            </h1>
            <p className="text-lg">
              Use club connect to match with the perfect club for you.
            </p>
          </div>
        </div>

        {/* log in form */}
        <div className="flex flex-col justify-center gap-16 p-16 w-1/2">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl">Log into club connect</h1>
            <p>
              Don't have an account? <a className="link">Sign up</a>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="input w-1/2"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input w-1/2"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <input
              type="text"
              placeholder="utorid"
              className="input w-full"
              required
              onChange={(e) => setUtorid(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="input w-full"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="btn btn-primary"
              onClick={() => navigate("/preferences")}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
