import React from "react";
import { Grid, Divider } from "@mui/material";
import { categoryIcon, InventoryIcon, salesIcon, creditIcon } from "./images";

const InventoryData = (props) => {
  const { cardData1, cardData2 } = props;
  const { maincategory, totalinventory, dateest, no_of_employee } = cardData1;
  const { sales, credit, fraudchances } = cardData2;

  return (
    <div className="inventory-wrapper">
      <div className="cards-line"></div>
      <div className="card-wrapper">
        <div className="inventory-card">
          <div className="card-top-sec">
            <Grid container>
              <Grid item xl={2} lg={2} md={2}>
                <div className="icon">
                  <img
                    src={categoryIcon}
                    height="100%"
                    width="auto"
                    alt="firstIcon"
                  />
                </div>
              </Grid>
              <Grid item xl={4} lg={4} md={4} className="align-card-content">
                <div className="helper-text">Best Selling</div>
                <div className="data">
                  {maincategory.length > 16
                    ? maincategory.substring(0, 15) + "..."
                    : maincategory}
                </div>
              </Grid>
              <Grid item xl={2} lg={2} md={2}>
                <div className="icon">
                  <img
                    src={InventoryIcon}
                    height="100%"
                    width="auto"
                    alt="secondIcon"
                  />
                </div>
              </Grid>
              <Grid item xl={4} lg={4} md={4} className="align-card-content">
                <div className="helper-text">Total Inventory</div>
                <div className="data">
                  {totalinventory}
                  <sup>pkr</sup>
                </div>
              </Grid>
            </Grid>
          </div>
          <div>
            <Divider sx={{ mt: 2, color: "#D9CFAC" }} />
          </div>

          <div className="card-bottom-sec">
            <div className="date-sec">
              <div className="helper-text">since</div>
              <div className="data" style={{ paddingLeft: "5px" }}>
                {dateest}
                <sup>years</sup>
              </div>
            </div>
            <div className="employe-sec">
              <div className="data">{no_of_employee}</div>
              <div className="helper-text" style={{ paddingLeft: "5px" }}>
                Employess
              </div>
            </div>
          </div>
        </div>

        <div className="sales-card">
          <div className="card-top-sec">
            <Grid container>
              <Grid item xl={2} lg={2} md={2}>
                <div className="icon">
                  <img
                    src={salesIcon}
                    height="100%"
                    width="auto"
                    alt="thirdIcon"
                  />
                </div>
              </Grid>
              <Grid item xl={4} lg={4} md={4} className="align-card-content">
                <div className="helper-text">Sales</div>
                <div className="data">
                  {sales}
                  <sup>pkr</sup>
                </div>
              </Grid>
              <Grid item xl={2} lg={2} md={2}>
                <div className="icon">
                  <img
                    src={creditIcon}
                    height="100%"
                    width="auto"
                    alt="fourthIcon"
                  />
                </div>
              </Grid>
              <Grid item xl={4} lg={4} md={4} className="align-card-content">
                <div className="helper-text">Total Credit</div>
                <div className="data">
                  {credit}
                  <sup>pkr</sup>
                </div>
              </Grid>
            </Grid>
          </div>
          <div>
            <Divider sx={{ mt: 2, color: "#A8E1BB" }} />
          </div>
          <div className="card-bottom-sec">
            <div className="circle"></div>
            <div className="typography">{fraudchances}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryData;
