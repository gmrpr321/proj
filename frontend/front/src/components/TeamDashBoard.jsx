import React, { useState, useEffect } from "react";
import styles from "./TeamLogin.module.css";
const BASE_URL = "http://localhost:3051";

const TeamDashboard = (props) => {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);
  const bidPlayer = async () => {
    try {
      const dataToServer = { managerName: "mdu1", bidAmount: bidAmount };
      const response = await fetch(BASE_URL + "/bid_player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.JWTToken}`,
        },
        body: JSON.stringify(dataToServer),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch player");
      }
      const playerData = await response.json();
      console.log(playerData);
    } catch (error) {
      console.error("Error fetching player:", error);
    }
  };
  useEffect(() => {
    const interval = setInterval(fetchCurrentPlayer, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchCurrentPlayer = async () => {
    try {
      const response = await fetch(BASE_URL + "/view_current_player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.JWTToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch current player");
      }

      const playerData = await response.json();
      setCurrentPlayer(playerData);
    } catch (error) {
      console.error("Error fetching current player:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Manager Dashboard</h2>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        className={styles.input}
      />
      <button onClick={bidPlayer}>Click to bid Player</button>
      {currentPlayer && (
        <div className={styles.playerCard}>
          <h3>{currentPlayer.player_name}</h3>
          <p>Price: {currentPlayer.price}</p>
          <p>Current Team: {currentPlayer.current_team}</p>
          <p>Status: {currentPlayer.playerStatus}</p>
          <ul>
            {currentPlayer.current_logs &&
              currentPlayer.current_logs.map((log, index) => (
                <li key={index}>
                  <p>Team Name: {log.teamName}</p>
                  <p>Bid Amount: {log.bidAmmount}</p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamDashboard;
