import React from 'react';
import timeUtils from '../calendar/timeUtils';
import eventUtils from '../calendar/eventUtils';
import classNames from 'classnames';

class Event extends React.Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func
  }

  _handleEventClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.event);
    }
  }

  render() {
    const event = this.props.event;
    const start = eventUtils.getEventStartDate(event);
    const end = eventUtils.getEventEndDate(event);
    let timeRange = 'All day';
    if (event.start.dateTime) {
      timeRange = `${timeUtils.formatTime(start, 'ampm')} - ${timeUtils.formatTime(end, 'ampm')}`;
    }

    const now = new Date();

    const eventClasses = classNames({
      event: true,
      past: end < now,
      current: now >= start && now <= end
    });

    return (
      <div onMouseDown={this._handleEventClick} className={eventClasses}>
        <div className="name">
          {event.summary}
          <div className="location">
            {event.location}
          </div>
        </div>
        <div className="time">{timeRange}</div>
      </div>
    );
  }
}

export default Event;
