import React from 'react';
import { connect } from 'react-redux';
import Form from './SearchForm';
import Result from './SearchResult';
import { search } from './SearchAction';
import './Search.scss';

export function SearchComponent(props) {
  const { search, results } = props;
  return (
    <>
      <Form
        searchAction={search}
      />
      <Result
        results={results}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  results: state.searchResult,
});

const mapDispatchToProps = {
  search
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
