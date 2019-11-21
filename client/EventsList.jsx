import React from 'react';
import Event from './Event.jsx';

export default class EventsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="eventsList panel-group">
        {this.props.events.map((event, i) => <Event key={i} event={event} updateHistoricalEvent={this.props.updateHistoricalEvent}/>)}
      </ul>
    )
  }
}