import {BsSearch} from 'react-icons/bs'

import './index.css'

const JobSearch = props => {
  const {onChangeSearchInput, searchInput, onSubmitSearch} = props
  const onChangeInput = event => {
    onChangeSearchInput(event.target.value)
  }
  const onClickSearch = () => {
    onSubmitSearch()
  }
  return (
    <div className="job-search-section">
      <div className="search-container">
        <input
          type="search"
          className="search-bar"
          value={searchInput}
          placeholder="Search"
          onChange={onChangeInput}
        />
        <button
          type="button"
          className="search-button"
          testid="searchButton"
          onClick={onClickSearch}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    </div>
  )
}

export default JobSearch
