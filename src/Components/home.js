import { React, useEffect, useState } from "react";
import { Modal, Box, Button, Divider } from "@mui/material";
import axios from "axios";
import {
  AgentInfo,
  Calculator,
  FraudPrevent,
  Location,
  LineChart,
  ConsumerProfile,
  SalesChart,
  AppStats,
  Profiling,
  TransactionHistory,
  InventoryData,
} from "./index";
import { userProfie, logo, arrow, loaderImg, cal } from "./images";
import { useHistory } from "react-router-dom";
import { db, auth, logout } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  const [searchboxitems, setSearchboxitems] = useState();
  const [statsData, setStatsData] = useState();
  const [outputData, setOutputData] = useState();
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(true);
  const [selectedItem, setSelectedItem] = useState();
  const [open, setOpen] = useState(false);
  const [username, setUserName] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [user] = useAuthState(auth);
  const history = useHistory();
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  let base_url = "https://seven-328905.el.r.appspot.com/api";
  useEffect(() => {
    let url = `${base_url}/v2/getdatabypartner/${selectedItem}`;
    setLoader(true);
    axios.get(url).then((resp) => {
      setLoader(false);
      console.log("data", resp.data);
      setStatsData(resp.data.content);
      if (resp.data.content.userdata) {
        setOutputData(
          resp.data.content.userdata.filter((curr) => {
            if (curr.type === 1 || curr.type === 2) return curr;
          })
        );
      }
    });
  }, [selectedItem]);
  useEffect(() => {
    let url = `${base_url}/getpartners`;
    axios.get(url).then((response) => {
      setLoading(false);
      setSearchboxitems(response.data.data);
      setSelectedItem(response.data.data[0].pid);
    });
  }, []);
  const fetchUserName = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = query.docs[0].data();
      setUserName(data.name);
    } catch (err) {}
  };
  if (!user) {
    history.push("/login");
  }

  useEffect(() => {
    fetchUserName();
  }, [user]);

  const signOut = () => {
    logout();
  };
  const handleSelectChange = (eve) => {
    setSelectedItem(eve.target.value);
  };
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };
  const style = {
    marginTop: "180px",
    marginLeft: "31%",
    marginRight: "7.5%",
    width: "60%",
    height: "480px",
    borderRadius: "5px",
    boxShadow: 24,
    bgcolor: "background.paper",
    paddingLeft: 0,
    overFlow: "auto",
  };
  const dropDownStyle = {
    marginLeft: "5px",
    position: "absolute",
    backgroundColor: "#f1f1f1",
    width: "80px",
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
    zIndex: 1,
  };
  const dropDownButton = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    border: "none",
    padding: "5px 5px",
    fontFamily: "poppins",
  };
  const mainloaderStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    height: "250px",
    width: "400px",
    fontFamily: "poppins",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return loading || !searchboxitems || !statsData ? (
    <div>
      <div style={mainloaderStyle}>
        Please wait... &nbsp;
        <img src={loaderImg} alt="loaderIcon" className="animation" />
      </div>
    </div>
  ) : (
    <div className="home-wrapper">
      <header className="header-wrapper">
        <div className="stats">
          {statsData && (
            <AppStats
              cardData1={statsData.card1 ? statsData.card1 : null}
              cardData2={statsData.card2 ? statsData.card2 : null}
            />
          )}
        </div>
        <div className="top-profile-section">
          <div className="logo">
            <img src={logo} height="30px" width="160px" alt="24sevenLogo" />
          </div>
          <div className="user-profile">
            <div className="user-name">Hi, {username}</div>
            <div className="user-image">
              <div>
                <img
                  src={userProfie}
                  height="38px"
                  width="38px"
                  alt="userProfile"
                />
              </div>
              <div className="dropdown">
                <button onClick={handleDropDown} className="dropbtn">
                  <img src={arrow} alt="dropdown" height="10px" width="16px" />
                </button>
                <div
                  className={dropDown ? "show" : "hide"}
                  style={dropDownStyle}
                >
                  <a href="#" style={{ textDecoration: "none" }}>
                    <button style={dropDownButton} onClick={signOut}>
                      Logout
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="selection-box-section">
          <div className="selection-box-wrapper">
            <div className="selection-box-text">Partner:</div>
            <div>
              <select
                className=" select selection-box"
                onChange={handleSelectChange}
              >
                {searchboxitems.map(({ pid, title }) => {
                  return (
                    <option value={pid} key={pid}>
                      {title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="calculator">
            <Button onClick={handleOpen} className="modal-button">
              <div>
                <img
                  src={cal}
                  alt="calculatorIcon"
                  height="30px"
                  width="30px"
                />
              </div>
              <div
                style={{
                  marginLeft: "10px",
                  fontSize: "16px",
                  textTransform: "capitalize",
                }}
              >
                Loan Plan Calculator
              </div>
            </Button>
            <Modal
              open={open}
              sx={{ zIndex: 4 }}
              onClose={handleClose}
              className="modal-box"
            >
              <Box sx={style}>
                {statsData.creditrating && (
                  <Calculator
                    creditRating={
                      statsData.creditrating ? statsData.creditrating : null
                    }
                    userId={selectedItem}
                  />
                )}
              </Box>
            </Modal>
          </div>
        </div>
      </header>

      {loader ? (
        <div style={mainloaderStyle}>
          Please wait... &nbsp;
          <img src={loaderImg} alt="loaderIcon" className="animation" />
        </div>
      ) : (
        <section className="map-wrapper">
          <div className="map-area">
            <div className="map-section">
              <div>
                {statsData && (
                  <Location
                    locationArea={
                      statsData.basicinfo ? statsData.basicinfo : null
                    }
                  />
                )}
              </div>
            </div>
          </div>

          <div className="scroll-section">
            <div className="inventory-cards">
              {statsData && (
                <InventoryData
                  cardData1={statsData.card1 ? statsData.card1 : null}
                  cardData2={statsData.card2 ? statsData.card2 : null}
                />
              )}
            </div>
            <div className="personal-grading">
              {outputData && (
                <AgentInfo outputData={outputData ? outputData : null} />
              )}
            </div>
            <Divider sx={{ mt: 5, mb: 5, color: "#EBEBEB" }} />

            <div className="trans-history-chart">
              {statsData && (
                <LineChart
                  creditStatistics={
                    statsData.userdata[2] ? statsData.userdata[2] : null
                  }
                />
              )}
            </div>
            <div className="trans-history-cards">
              {statsData && (
                <TransactionHistory
                  transHistory={
                    statsData.userdata[3] ? statsData.userdata[3] : null
                  }
                  visibilty={false}
                />
              )}
            </div>
            <Divider sx={{ mt: 5, mb: 5, color: "#EBEBEB" }} />
            <div className="sales-chart">
              {statsData && (
                <SalesChart
                  saleStatistics={
                    statsData.userdata[4] ? statsData.userdata[4] : null
                  }
                />
              )}

              <Divider sx={{ mt: 5, mb: 5, color: "#EBEBEB" }} />
              <div className="consumer-profile">
                {statsData && (
                  <ConsumerProfile
                    consumer={
                      statsData.userdata[5] ? statsData.userdata[5] : null
                    }
                  />
                )}
              </div>
              <Divider sx={{ mt: 5, mb: 5, color: "#EBEBEB" }} />

              <div className="shop-profiling">
                {statsData && (
                  <Profiling
                    profile={
                      statsData.userdata[7] ? statsData.userdata[7] : null
                    }
                  />
                )}
              </div>
              <Divider sx={{ mt: 5, mb: 5, color: "#EBEBEB" }} />
              <div className="product-profiling">
                {statsData && (
                  <Profiling
                    profile={
                      statsData.userdata[8] ? statsData.userdata[8] : null
                    }
                  />
                )}
              </div>
              <Divider sx={{ mt: 5, mb: 5, color: "#EBEBEB" }} />

              <div className="fraud-prevent">
                {statsData && (
                  <FraudPrevent
                    FraudPrevent={
                      statsData.userdata[6] ? statsData.userdata[6] : null
                    }
                  />
                )}
              </div>
              <Divider sx={{ mt: 5, mb: 5, color: "#EBEBEB" }} />

              <div className="late-payment-history">
                {statsData && (
                  <TransactionHistory
                    transHistory={
                      statsData.userdata[9] ? statsData.userdata[9] : null
                    }
                    visibilty={true}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
