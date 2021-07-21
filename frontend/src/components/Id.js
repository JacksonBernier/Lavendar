import React, { useState } from "react";
import axios from "axios";
import { customAlphabet } from "nanoid";

const Id = (props) => {
  const [loginID, setLoginID] = useState("");
  const [showGoodEntry, setShowGoodEntry] = useState("");
  const [showBadEntry, setShowBadEntry] = useState(false);

  const alphabet = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nanoid = customAlphabet(alphabet, 12);

  const loginByID = () => {
    axios
      .post("/api/login", {
        email: `${loginID.toUpperCase()}`,
        password: `secret`,
      })
      .then((res) => {
        setLoginID("");
        localStorage.setItem("jwt_token", res.data.token);
        console.log(localStorage.getItem("jwt_token"));
        props.setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setLoginID("");
        setShowBadEntry(true);
      });
  };

  const generateNewID = () => {
    const id = nanoid();
    axios
      .post("/api/users", {
        email: `${id}`,
        password: `secret`,
      })
      .then(() => {
        navigator.clipboard.writeText(id);
        setLoginID(id);
        setShowGoodEntry(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="header row flex-middle">
        <div className="col col-center">
          <div>
            Existing ID{" "}
            <input
              id="idInput"
              type="text"
              name="LoginID"
              maxLength="12"
              value={loginID}
              onChange={(e) => setLoginID(e.target.value.toUpperCase())}
            />
          </div>
          <br />
          <div className="col col-center">
            <button className="btn" onClick={() => loginByID()}>
              Load
            </button>
          </div>
          {showBadEntry ? <h6 className="entry-text">ID is invalid</h6> : null}
        </div>
      </div>
      <div className="header row flex-middle">
        <div className="col col-center">
          <div className="col col-center">
            <button className="btn" onClick={() => generateNewID()}>
              Generate new ID
            </button>
          </div>
          {showGoodEntry ? (
            <h6 className="entry-text">
              ID copied on your clipboard, don't forget it!
            </h6>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Id;