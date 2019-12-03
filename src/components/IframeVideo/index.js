import React, { Component } from 'react';
import searchYouTube from 'youtube-search-api-with-axios';
import Typography from '@material-ui/core/Typography';
import './index.css';

const API_KEY = 'AIzaSyCT5YNj0WpEUrt_4K8b3GZ6NoBZTOImXMA';

class IframeVideo extends Component {
  constructor() {
    super()
    this.state = {
      videoUri: '',
      isLoading: true,
    }
  }

  componentDidMount(){
    const { term } = this.props;
    // console.log(term)
    searchYouTube({key: API_KEY, term: term, q: term, maxResults: 1}, (videos) => {
        console.log(videos);
        this.setState({ videoUri: `https://www.youtube.com/embed/${videos[0].id.videoId}`, isLoading: false});
    });
    // console.log('data', term)
  }

  render() {
     if (this.state.isLoading) {
        return (
            <Typography className="txt" variant="body2" component="p">
                Loading video...
            </Typography>
        )
     } else {
      return <iframe src={this.state.videoUri} title="Youtube Videos" />
    }
  }
};

export default IframeVideo;