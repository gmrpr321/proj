import React, { useState, useEffect } from "react";
import styles from "./AuctioneerDashboard.module.css";
const BASE_URL = "http://localhost:3051";
const AuctioneerDashboard = (props) => {
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const getNextPlayerToStage = async () => {
    try {
      const response = await fetch(BASE_URL + "/get_player_to_stage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.JWTToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch player");
      }

      const playerData = await response.json();
      console.log(playerData);
      setCurrentPlayer(playerData);
    } catch (error) {
      console.error("Error fetching player:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Auctioneer Dashboard</h2>
      <button onClick={getNextPlayerToStage}>Fetch Next Player</button>

      {currentPlayer && (
        <div className={styles.playerCard}>
          <h3>{currentPlayer.player_name}</h3>
          <p>Price: {currentPlayer.price}</p>
          <p>Current Team: {currentPlayer.current_team}</p>
          <p>Status: {currentPlayer.playerStatus}</p>
          <ul>
            {currentPlayer.current_logs.map((log, index) => (
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

export default AuctioneerDashboard;
