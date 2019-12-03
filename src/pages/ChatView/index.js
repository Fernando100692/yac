import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'
import './index.css'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import MessageList from '../../components/MessageList';
import SendMsg from '../../components/SendMsg';
import IsTyping from '../../components/IsTyping';
import PeopleList from '../../components/PeopleList'
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { logoutUser } from "../../actions";

class ChatScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this)
  };

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error('error', error));
  }

  sendMessage(text) {
      this.state.currentUser.sendMessage({
        text,
        roomId: this.state.currentRoom.id,
      });
  };

  componentDidMount () {
    // console.log('props', this.props)
    const { currentUsername, location } = this.props;
    const currentUser = this.props.currentUsername === false ? location.state.email:currentUsername;
    this.onUsernameSubmitted(currentUser);
  };

  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => {
        this.onChat(username)
      })
      .catch(error => console.error('error', error))
  };

  onChat(currentUsername){
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:027b5d6e-2c39-4cc2-b312-c0673f7f31ff',
        userId: currentUsername,
        //userId: 'fer',
        tokenProvider: new Chatkit.TokenProvider({
          url: 'http://localhost:3001/authenticate',
        }),
    });
  
      chatManager
        .connect()
        .then(currentUser => {
          this.setState({ currentUser });
            return currentUser.subscribeToRoom({
                roomId: "43ee094f-0fa6-4dd2-9f66-4b555513520a",
                messageLimit: 100,
                hooks: {
                  onMessage: message => {
                    this.setState({
                      messages: [...this.state.messages, message],
                    });
                  },
                  onUserStartedTyping: user => {
                    this.setState({
                      usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                    })
                  },
                  onUserStoppedTyping: user => {
                    this.setState({
                      usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                        username => username !== user.name
                      ),
                    })
                  },
                  onPresenceChange: () => this.forceUpdate(),
                  onUserJoined: () => this.forceUpdate(),
                },
              })
            })
            .then(currentRoom => {
              this.setState({ currentRoom });
            })
          .catch(error => console.error('error', error))
  }

  handleClose = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div>
          <div className="container">
            <div className="whoIsDiv">
              <div style={{ display: 'flex', 
                            flexDirection: 'row', 
                            width: '100%', 
                            justifyContent: 'space-around', 
                            alignItems: 'center', 
                            height: 50, 
                            backgroundColor: '#03a9f4' }}>
                <AccountCircle style={{ color: 'white'}}/>
                <Button onClick={this.handleClose} style={{ color: 'white', fontSize: 12 }} >Logout</Button>
              </div>
              <PeopleList
                currentUser={this.state.currentUser}
                users={this.state.currentRoom.users}
              />
            </div>
            <div className="messageDiv">
              <MessageList
                messages={this.state.messages}
                currentUser={this.state.currentUser}
                // style={styles.chatList}
              />
              <IsTyping usersWhoAreTyping={this.state.usersWhoAreTyping} />
              <SendMsg 
                onSubmit={this.sendMessage}
                onChange={this.sendTypingEvent}
              />
            </div>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(ChatScreen);