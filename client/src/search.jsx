import React from 'react';
import SearchBar from './searchBar.jsx';
import request from '../../node_modules/request-promise';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termBar: '',
      searchList: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  

  onSubmit(e) {
    const options = {
      url: '/search'
      method: 'GET'
    }
    request(options)
      .then(response => {
        
      })

  }

  render() {
    return (
      <div>
        <h1>Search Stuff</h1>
        <SearchBar onSubmit={this.onSubmit} />
      </div>
    );
  }
}


{/*Search.propTypes = {
  SOMEDATA: React.PropTypes.object.isRequired,
};*/}

export default Search;
