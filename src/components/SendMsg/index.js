import React, { Component } from 'react';
import './index.css';

class SendMsg extends Component {
 constructor(props) {
   super(props)
   this.state = {
     text: '',
   }
   this.onSubmit = this.onSubmit.bind(this)
   this.onChange = this.onChange.bind(this)
 }

  onSubmit(e) {
   e.preventDefault()
   this.props.onSubmit(this.state.text)
   this.setState({ text: '' })
 }

  onChange(e) {
   this.setState({ text: e.target.value })
   if (this.props.onChange) {
     this.props.onChange()
   }
 }

  render() {
   return (
     <div className="sendContainer">
        <form onSubmit={this.onSubmit}>
            <input
                type="text"
                placeholder="Type your message here and then press ENTER"
                multiple={true}
                onChange={this.onChange}
                value={this.state.text}
            />
        </form>
     </div>
   )
 }
};

export default SendMsg;