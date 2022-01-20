import React from "react";
import { Grid } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const ConsumerProfile = (prop) => {
  const { consumer } = prop;
  const { title, content } = consumer;
  const { data, avgcreditprofile } = content;
  const progressBarMinMax = avgcreditprofile.split("/");
  const currentValue = progressBarMinMax[0];
  const maxValue = progressBarMinMax[1];
  return (
    <div className="consumer-profile-wrapper">
      <Grid container>
        <Grid item xl={4} lg={4} md={4}>
          <div className="consumerProfile-heading">{title}</div>
          <div className="consumer-info">
            {data.map(({ key, value, sup }) => {
              return (
                <div className="info-container">
                  <div className="text-side">
                    <div className="helper-text">{key}</div>
                    <div className="amount-value">
                      {value}
                      <sup>{sup}</sup>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Grid>
        <Grid
          item
          xl={8}
          lg={8}
          md={8}
          sx={{
            background: "white",
            paddingTop: "20px",
            paddingBottom: "40px",
            borderRadius: "5px",
            border: "1px solid #ebebeb",
          }}
        >
          <div className="circular-bar-container">
            <div className="avg-credit-text">Avg. Credit Profile</div>
            <div className="progress-bar-side">
              <CircularProgressbar
                value={currentValue}
                maxValue={maxValue}
                text={avgcreditprofile}
                styles={buildStyles({
                  pathColor: "#00782C",
                  textColor: "black",
                  strokeLinecap: "butt",
                })}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ConsumerProfile;
