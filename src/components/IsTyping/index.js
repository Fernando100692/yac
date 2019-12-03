import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import './index.css';

class IsTyping extends Component {
  render() {
    if (this.props.usersWhoAreTyping.length > 0) {
      return (
        <div className="containerTyping">
          <Typography className="title" color="textSecondary" gutterBottom>
            {`${this.props.usersWhoAreTyping
              .slice(0, 2)
              .join(' and ')} is typing...`}
          </Typography>
        </div>
      )
    }
    return <div />
  }
};

export default IsTyping;