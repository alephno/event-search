import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInput(event) {
    this.setState({searchString: event.target.value});
  }

  handleSearch(event) {
    event.preventDefault();
    this.props.handleSearch(this.state.searchString);
  }

  render() {
    return (
      <form className="searchArea form-inline" onSubmit={this.handleSearch}>
        <div className="formGroup">
          <input className="form-control" type="text" value={this.state.searchString} placeholder="Keyword..." onChange={this.handleInput} />
          <input className="btn btn-default" type="button" value="Search" onClick={this.handleSearch} />
        </div>
      </form>
    )
  }
}