const mongoose = require("mongoose");

const CurrentPlayerLogs = new mongoose.Schema({
  teamName: String,
  bidAmmount: Number,
});
const playerSchema = new mongoose.Schema({
  player_name: String,
  price: Number,
  current_team: String,
  playerStatus: String,
  current_logs: [CurrentPlayerLogs],
});

const PlayerModel = mongoose.model("PlayerModel", playerSchema);

module.exports = PlayerModel;
