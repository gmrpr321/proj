import React, { useState, useEffect } from "react";
import styles from "./CreateTeam.module.css";
const BASE_URL = "http://localhost:3051";

const CreateTeam = (props) => {
  const [teamName, setTeamName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerPassword, setManagerPassword] = useState("");
  const [budget, setBudget] = useState("");
  const [area, setArea] = useState("");
  const [players, setPlayers] = useState([{ playerName: "", playerPrice: "" }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamData = {
      teamName,
      managerName,
      managerPassword,
      budget: parseFloat(budget),
      area,
      Players: [],
    };

    try {
      const response = await fetch(BASE_URL + "/create_team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      if (!response.ok) {
        throw new Error("Failed to create team");
      }

      const data = await response.json();
      console.log("Team created:");
      props.setCurrentPage("home");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Team Name:
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
      </label>
      <label>
        Manager Name:
        <input
          type="text"
          value={managerName}
          onChange={(e) => setManagerName(e.target.value)}
          required
        />
      </label>
      <label>
        Manager Password:
        <input
          type="password"
          value={managerPassword}
          onChange={(e) => setManagerPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Budget:
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
      </label>
      <label>
        Area:
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />
      </label>
      <button type="submit">Create Team</button>
    </form>
  );
};

export default CreateTeam;
