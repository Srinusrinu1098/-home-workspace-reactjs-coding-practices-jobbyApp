import {MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'
import {BsFillBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import SimilarJobsSection from '../SimilarJobsSection'
import './index.css'

const JobSpecified = props => {
  const {specificJob, lifeAtCompany, skills, similarJobs} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    packages,
    location,
    rating,
    title,
  } = specificJob

  return (
    <>
      <li className="listed-ones">
        <div className="img-item-flex">
          <img
            className="list-img"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div className="title-and-rating">
            <h1 className="title-heading">{title}</h1>
            <div className="rating">
              <FaStar style={{color: '#fbbf24'}} />
              <p className="rating-in-number">{rating}</p>
            </div>
          </div>
        </div>

        <div className="location-jobtype-package-con">
          <div className="location-and-role">
            <div className="location-con">
              <MdLocationOn style={{color: '#ffffff'}} />
              <p className="location">{location}</p>
            </div>
            <div className="job-type-con">
              <BsFillBriefcaseFill style={{color: '#ffffff'}} />
              <p className="job-type">{employmentType}</p>
            </div>
          </div>
          <div className="package-con">
            <p className="package">{packages}</p>
          </div>
        </div>

        <hr style={{margin: '0', padding: '0'}} />
        <div className="desc-and-visit-con">
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
          <a
            href={companyWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{textDecoration: 'none'}}
          >
            <div className="visit-con">
              <p style={{paddingRight: '4px'}}>Visit</p>
              <BsBoxArrowUpRight />
            </div>
          </a>
        </div>

        <p style={{color: '#ffffff'}}>{jobDescription}</p>
        <h1
          style={{
            color: '#ffffff',
            margin: '0',
            fontSize: '12px',
            paddingTop: '8px',
          }}
        >
          Skills
        </h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: '14px',
          }}
        >
          {skills.map(each => (
            <div
              key={each.toolsName}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginRight: '50px',
                marginBottom: '30px',
                alignItems: 'center',
                maxWidth: '100px',
              }}
            >
              <img
                src={each.image}
                alt={each.toolsName}
                style={{width: '50px'}}
              />
              <p
                style={{
                  color: '#ffffff',
                  fontSize: '8px',
                  paddingLeft: '6px',
                }}
              >
                {each.toolsName}
              </p>
            </div>
          ))}
        </div>

        <h1
          style={{
            color: '#ffffff',
            margin: '0',
            fontSize: '12px',
            paddingTop: '8px',
          }}
        >
          Life at Company
        </h1>
        <div className="life-at-company">
          <p
            style={{
              color: '#ffffff',
              margin: '0',
              fontSize: '12px',
              paddingTop: '8px',
            }}
          >
            {lifeAtCompany.description}
          </p>

          <img
            className="image"
            src={lifeAtCompany.imageUrl}
            alt="life at company"
          />
        </div>
      </li>

      <div>
        <h1
          style={{
            color: '#ffffff',
            margin: '0',
            fontSize: '12px',
            paddingTop: '8px',
            paddingLeft: '34px',
          }}
        >
          Similar jobs
        </h1>
        <ul className="ull">
          {similarJobs.map(each => (
            <SimilarJobsSection key={each.idInSimilar} value={each} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default JobSpecified
