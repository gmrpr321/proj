const mongoose = require("mongoose");

const TeamPlayerModel = new mongoose.Schema({
  playerName: String,
  playerPrice: Number,
});
const teamSchema = new mongoose.Schema({
  teamName: String,
  managerName: String,
  managerPassword: String,
  budget: Number,
  area: String,
  Players: [TeamPlayerModel],
});

const TeamModel = mongoose.model("TeamModel", teamSchema);

module.exports = TeamModel;
