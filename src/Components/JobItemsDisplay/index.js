import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import './index.css'

const JobItemsDisplay = props => {
  const {value} = props
  const {
    id,
    companyImage,
    description,
    employmentType,
    location,
    packages,
    title,
    rating,
  } = value

  return (
    <Link to={`/jobs/${id}`} className="job-link">
      <li className="listed-ones">
        <div className="img-item-flex">
          <img src={companyImage} alt="company logo" className="list-img" />
          <div className="title-and-rating">
            <h1 className="title-heading">{title}</h1>
            <div className="rating">
              <FaStar className="star-icon" />
              <p className="rating-number">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-job-type-package-con">
          <div className="location-and-role">
            <div className="location-con">
              <MdLocationOn className="icon" />
              <p className="location">{location}</p>
            </div>
            <div className="job-type-con">
              <BsFillBriefcaseFill className="icon" />
              <p className="job-type">{employmentType}</p>
            </div>
          </div>
          <div className="package-con">
            <p className="package">{packages}</p>
          </div>
        </div>
        <hr className="separator" />
        <h1 className="description-title">Description</h1>
        <p className="description">{description}</p>
      </li>
    </Link>
  )
}

export default JobItemsDisplay
