import styles from "./App.module.css";
import { useEffect, useState } from "react";
import TeamLogin from "./components/TeamLogin";
import CreateTeam from "./components/CreateTeam";
import TeamDashboard from "./components/TeamDashBoard";
import AuctioneerLogin from "./components/AuctioneerLogin";
import AuctioneerDashboard from "./components/AuctioneerDashboard";
const BASE_URL = "http://localhost:3051";
let flag = false;
function App() {
  const [stateData, setStateData] = useState({});
  const [dataByChild, setDataByChild] = useState("qwer");
  const [JWTToken, setJWTToken] = useState("");
  const [currentPage, setCurrentPage] = useState("home");
  console.log(dataByChild);
  //use effect renders twice prob fix
  useEffect(() => {
    if (!flag) console.log("Hi");
    flag = true;
  }, []);
  // async function handleServerPostCall() {
  //   try {
  //     const response = await fetch(`${BASE_URL}/view_form/demo`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${JWTToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
  return (
    <>
      {currentPage === "home" && (
        <div className={styles.container}>
          <p>IPL Auctioning System</p>

          <div className={styles.body}>
            <div className={styles.header}>
              <button
                className={styles.headerButton}
                onClick={() => setCurrentPage("teamLogin")}
              >
                Team
              </button>
              <button
                className={styles.headerButton}
                onClick={() => setCurrentPage("auctioneerLogin")}
              >
                Auctioneer
              </button>
            </div>
          </div>
        </div>
      )}
      {currentPage === "teamLogin" && (
        <div>
          <TeamLogin
            setJWTToken={setJWTToken}
            setCurrentPage={setCurrentPage}
          ></TeamLogin>
        </div>
      )}
      {currentPage === "auctioneerLogin" && (
        <div>
          <AuctioneerLogin
            setCurrentPage={setCurrentPage}
            setJWTToken={setJWTToken}
          ></AuctioneerLogin>
        </div>
      )}
      {currentPage === "CreateTeam" && (
        <div>
          <CreateTeam setCurrentPage={setCurrentPage}></CreateTeam>
        </div>
      )}
      {currentPage === "teamDashboard" && (
        <div>
          <TeamDashboard setCurrentPage={setCurrentPage}></TeamDashboard>
        </div>
      )}
      {currentPage === "auctioneerDashboard" && (
        <div>
          <AuctioneerDashboard setJWTToken={setJWTToken}></AuctioneerDashboard>
        </div>
      )}
    </>
  );
}

export default App;
