import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'
import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = jobDetails
  return (
    <li className="each-similar-card">
      <div className="similar-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-company-logo"
        />
        <div>
          <h1 className="similar-company-title">{title}</h1>
          <div className="similar-rating-container">
            <AiFillStar className="similar-star-rating" />
            <p className="similar-company-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-description-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-location-role-container">
        <div className="similar-location-role">
          <MdLocationOn className="similar-location-role-icons" />
          <p className="similar-location-role-names">{location}</p>
        </div>
        <div className="similar-location-role">
          <MdBusinessCenter className="similar-location-role-icons" />
          <p className="similar-location-role-names">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
