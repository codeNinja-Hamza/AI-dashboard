import { React, useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Grid,
  Divider,
  Slider,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { maxcredit, speed, loaderImg } from "./images";

const Calculator = (props) => {
  const { creditRating, userId } = props;
  const { title, content } = creditRating;
  const { creditrating, amount } = content;
  const [planresp, setPlanRes] = useState();
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  let [inputAmount, setInputAmount] = useState(amount);
  useEffect(() => {
    handleSubmit();
  }, []);
  const handleSubmit = (e) => {
    setLoader(true);
    let url = `https://seven-328905.el.r.appspot.com/api/getplanbypartner/${userId}/${inputAmount}`;
    axios.get(url).then((res) => {
      setPlanRes(res.data.content.paymentplan);
      setLoader(false);
    });
  };
  const handleApply = () => {
    setSuccess(true);
    let url = `https://seven-328905.el.r.appspot.com/api/applyPaymentPlanByPartner/${userId}/${creditrating}/${amount}/${inputAmount}`;
    axios.get(url).then((res) => {
      setSuccess(false);
      setTooltip(true);
      setTimeout(() => {
        setTooltip(false);
      }, 3000);
    });
  };

  return (
    <div className="calculator-card-wrapper">
      <div className="calculator-card">
        <div className="calculation-section">
          <Grid container justifyContent="space-between">
            <Grid
              item
              xl={2}
              lg={2}
              md={2}
              xs={2}
              sx={{ borderRight: "1px solid lightgrey", paddingTop: "25px" }}
            >
              <div>
                <Slider
                  aria-label="Always visible"
                  valueLabelDisplay="auto"
                  value={creditrating}
                  sx={{
                    position: "abosolute",
                    left: "40%",
                    height: "350px",
                    width: "0px",
                    color: "white",
                    background:
                      "linear-gradient(180deg,green,orange,yellow,red)",
                    borderRadius: "50px",
                    outline: "4px solid white",
                    boxShadow:
                      "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px, rgba(50, 50, 93, 0.3) 0px 30px 60px -12px inset",
                  }}
                  orientation="vertical"
                />
                <div style={{ textAlign: "center" }}>
                  <strong>Credit Score</strong>
                </div>
              </div>
            </Grid>
            <Grid item xl={3} lg={3} md={3} xs={3} className="middle-grid">
              <div>
                <div className="score-section">
                  <div className="icon-side">
                    <img
                      src={speed}
                      height="36px"
                      width="36px"
                      alt="creditIcon"
                    />
                  </div>
                  <div className="text-side">
                    <div className="helper-text">Score</div>
                    <div className="data-value">{creditrating}</div>
                  </div>
                </div>
                <div className="credit-limit-section">
                  <div className="icon-side">
                    <img
                      src={maxcredit}
                      alt="creditIcon"
                      height="36px"
                      width="36px"
                    />
                  </div>
                  <div className="text-side">
                    <div className="helper-text">Max. Credit Limit</div>
                    <div className="data-value">{amount}</div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xl={7} lg={7} md={7}>
              <div className="calculation-section">
                <div className="card-heading">{title}</div>
                <div className="text">Enter Custom Value</div>
                <div className="inputField">
                  <form name="calculateForm">
                    <input
                      type="text"
                      name="amount"
                      value={inputAmount}
                      pattern="[0-9.]+"
                      placeholder={amount}
                      onChange={(e) => setInputAmount(e.target.value)}
                    />
                    <button type="button" onClick={handleSubmit}>
                      Calculate
                    </button>
                  </form>
                </div>
              </div>

              <Divider
                sx={{ width: "63%", marginLeft: "50px", mt: 2, mb: 2 }}
              />
              <div className="table-section">
                <div className="table-heading">Installment/Payback Plan</div>
                <TableContainer>
                  <Table className="table">
                    <TableHead className="t-head">
                      <TableRow>
                        <TableCell className="table-sub-heading">
                          Amount
                        </TableCell>
                        <TableCell className="table-sub-heading">
                          Due Date
                        </TableCell>
                        <TableCell className="table-sub-heading">
                          Percentage
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="scrollBar">
                      {loader ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "20px",
                            paddingLeft: 0,
                          }}
                        >
                          <div style={{ paddingLeft: 0 }}>Loading</div>
                          <div>
                            <img
                              src={loaderImg}
                              alt="loaderIcon"
                              className="animation"
                            />
                          </div>
                        </div>
                      ) : (
                        planresp &&
                        planresp.map(({ amount, duedate, percentage }) => {
                          return (
                            <TableRow>
                              <TableCell className="table-values">
                                {amount}
                              </TableCell>
                              <TableCell className="table-values">
                                {duedate}
                              </TableCell>
                              <TableCell className="table-values">
                                {percentage}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="ApplyButton">
                <LoadingButton
                  disabled={loader ? true : false}
                  onClick={handleApply}
                  loading={success}
                  loadingIndicator="Please wait..."
                  variant="contained"
                  sx={{
                    background: "#bb0f2f",
                    color: "white",
                  }}
                >
                  Apply
                </LoadingButton>
                <div className={tooltip ? "display" : "hide"}>
                  Applied successfully!
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
