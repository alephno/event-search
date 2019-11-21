import React from 'react';
import Search from './Search.jsx';
import EventsList from './EventsList.jsx';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

export default class EventsApp extends React.Component {
  constructor(props) {
    super(props);
    this.eventsPerPage = 10;
    this.state = {
      events: [],
      keyword: '',
      pageCount: 1,
      pageNumber: 1
    };

    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.updateHistoricalEvent = this.updateHistoricalEvent.bind(this);
  }

  handleSearch(keyword) {
    this.loadHistoricalEvents(1, keyword);
  }

  handlePageClick(data) {
    this.loadHistoricalEvents(data.selected + 1);
  }

  componentDidMount() {
    this.loadHistoricalEvents();
  }

  loadHistoricalEvents(pageNumber = this.state.pageNumber, keyword = this.state.keyword) {
    axios
      .get(`/events?_page=${pageNumber}&_limit=${this.eventsPerPage}${keyword ? `&q=${keyword}` : ''}`)
      .then((response) => {
        this.setState({
        events: response.data,
        pageNumber: pageNumber,
        keyword: keyword,
        pageCount: response.headers['x-total-count'] / this.eventsPerPage});
      })
      .catch((error) => console.error(error.message));
  }

  updateHistoricalEvent(id, date, description) {
    axios
      .patch(`/events/${id}`, {date, description})
      .then(() => this.loadHistoricalEvents())
      .catch((error) => console.error(error.message))
  }

  render() {
    return (
      <div className="eventsApp">
        <Search handleSearch={this.handleSearch} />
        <EventsList events={this.state.events} updateHistoricalEvent={this.updateHistoricalEvent}/>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          initialPage={0}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'nav nav-pills nav-justified'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    )
  }
}