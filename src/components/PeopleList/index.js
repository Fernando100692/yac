import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class PeopleList extends Component {
  renderUsers() {
    console.log(this.props.users)
    return (
      <ul>
        {this.props.users.map((user, index) => {
          if (user.id === this.props.currentUser.id) {
            return (
              <WhosOnlineListItem key={index} presenceState="online">
                <Typography style={{ color: 'white' }} variant="body2" component="p">
                {user.name} (You)
                </Typography>
              </WhosOnlineListItem>
            )
          }
          return (
            <WhosOnlineListItem key={index} presenceState={user.presence.state}>
              <Typography style={{ color: 'white' }} variant="body2" component="p">
              {user.name}
              </Typography>
            </WhosOnlineListItem>
          )
        })}
      </ul>
    )
  }

  render() {
    if (this.props.users) {
      return this.renderUsers();
    } else {
      return (
        <ul>
          <Typography style={{ color: 'white' }} variant="body2" component="p">Loading...</Typography>
        </ul>
      )
    }
  }
}

class WhosOnlineListItem extends Component {
  render() {
    const styles = {
      li: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 2,
        paddingBottom: 2,
      },
      div: {
        borderRadius: '50%',
        width: 11,
        height: 11,
        marginRight: 10,
      },
    }
    return (
      <li style={styles.li}>
        <div
          style={{
            ...styles.div,
            backgroundColor:
              this.props.presenceState === 'online' ? '#03a9f4' : '#414756',
          }}
        />
        {this.props.children}
      </li>
    )
  }
}

export default PeopleList;