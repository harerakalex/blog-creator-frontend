import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import './Pagination.scss';

export class PaginationComonent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  handlePageChange = (pageNumber) => {
    const { getAllArticles } = this.props;
    getAllArticles(pageNumber);
    this.setState({ activePage: pageNumber });
  };

  render() {
    const { activePage } = this.state;
    const { articleNumbers } = this.props;
    return (
      <div>
        <div className="pagination-container">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={articleNumbers}
            pageRangeDisplayed={3}
            onChange={this.handlePageChange}
            hideNavigation
            firstPageText="First"
            lastPageText="Last"
            hideDisabled
          />
        </div>
      </div>
    );
  }
}

export default PaginationComonent;
