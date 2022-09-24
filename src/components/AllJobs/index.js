import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import JobCard from '../JobCard'

import UserProfile from '../UserProfile'
import FilterGroup from '../FiltersGroup'
import './index.css'
import JobSearch from '../JobSearch'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_progress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class AllJobs extends Component {
  state = {
    salary: '',
    employment: [],
    searchInput: '',
    jobsList: [],
    activeTab: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    this.setState({
      activeTab: apiStatusConstants.in_progress,
    })
    const {salary, employment, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const employmentOptions = employment.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentOptions}&minimum_package=${salary}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(jobDetails => ({
        companyLogoUrl: jobDetails.company_logo_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        location: jobDetails.location,
        rating: jobDetails.rating,
        jobDescription: jobDetails.job_description,
        title: jobDetails.title,
        packagePerAnnum: jobDetails.package_per_annum,
      }))
      this.setState({
        jobsList: updatedData,
        activeTab: apiStatusConstants.success,
      })
    } else {
      this.setState({
        activeTab: apiStatusConstants.failure,
      })
    }
  }

  onChangeEmployment = event => {
    const {employment} = this.state
    let updatedList = [...employment]
    if (event.target.checked) {
      updatedList = [...employment, event.target.value]
    } else {
      updatedList.splice(employment.indexOf(event.target.value), 1)
    }
    this.setState({employment: updatedList}, this.getAllJobs)
  }

  onSubmitSearch = () => {
    this.getAllJobs()
  }

  onClickJobsRetry = () => {
    this.getAllJobs()
  }

  onChangeSearchInput = userInput => {
    this.setState({
      searchInput: userInput,
    })
  }

  onChangeSalary = id => {
    this.setState(
      {
        salary: id,
      },
      this.getAllJobs,
    )
  }

  renderLoader = () => (
    <div className="failure-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureTab = () => (
    <div className="failure-loader-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-fail-text">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="jobs-fail-button"
        type="button"
        onClick={this.onClickJobsRetry}
      >
        Retry
      </button>
    </div>
  )

  renderNoJobs = () => (
    <div className="failure-loader-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading">No Jobs Found</h1>
      <p className="jobs-fail-text">
        we could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderSuccessTab = () => {
    const {jobsList} = this.state
    const listLength = jobsList.length === 0
    return (
      <>
        {listLength && this.renderNoJobs()}
        <ul className="jobs-container">
          {jobsList.map(eachJob => (
            <JobCard jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </>
    )
  }

  renderActiveTab = () => {
    const {activeTab} = this.state
    switch (activeTab) {
      case apiStatusConstants.in_progress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccessTab()
      case apiStatusConstants.failure:
        return this.renderFailureTab()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <div className="jobs-search-container">
          <div className="mobile-search">
            <JobSearch
              onChangeSearchInput={this.onChangeSearchInput}
              searchInput={searchInput}
              onSubmitSearch={this.onSubmitSearch}
            />
          </div>
          <UserProfile />
          <FilterGroup
            onChangeSalary={this.onChangeSalary}
            onChangeEmployment={this.onChangeEmployment}
          />
        </div>
        <div className="all-jobs-container">
          <div className="desktop-search">
            <JobSearch
              onChangeSearchInput={this.onChangeSearchInput}
              searchInput={searchInput}
              onSubmitSearch={this.onSubmitSearch}
            />
          </div>
          {/* <ul className="jobs-container">
          {jobsList.map(eachJob => (
            <JobCard jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul> */}
          {this.renderActiveTab()}
        </div>
      </>
    )
  }
}

export default AllJobs
