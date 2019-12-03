import React from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import IframeVideo from '../IframeVideo'
import moment from "moment";
import './index.css';

class MessageList extends React.Component {

  constructor(props) {
    super(props);
    this.card = React.createRef();
    // this.card.current && setInterval(() => { this.card.current.scrollIntoView({behavior: 'smooth'})}, 2000);
  }

  componentDidMount() {
    //this.scrollToBottom();
  }

  componentDidUpdate(){
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.card.current && this.card.current.scrollIntoView({behavior: 'smooth'})
  }

  render() {
    const { currentUser, messages } = this.props;
    console.log('mess', this.card)
    if(messages.length === 0) { 
      return (
      <div style={{ display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center'}}>
        <CircularProgress disableShrink />
      </div>
      ) 
    };
    return (
      <div
      className="msgListContainer"
      >
        <ul>
          {messages.map((message, index) => (
            <div ref={this.card} className="divElm" style={{ alignItems: currentUser.id === message.senderId ? 'flex-end':'flex-start' }} key={index}>
              <div  className="cardDiv" style={{ backgroundColor: currentUser.id === message.senderId ? '#e1f5fe':'#fafafa' }}>
                <Typography className="title" color="textSecondary" gutterBottom>
                  {index > 0 && ((message.senderId === messages[index-1].senderId) || currentUser.id === message.senderId) ? '':message.senderId}
                </Typography>
                { (message.text).split(' ')[0] === '/youtube' ?
                <IframeVideo term={message.text.replace('/youtube ', '')} />
                :
                <Typography className="txt" variant="body2" component="p">
                  {message.text}
                </Typography>
                }
                <Typography className="txtDate" variant="body2" component="p">
                  {moment(message.createdAt).format('LT')}
                </Typography>
              </div>
            </div>
          ))}
        </ul>
      </div>
    )
  }
};

export default MessageList;