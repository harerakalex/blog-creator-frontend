import React from 'react';
import './Tags.scss';

const TagsComponent = ({ tags }) => (
  <div>
    {tags
      ? tags.map((tag, { id }) => (
        <button className="article-tags" type="button" key={`${id}:${tag}`}>
          {tag}
        </button>
      ))
      : ''}
  </div>
);

export default TagsComponent;
