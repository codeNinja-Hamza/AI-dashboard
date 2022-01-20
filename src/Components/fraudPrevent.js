import React from "react";
import { Divider } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const FraudPrevent = (props) => {
  const { FraudPrevent } = props;
  const { title, content } = FraudPrevent;
  const { fraud_chances, no_of_instances, security_measure } = content;
  const progressBarMinMax = no_of_instances.split("/");
  const currentValue = progressBarMinMax[0];
  const maxValue = progressBarMinMax[1];
  return (
    <div className="fraud-prevent-wrapper">
      <div className="card-heading">{title}</div>

      <div className="fraud-prevent-card">
        <div className="card-info">
          <div className="helper-text">Fraud Chances</div>
          <div className="text-value">{fraud_chances}</div>
          <Divider sx={{ mt: 2, mb: 2, width: "80%", color: "#EBEBEB" }} />
          <div className="helper-text">Security Measure</div>
          <div className="text-value">{security_measure}</div>
        </div>
        <div className="circle-bar-sec">
          <div>
            <CircularProgressbar
              maxValue={maxValue}
              value={currentValue}
              text={no_of_instances}
              styles={buildStyles({
                pathColor: "green",
                strokeLinecap: "butt",
                textColor: "black",
              })}
            />
          </div>
          <div className="no-of-instances">NO of Instances</div>
        </div>
      </div>
    </div>
  );
};

export default FraudPrevent;
