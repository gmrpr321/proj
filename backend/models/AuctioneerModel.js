const mongoose = require("mongoose");

const AuctioneerSchema = new mongoose.Schema({
  username: String,
  password: String,
  currentPlayerDetails: {
    playerName: String,
    playerAmount: String,
  },
});

const AuctioneerModel = mongoose.model("AuctioneerModel", AuctioneerSchema);

module.exports = AuctioneerModel;
