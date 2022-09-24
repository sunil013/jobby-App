import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'
import SimilarJobCard from '../SimilarJobCard'

const apiStatus = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {jobsDetails: [], activeTab: apiStatus.initial}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      activeTab: apiStatus.in_progress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedSkills = fetchedData.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))
      const updatedLifeAtCompany = {
        description: fetchedData.job_details.life_at_company.description,
        imageUrl: fetchedData.job_details.life_at_company.image_url,
      }
      const jobDetails = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        title: fetchedData.job_details.title,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        skills: updatedSkills,
        lifeAtCompany: updatedLifeAtCompany,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
      }
      const similarJobs = fetchedData.similar_jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsDetails: {jobDetails, similarJobs},
        activeTab: apiStatus.success,
      })
    } else {
      this.setState({
        activeTab: apiStatus.failure,
      })
    }
  }

  onFailureRetry = () => {
    this.getJobDetails()
  }

  renderLoader = () => (
    <div className="details-failure-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureTab = () => (
    <div className="details-failure-loader-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-details-failure-img"
      />
      <h1 className="job-details-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="job-details-failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="job-details-failure-button"
        type="button"
        onClick={this.onFailureRetry}
      >
        Retry
      </button>
    </div>
  )

  renderSimilarJobs = () => {
    const {jobsDetails} = this.state
    return (
      <div className="similar-jobs-container">
        <h1 className="similar-heading">Similar Jobs</h1>
        <ul className="similar-jobs">
          {jobsDetails.similarJobs.map(jobDetails => (
            <SimilarJobCard jobDetails={jobDetails} key={jobDetails.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobCard = () => {
    const {jobsDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      title,
      location,
      packagePerAnnum,
      rating,
    } = jobsDetails.jobDetails
    return (
      <div className="job-details-card-container">
        <div className="details-company-logo-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="details-company-logo"
          />
          <div>
            <h1 className="details-company-title">{title}</h1>
            <div className="details-rating-container">
              <AiFillStar className="details-star-rating" />
              <p className="details-company-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="details-salary-location-container">
          <div className="details-location-role-container">
            <div className="details-location-role">
              <MdLocationOn className="details-location-role-icons" />
              <p className="details-location-role-names">{location}</p>
            </div>
            <div className="details-location-role-container">
              <MdBusinessCenter className="details-location-role-icons" />
              <p className="details-location-role-names">{employmentType}</p>
            </div>
          </div>
          <p className="details-company-package">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <div className="description-visit-container">
          <h1 className="details-description-heading">Description</h1>
          <a
            href={companyWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-link"
          >
            <button type="button" className="visit-button">
              <p className="visit-text">Visit</p>
              <BsBoxArrowUpRight className="visit-icon" />
            </button>
          </a>
        </div>
        <p className="details-job-description">{jobDescription}</p>
        <h1 className="skills-heading">Skills</h1>
        <ul className="skills-container">
          {skills.map(skill => (
            <li className="each-skill-item" key={skill.name}>
              <img
                src={skill.imageUrl}
                className="skills-images"
                alt={skill.name}
              />
              <p className="skills-names">{skill.name}</p>
            </li>
          ))}
        </ul>
        <h1 className="life-at-heading">Life at Company</h1>
        <div className="life-at-container">
          <div className="description-container">
            <p className="life-at-description">{lifeAtCompany.description}</p>
          </div>
          <img
            src={lifeAtCompany.imageUrl}
            alt="life at company"
            className="life-at-image"
          />
        </div>
      </div>
    )
  }

  renderSuccessTab = () => (
    <div className="job-details-container">
      {this.renderJobCard()}
      {this.renderSimilarJobs()}
    </div>
  )

  renderActiveTab = () => {
    const {activeTab} = this.state
    switch (activeTab) {
      case apiStatus.in_progress:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderSuccessTab()
      case apiStatus.failure:
        return this.renderFailureTab()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-section">{this.renderActiveTab()}</div>
      </>
    )
  }
}

export default JobDetails
