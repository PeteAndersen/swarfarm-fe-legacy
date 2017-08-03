import React from 'react';
import { connect } from 'react-redux';
import { newsActions, newsSelectors } from 'state/ducks/news';

import { Container, Item, Dimmer, Loader, Button, Icon } from 'semantic-ui-react';

import Article from './Article';

class News extends React.Component {
  componentWillMount() {
    this.props.getNews();
  }

  nextPage = () => {
    this.props.changePage(this.props.currentPage + 1);
    window.scrollTo(0, 0);
  };

  prevPage = () => {
    this.props.changePage(this.props.currentPage - 1);
    window.scrollTo(0, 0);
  };

  render() {
    const { currentPage, numPages, isLoading } = this.props;
    const articles = this.props.articles.map((article, index) =>
      <Article key={index} article={article} />,
    );

    return (
      <Container>
        <Dimmer.Dimmable as={Item.Group} divided dimmed={isLoading}>
          <Dimmer inverted active={isLoading}>
            <Loader inverted>Loading...</Loader>
          </Dimmer>
          {articles}
        </Dimmer.Dimmable>
        {currentPage > 1
          ? <Button basic floated="left" onClick={this.prevPage}>
              <Icon name="arrow left" /> Previous
            </Button>
          : null}
        {currentPage < numPages
          ? <Button basic floated="right" onClick={this.nextPage}>
              Next <Icon name="arrow right" />
            </Button>
          : null}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: newsSelectors.isLoading(state),
    articles: newsSelectors.getArticlePage(state),
    currentPage: newsSelectors.getPage(state),
    numPages: newsSelectors.getPageCount(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNews: () => dispatch(newsActions.getNews()),
    changePage: newPage => dispatch(newsActions.changePage(newPage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
