import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    title,
    companyLogoUrl,
    rating,
    id,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="job-card-link">
      <li className="job-card-container">
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="company-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-rating" />
              <p className="company-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="salary-location-container">
          <div className="location-role-container">
            <div className="location-role">
              <MdLocationOn className="location-role-icons" />
              <p className="location-role-names">{location}</p>
            </div>
            <div className="location-role-container">
              <MdBusinessCenter className="location-role-icons" />
              <p className="location-role-names">{employmentType}</p>
            </div>
          </div>
          <p className="company-package">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
