import React from 'react';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      date: props.event.date,
      description: props.event.description
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleEdit(event) {
    this.setState({ editing: true })

  }

  handleSave(event) {
    this.setState({ editing: false })
    this.props.updateHistoricalEvent(this.props.event.id, this.state.date, this.state.description);
  }

  handleInput(event, id) {
    this.setState({[id]: event.target.textContent})
  }

  formatDate(date) {
    if (date < 0) {
      return (date * -1) + ' BCE'
    } else if (date > 0) {
      return date + ' CE'
    } else {
      const [full, year, month, day] = date.match(/(\d+)\/(\d+)\/(\d+)/)
      const formatter = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
      return formatter.format(new Date(year, month, day))
    }
  }

  render() {
    return (
      <div className="eventArea panel panel-default">
        <div className="panel-heading" contentEditable={this.state.editing} onInput={(event) => this.handleInput(event, 'date')}>
          {this.formatDate(this.props.event.date)}
          <input
            className={"btn" + (this.state.editing ? " hidden" : "")}
            type="button"
            value="Edit"
            onClick={this.handleEdit}
          />
          <input
            className={"btn" + (this.state.editing ? "" :  " hidden")}
            type="button"
            value="Save"
            onClick={this.handleSave}
          />
        </div>
        <div className="panel-body" contentEditable={this.state.editing} onInput={(event) => this.handleInput(event, 'description')}>
          {this.props.event.description}
        </div>
      </div>
    )
  }
}