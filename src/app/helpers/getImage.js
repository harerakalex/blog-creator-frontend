/* istanbul ignore file */
import ReactHtmlParser from 'react-html-parser';
import defaultImage from '../common/images/defaultImage.png';

const getImage = body => {
  const image = ReactHtmlParser(body);
  let imgUrl;

  image.forEach(img => {
    if (img.type === 'figure') {
      imgUrl = img.props.children[0].props.src;
    }
  });
  if (imgUrl) {
    return imgUrl;
  }
  return defaultImage;
};

export default getImage;
