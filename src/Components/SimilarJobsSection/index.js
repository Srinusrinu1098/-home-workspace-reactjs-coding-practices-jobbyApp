import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobsSection = props => {
  const {value} = props
  const {
    similarCompanyLogoUrl,
    employmentTypeInSimilar,
    jobDescriptionInSimilar,
    locationInSimilar,
    ratingInSimilar,
    titleInSimilar,
  } = value

  return (
    <li className="listed-ones">
      <div className="img-item-flex">
        <img
          src={similarCompanyLogoUrl}
          alt="similar job company logo"
          className="list-img"
        />
        <div className="title-and-rating">
          <h1 className="title-heading">{titleInSimilar}</h1>
          <div className="rating">
            <FaStar style={{color: '#fbbf24'}} />
            <p className="rating-in-number">{ratingInSimilar}</p>
          </div>
        </div>
      </div>
      <h1
        style={{
          color: '#ffffff',
          margin: '0',
          fontSize: '12px',
          paddingTop: '8px',
        }}
      >
        Description
      </h1>
      <p
        style={{
          color: '#ffffff',
          margin: '0',
          fontSize: '12px',
          paddingTop: '8px',
        }}
      >
        {jobDescriptionInSimilar}
      </p>
      <div className="location-job-type-package-con">
        <div className="location-and-role">
          <div className="location-con">
            <MdLocationOn style={{color: '#ffffff'}} />
            <p className="location">{locationInSimilar}</p>
          </div>
          <div className="job-type-con">
            <BsFillBriefcaseFill style={{color: '#ffffff'}} />
            <p className="job-type">{employmentTypeInSimilar}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobsSection
