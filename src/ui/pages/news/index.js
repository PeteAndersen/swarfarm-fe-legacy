import React from "react";
import { connect } from "react-redux";
import { newsActions, newsSelectors } from "state/ducks/news";

import { Container, Item, Dimmer, Loader } from "semantic-ui-react";

import Article from "./Article";

class News extends React.Component {
  componentWillMount() {
    this.props.getNews();
  }
  render() {
    const articles = this.props.articles.map((article, index) =>
      <Article key={index} article={article} />
    );

    return (
      <Container text>
        <Dimmer.Dimmable as={Item.Group} divided dimmed={this.props.isLoading}>
          <Dimmer inverted active={this.props.isLoading}>
            <Loader inverted>Loading...</Loader>
          </Dimmer>
          {articles}
        </Dimmer.Dimmable>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.news.isLoading,
    articles: newsSelectors.getNewsPage(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNews: () => dispatch(newsActions.getNews())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
