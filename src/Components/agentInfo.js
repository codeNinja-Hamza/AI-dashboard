import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Checkbox from "react-custom-checkbox";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Divider } from "@mui/material";
import {
  cheque,
  bills,
  cnic,
  Inventory,
  estimate,
  pos,
  ledger,
} from "./images";

const AgentInfo = (props) => {
  const { outputData } = props;
  const style = {
    width: "100%",
    borderRadius: "100px",
  };
  return (
    <div className="agent-info-wrapper">
      {outputData.map((ele) => {
        if (ele.type === 1) {
          const { title, content } = ele;
          const { personalitycheck, shopcheck, intenttorepay } = content;
          const straightLineProgressBar = intenttorepay.split("/");
          const progressBarCurrValue = straightLineProgressBar[0];
          const progressBarMaxValue = straightLineProgressBar[1];
          const personalitycheckBar = personalitycheck.split("/");
          const personalitycheckBarCurrValue = personalitycheckBar[0];
          const personalitycheckBarMaxValue = personalitycheckBar[1];
          const shopcheckBar = shopcheck.split("/");
          const shopcheckBarCurrValue = shopcheckBar[0];
          const shopcheckBarMaxValue = shopcheckBar[1];
          return (
            <div className="wrapper">
              <div className="heading">{title}</div>
              <div className="charts-wrapper">
                <div className="progress-bar-sec">
                  <div className="text-area">Intent to Repay:</div>
                  <div className="progressBar">
                    <ProgressBar
                      variant="warning"
                      style={style}
                      now={progressBarCurrValue}
                      max={progressBarMaxValue}
                    />
                  </div>
                  <div className="value-area"> {intenttorepay}</div>
                </div>
                <div className="chart-sec">
                  <div className="personality-check-progress">
                    <CircularProgressbar
                      value={personalitycheckBarCurrValue}
                      maxValue={personalitycheckBarMaxValue}
                      text={personalitycheck}
                      styles={buildStyles({
                        strokeLinecap: "butt",
                        textColor: "black",
                        pathColor: "#00782C",
                      })}
                    />
                    <div className="progressBar-heading">Personality Check</div>
                  </div>
                  <div className="divider"></div>

                  <div className="shop-check-progress">
                    <CircularProgressbar
                      value={shopcheckBarCurrValue}
                      maxValue={shopcheckBarMaxValue}
                      text={shopcheck}
                      styles={buildStyles({
                        strokeLinecap: "butt",
                        textColor: "black",
                        pathColor: "#DEB01D",
                      })}
                    />
                    <div className="progressBar-heading">Shop Check</div>
                  </div>
                </div>
              </div>
              <Divider sx={{ mt: 5, mb: 5, color: "#EBEBEB" }} />
            </div>
          );
        } else if (ele.type === 2) {
          const { title, content } = ele;

          return (
            <div className="check-box-wrapper">
              <div className="main-heading">{title}</div>
              <div className="check-box">
                {content.map((current) => {
                  const { title, ischecked, type } = current;
                  return (
                    <div className="item">
                      <div className={ischecked ? "checked" : "notChecked"}>
                        {(() => {
                          switch (type) {
                            case 1:
                              return (
                                <div className="icon">
                                  <img
                                    src={cheque}
                                    alt="chequeIcon"
                                    width="48px"
                                    height="48px"
                                  />
                                </div>
                              );
                              break;
                            case 2:
                              return (
                                <div className="icon">
                                  <img
                                    src={bills}
                                    alt="chequeIcon"
                                    width="48px"
                                    height="48px"
                                  />
                                </div>
                              );
                              break;
                            case 3:
                              return (
                                <div className="icon">
                                  <img
                                    src={cnic}
                                    alt="chequeIcon"
                                    width="48px"
                                    height="48px"
                                  />
                                </div>
                              );
                              break;
                            case 4:
                              return (
                                <div className="icon">
                                  <img
                                    src={Inventory}
                                    alt="chequeIcon"
                                    width="48px"
                                    height="48px"
                                  />
                                </div>
                              );
                              break;
                            case 5:
                              return (
                                <div className="icon">
                                  <img
                                    src={estimate}
                                    alt="chequeIcon"
                                    width="48px"
                                    height="48px"
                                  />
                                </div>
                              );
                              break;
                            case 6:
                              return (
                                <div className="icon">
                                  <img
                                    src={pos}
                                    alt="chequeIcon"
                                    width="48px"
                                    height="48px"
                                  />
                                </div>
                              );
                              break;
                            case 7:
                              return (
                                <div className="icon">
                                  <img
                                    src={ledger}
                                    alt="chequeIcon"
                                    width="48px"
                                    height="48px"
                                  />
                                </div>
                              );
                              break;
                          }
                        })()}

                        <div
                          style={{
                            flexBasis: "90%",
                            margin: "0",
                          }}
                        >
                          <Checkbox
                            icon={
                              <CheckOutlinedIcon
                                style={{
                                  width: "100%",
                                  marginRight: "20px",
                                }}
                              />
                            }
                            size="30"
                            disabled={true}
                            name="my-input"
                            right="false"
                            checked={ischecked}
                            borderWidth="0"
                            style={{ cursor: "pointer" }}
                            labelStyle={{
                              marginLeft: "0",
                              userSelect: "none",
                              width: "90%",
                              padding: "10px 10px",
                              paddingLeft: "10px",
                              fontFamily: "poppins",
                              fontSize: "14px",
                            }}
                            label={title}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default AgentInfo;
