import React from 'react';
import { Item, Icon } from 'semantic-ui-react';

const Article = ({ article: { id, title, sticky, created, body } }) =>
  (<Item>
    <Item.Content>
      <Item.Header>
        {sticky ? <Icon name="pin" /> : null}
        {id} - {title}
      </Item.Header>
      <Item.Extra>
        <span>
          {new Date(created).toDateString()}
          {created}
        </span>
      </Item.Extra>
      <Item.Description>
        {body}
      </Item.Description>
    </Item.Content>
  </Item>);

export default Article;
