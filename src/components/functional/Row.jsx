import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

const Row = ({fields, days}) => {
  //Child component of RowContainer, renders list view
  return (
    <div className="row">
      {fields.map((field, i) => {
        return (
          <li key={i} className={i === 0 ? "active" : ""}>
            <h4>{days[i]}</h4>
            <img src={field.icon} />
            <p>
              <span className="far">{field.temp.fahr}°F</span>
              <span className="cel">{field.temp.cel}°C</span>
            </p>
          </li>
        );
      })}
    </div>
  );
};

//PropTypes

Row.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object),
  days: PropTypes.array
}

export default Row;

