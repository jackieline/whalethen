import React from 'react';
import propTypes from 'prop-types';

const TimelineLookUp = (props) => {
  const {
    handleID,
    handleName,
    getTrip,
    onLookupEnter,
  } = props;
  
  return (
    <div className="inputBox">
      <label className="timelineLookUp" htmlFor="timelineLookUp">
        Timeline Look Up:
      <input
        id="timelineLookUp"
        type="text"
        name="timelineLookUp"
        onChange={handleID}
        placeholder="enter ID"
      />
        <input
          id="timelineLookUp"
          type="text"
          name="timelineLookUp"
          onChange={handleName}
          onKeyUp={event => onLookupEnter(event)}
          placeholder="enter Name"
        />
        <button className="searchSubmit" onClick={getTrip}>Search ID</button>
      </label>
    </div>
  );
};

TimelineLookUp.propTypes = {
  handleID: propTypes.func.isRequired,
  handleName: propTypes.func.isRequired,
  onLookupEnter: propTypes.func.isRequired,
  getTrip: propTypes.func.isRequired,
};

export default TimelineLookUp;
