import React from 'react';
import propTypes from 'prop-types';

const SearchBar = props => (
  <div className="searchBar">
    <input
      id="location"
      type="text"
      placeholder="location"
      onChange={props.handleLoc}
      onKeyUp={event => props.onEnter(event)}
    />
    <input
      id="category"
      type="text"
      placeholder="category"
      onChange={props.handleCat}
      onKeyUp={event => props.onEnter(event)}
    />
    <button className="searchSubmit" onClick={props.onSubmit}>Search</button>
  </div>
);

SearchBar.propTypes = {
  onSubmit: propTypes.func.isRequired,
  onEnter: propTypes.func.isRequired,
  handleLoc: propTypes.func.isRequired,
  handleCat: propTypes.func.isRequired,
};


export default SearchBar;
