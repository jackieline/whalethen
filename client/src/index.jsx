import React from 'react';
import ReactDOM from 'react-dom';
import Search from './search.jsx';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: '',
    };
    {/*this.onSearch = this.onSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);*/}
  }
  render() {
    return (
      <div>
        <h1>SOME TITLE </h1>
        <Search/>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
