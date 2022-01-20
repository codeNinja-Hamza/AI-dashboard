import React from "react";

const Profiling = (props) => {
  const { profile } = props;
  const { title, content } = profile;
  return (
    <div className="profiling-wrapper">
      <div className="card-container">
        <div className="card-heading-conatiner">
          <div className="heading">{title}</div>
        </div>
        <div className="card-text-side">
          <div className="items">
            {content.map(({ key, value }) => {
              return (
                <div>
                  <div className="helper-text">{key}</div>
                  <div className="data-value">{value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiling;
