const TeamModel = require("./models/TeamModel");
const AuctioneerModel = require("./models/AuctioneerModel");
const PlayerModel = require("./models/PlayerModel");

const DatabaseUtil = {
  TeamUtil: (function () {
    const _saveTeam = async (data) => {
      const doc = new TeamModel(data);
      await doc.save();
    };
    const _viewTeam = async (managerName) => {
      const doc = TeamModel.findOne({ managerName: managerName });
      return doc;
    };
    const _reduceTeamBudget = async (managerName, price) => {
      const doc = await TeamModel.findOne({ managerName: managerName });
      doc.budget -= price;
      await doc.save();
    };
    const _add_player_logs = async (player_name, teamName, price) => {
      const doc = await PlayerModel.findOne({ player_name: player_name });
      console.log(doc);
      doc.current_logs.push({ teamName: teamName, bidAmount: price });
      await doc.save();
    };

    return {
      saveTeam: _saveTeam,
      viewTeam: _viewTeam,
      reduceTeamBudget: _reduceTeamBudget,
      add_player_logs: _add_player_logs,
    };
  })(),
  auctioneerUtil: (function () {
    const _saveAuctioneer = async (data) => {
      const doc = new AuctioneerModel(data);
      await doc.save();
    };
    const _getAuctioneer = async (username, password) => {
      const doc = AuctioneerModel.findOne({
        username: username,
        password: password,
      });
      return doc;
    };
    const _getAllPlayers = async () => {
      const doc = await PlayerModel.find({});
      return doc;
    };
    return {
      saveAuctioneer: _saveAuctioneer,
      getAuctioneer: _getAuctioneer,
      getAllPlayers: _getAllPlayers,
    };
  })(),
};
module.exports = DatabaseUtil;
