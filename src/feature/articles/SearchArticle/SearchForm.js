import React, { Component } from 'react';
import './SearchForm.scss';

export class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      keyword: 'title',
    };
  }

  onChange = ({ target }) => {
    this.setState({
      query: target.value,
    }, () => {
      this.onChangeSearch();
    });
  }

  onChangeSearch = () => {
    const { query, keyword } = this.state;
    if (query.length > 2) {
      const { searchAction } = this.props;
      searchAction(query, keyword);
    }
  }

  onSelect = ({ target }) => {
    this.setState({
      keyword: target.value,
    }, () => {
      this.onChangeSearch();
    });
  }

  onSearch = event => {
    event.preventDefault();
    const { query, keyword } = this.state;
    const { searchAction } = this.props;
    searchAction(query, keyword);
  }

  render() {
    const { keyword, query } = this.state;
    return (
      <form onSubmit={this.onSearch} className="search-container">
        <div className="search-container__select-group">
          <select
            className="select-input"
            value={keyword}
            onChange={this.onSelect}
            required
          >
            <option value="title">Search by title</option>
            <option value="author">Search by author</option>
            <option value="tags">Search by tag</option>
          </select>
        </div>
        <div className="search-container__input-group">
          <input
            className="search-input"
            type="text"
            name="search"
            value={query}
            onChange={this.onChange}
            placeholder="Search by title, author, or tags"
            autoComplete="off"
            required
          />
        </div>
      </form>
    );
  }
}

export default SearchForm;
