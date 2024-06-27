const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const PlayerModel = require("./models/PlayerModel");
// const bodyParser = require("body-parser");
const DatabaseUtil = require("./databaseUtil");
dotenv.config();
const SECRET_KEY = process.env.JWT_PRIVATE_KEY;
let current_player_index = -1;
const PORT = process.env.PORT | 3051;
const app = express();
app.use(cors());
app.use(express.json());
// app.use(morgan("[:date[web]] :method :url :status :total-time ms"));

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

//createTeam
app.post("/create_team", async (req, res) => {
  const teamData = req.body;
  console.log(teamData);
  await DatabaseUtil.TeamUtil.saveTeam(teamData);
  res.send({ status: "Success" });
});
//manager Login
app.post("/manager_login", async (req, res) => {
  const LoginData = req.body;
  console.log(LoginData);
  const TeamDetails = await DatabaseUtil.TeamUtil.viewTeam(LoginData.username);
  if (TeamDetails && TeamDetails.managerPassword == LoginData.password) {
    const token = jwt.sign(LoginData, SECRET_KEY, { expiresIn: "12h" });
    res.send({ token });
  } else {
    res.status(400).send({ error: "Login Error" });
  }
});
//auctioneer Login
app.post("/auctioneer_login", async (req, res) => {
  const result = await DatabaseUtil.auctioneerUtil.getAllPlayers();
  console.log(result);
  const LoginData = req.body;
  console.log(LoginData);
  const AuctioneerDetails = await DatabaseUtil.auctioneerUtil.getAuctioneer(
    LoginData.username,
    LoginData.password
  );
  if (AuctioneerDetails) {
    const token = jwt.sign(LoginData, SECRET_KEY, { expiresIn: "12h" });
    res.send({ token });
  } else {
    res.status(400).send({ error: "Login Error" });
  }
});
//bid player by manager
app.post("/bid_player", async (req, res) => {
  const managerName = req.body.managerName;
  const BidAmount = req.body.bitAmount;
  console.log(req.body);
  const teamData = await DatabaseUtil.TeamUtil.viewTeam("mdu5");
  if (BidAmount < teamData.budget) {
    res.status(400).send({ error: "No amount Error" });
  } else {
    await DatabaseUtil.TeamUtil.reduceTeamBudget("mdu5", 1000);
    //change player logs
    const getTeam = await DatabaseUtil.TeamUtil.viewTeam("mdu5");
    console.log(getTeam, "teamModified");
    const result = await DatabaseUtil.auctioneerUtil.getAllPlayers();
    console.log(result[1], current_player_index);
    const current_player_name = result[current_player_index].player_name;
    await DatabaseUtil.TeamUtil.add_player_logs(
      current_player_name,
      teamData.teamName,
      BidAmount
    );
    res.send({ data: "Bidding done" });
  }
});
//get all player and then stage them one by one
app.post("/get_player_to_stage", async (req, res) => {
  //get all players
  const players = await DatabaseUtil.auctioneerUtil.getAllPlayers();
  current_player_index = (current_player_index + 1) % players.length;
  res.send(players[current_player_index]);
});
//called by team manager to view staged player
app.post("/view_current_player", async (req, res) => {
  //returns the current player cycled by the auctioneer
  const players = await DatabaseUtil.auctioneerUtil.getAllPlayers();
  if (current_player_index != -1) res.send(players[current_player_index]);
  else res.send({});
});
//managerPanel
app.get("manager_status", authenticateJWT, async (req, res) => {
  res.send({ status: "LoggedIn" });
});
//form submit
// app.post("/post_form", async (req, res) => {
//   const data = req.body;
//   console.log(data, typeof data);
//   await DatabaseUtil.formUtil.saveForm(data);
//   const token = jwt.sign(data, SECRET_KEY, { expiresIn: "1h" });
//   res.json({ token });
// });
//view form
app.get("/view_form/:field1", authenticateJWT, async (req, res) => {
  const field1 = req.params.field1;
  console.log(field1);
  const data = await DatabaseUtil.formUtil.viewForm(field1);
  console.log(data);
  const response = JSON.stringify(data);
  res.send(response);
});

app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.error("MongoDB connection FAILED");
  }
  console.log(`APP LISTENING ON PORT ${PORT} - ${new Date()}`);
});
