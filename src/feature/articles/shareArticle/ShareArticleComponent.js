import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon
} from 'react-share';
import './ShareArticle.scss';

const ShareArticle = () => {
  const articleToShare = window.location.href;
  return (
    <div className="share-article">
      <FacebookShareButton className="share-article__btn" url={articleToShare}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton
        className="share-article__btn"
        url={articleToShare}
        hashtags={['Coding-geeks']}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <EmailShareButton
        className="share-article__btn"
        url={articleToShare}
        body="body"
      >
        <EmailIcon size={32} round iconBgStyle={{ fill: '#d9483b' }} />
      </EmailShareButton>
    </div>
  );
};

export default ShareArticle;
