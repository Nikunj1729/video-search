import React from "react";
import c from 'classnames';
import { KEY } from "../api/youtube";
import axios from "axios";
import windowResize from '../utils/windowResize';
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

class App extends React.Component {
  state = { videos: [], selectedVideo: null };

  onTermSubmit = async (term) => {
    const responses = await axios.get("/search", {
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: {
        part: "snippet",
        maxResults: 5,
        key: KEY,
        q: term,
      },
    });

    this.setState({
      videos: responses.data.items,
      selectedVideo: responses.data.items[0],
    });
  };

  onVideoSelect = (selectedVideo) => {
    this.setState({ selectedVideo });
  };

  componentDidMount() {
    this.onTermSubmit("buildings");
  }

  render() {
    const width = this.props.windowWidth;
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className={c("ui", width < 767 ? 'column' : 'row')}>
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className={c("five wide column", width < 767 && 'ui segment')}>
              <VideoList
                videos={this.state.videos}
                onVideoSelect={this.onVideoSelect}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default windowResize(App);
