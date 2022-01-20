import React from "react";
import { Divider } from "@mui/material";
import credit from "../Assets/images/debit.png";
import debit from "../Assets/images/credit.png";
const TransactionHistory = (props) => {
  const { visibilty } = props;
  const { title, content } = props.transHistory;
  const { history } = content;
  return (
    <div className="transaction-history-cards">
      <div className={visibilty ? "show" : "hide"}>{title}</div>
      {history.map(({ amount, type, date, balance }) => {
        if (type === "Credit" || type === "due") {
          return (
            <div className="credit-card">
              <div className="icon-sec">
                <div className="icon">
                  <img
                    src={credit}
                    alt="creditIcon"
                    height="100%"
                    width="auto"
                  />
                </div>
                <div className="icon-text">{type}</div>
              </div>
              <div className="amount">
                {amount}
                <sup>pkr</sup>
              </div>
              <div className="divider">
                <Divider sx={{ mt: 5, mb: 5, color: "#EBEBEB" }} />
              </div>
              <div className="date">{date}</div>
              <div className="balance">
                <div className="text">Balance</div>
                <div className="">
                  {balance}
                  <sup>pkr</sup>
                </div>
              </div>
            </div>
          );
        } else if (type === "Debit" || type === "paid" || type === "") {
          return (
            <div className="debit-card">
              <div className="icon-sec">
                <div className="icon">
                  <img src={debit} alt="debitIcon" height="100%" width="auto" />
                </div>
                <div className="icon-text">{type}</div>
              </div>
              <div className="amount">
                {amount}
                <sup>pkr</sup>
              </div>
              <div className="divider">
                <Divider sx={{ mt: 5, mb: 5, color: "#EBEBEB" }} />
              </div>
              <div className="date">{date}</div>
              <div className="balance">
                <div className="text">Balance</div>
                <div className="">
                  {amount}
                  <sup>pkr</sup>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default TransactionHistory;
