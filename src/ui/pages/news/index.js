import React from "react";
import { connect } from "react-redux";
import { newsActions } from "state/ducks/news";

class News extends React.Component {
  render() {
    return (
      <div>
        <p>This is the news!</p>
        <button onClick={this.props.getNews}>Get News</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNews: () => {
      return new Promise((resolve, reject) => {
        dispatch(newsActions.getNews());
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(News);
