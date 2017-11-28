import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import SearchBar from './SearchBar';
import SearchList from './SearchList';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationSearch: '',
      termBar: '',
      searchList: [],
      selectedDay: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleCat = this.handleCat.bind(this);
    this.handleLoc = this.handleLoc.bind(this);
    this.onDaySelect = this.onDaySelect.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }
  onSubmit() {
    axios.get('/search', { params: { category: this.state.termBar, location: this.state.locationSearch } })
      .then(({ data }) => {
        this.setState({
          searchList: data,
        });
      })
      .catch(err => console.error(err));
  }
  onEnter(event) {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }
  onDaySelect(e) {
    this.setState({
      selectedDay: e.target.value,
    });
  }
  handleCat(e) {
    this.setState({
      termBar: e.target.value,
    });
  }
  handleLoc(e) {
    this.setState({
      locationSearch: e.target.value,
    });
  }
  render() {
    return (
      <div className="container search">
        <SearchBar
          onSubmit={this.onSubmit}
          onEnter={this.onEnter}
          handleCat={this.handleCat}
          handleLoc={this.handleLoc}
        />
        <div className="scrollbox">
          <SearchList
            searchList={this.state.searchList}
            numberOfDays={this.props.numberOfDays}
            addNewEvent={this.props.addNewEvent}
            onDaySelect={this.onDaySelect}
            selectedDay={this.state.selectedDay}
          />
        </div>
      </div>
    );
  }
}


Search.propTypes = {
  numberOfDays: propTypes.number.isRequired,
  addNewEvent: propTypes.func.isRequired,
};

export default Search;
