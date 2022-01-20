import React from "react";

const AppStats = (props) => {
  // const { cardData1, cardData2 } = props;
  // const { maincategory, totalinventory, dateest, no_of_employee } = cardData1;
  // const { sales, credit, fraudchances } = cardData2;

  return (
    <div className="stats-wrapper">
      <div className="wrapper">
        <div className="item">
          Data Processed: <span>2GB</span>
        </div>
        <div className="item">
          Data Sources: <span>4</span>
        </div>
        <div className="item">
          Tables Analysed: <span>20</span>
        </div>
        <div className="item">
          Data Points: <span>30</span>
        </div>
        <div className="item">
          Loan Processed: <span>300</span>
        </div>
      </div>
    </div>
  );
};

export default AppStats;
