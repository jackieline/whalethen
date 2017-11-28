import React from 'react';
import propTypes from 'prop-types';

const CreateEventBox = (props) => {
  const {
    timelineName,
    addNewEvent,
    numberOfDays,
    onCreateDaySelect,
    createEventDay,
    onCreateEnter,
    handleNewEvent,
    handleNewAddress,
    createEvent,
  } = props;

  const daysArr = ['Choose Day'];
  for (let i = 1; i <= numberOfDays; i += 1) {
    daysArr.push(`Day ${i}`);
  }

  return (
    <div className="container createBox label">
      <label className="createEvent" htmlFor="createEvent">
        <span>
          <input
            id="createEventName"
            type="text"
            name="createEventName"
            placeholder="enter an event"
            onChange={handleNewEvent}
          />
        </span>
        <span>
          <input
            id="createEventAddress"
            type="text"
            name="createEventAddress"
            placeholder="enter an address"
            onChange={handleNewAddress}
            onKeyUp={event => onCreateEnter(event)}
          />
        </span>

        <span>
          <select className="selectDays" onChange={onCreateDaySelect}>
            {daysArr.map(day => <option value={day} key={day}>{day}</option>)}
          </select>
        </span>

        <span>
          <button
            className="addEvent"
            onClick={createEvent}
          >
                Create Event
          </button>
        </span>
      </label>
    </div>
  );
};

CreateEventBox.propTypes = {
  timelineName: propTypes.string.isRequired,
  addNewEvent: propTypes.func.isRequired,
  numberOfDays: propTypes.number.isRequired,
  onCreateDaySelect: propTypes.func.isRequired,
  createEventDay: propTypes.string.isRequired,
  onCreateEnter: propTypes.func.isRequired,
  handleNewEvent: propTypes.func.isRequired,
  handleNewAddress: propTypes.func.isRequired,
  createEvent: propTypes.func.isRequired,
};

export default CreateEventBox;
