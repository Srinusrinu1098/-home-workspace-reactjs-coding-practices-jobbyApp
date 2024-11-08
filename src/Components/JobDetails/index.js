import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import JobSpecified from '../JobSpecified'
import Header from '../Header'
import './index.css'

const similarStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    specificJob: {},
    lifeAtCompany: {},
    skills: [],
    similarJobs: [],
    similarApiStatus: similarStatus.initial,
  }

  componentDidMount = () => {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({similarApiStatus: similarStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('Token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        const updatedListOfJobDetails = {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          jobDescription: data.job_details.job_description,
          location: data.job_details.location,
          packages: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          title: data.job_details.title,
        }
        const updatedListOfJobDetailsLifeAtCompany = {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        }

        const updatedSkills = data.job_details.skills.map(each => ({
          image: each.image_url,
          toolsName: each.name,
        }))

        const updateSimilarJobs = data.similar_jobs.map(each => ({
          similarCompanyLogoUrl: each.company_logo_url,
          employmentTypeInSimilar: each.employment_type,
          jobDescriptionInSimilar: each.job_description,
          locationInSimilar: each.location,
          ratingInSimilar: each.rating,
          titleInSimilar: each.title,
          idInSimilar: each.id,
        }))
        this.setState({
          specificJob: updatedListOfJobDetails,
          lifeAtCompany: updatedListOfJobDetailsLifeAtCompany,
          skills: updatedSkills,
          similarJobs: updateSimilarJobs,
          similarApiStatus: similarStatus.success,
        })
      } else {
        this.setState({similarApiStatus: similarStatus.failure})
      }
    } catch (e) {
      this.setState({similarApiStatus: similarStatus.failure})
    }
  }

  retryButton = () => {
    this.getDetails()
  }

  renderProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {specificJob, lifeAtCompany, skills, similarJobs} = this.state
    return (
      <JobSpecified
        specificJob={specificJob}
        lifeAtCompany={lifeAtCompany}
        skills={skills}
        similarJobs={similarJobs}
      />
    )
  }

  renderFailure = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="retry-button" type="button" onClick={this.retryButton}>
        Retry
      </button>
    </div>
  )

  render() {
    const {similarApiStatus} = this.state

    let content

    switch (similarApiStatus) {
      case similarStatus.progress:
        content = this.renderProgress()
        break
      case similarStatus.success:
        content = this.renderSuccess()
        break
      case similarStatus.failure:
        content = this.renderFailure()
        break
      default:
        break
    }
    return (
      <div className="job-specified-main-con">
        <Header />
        {content}
      </div>
    )
  }
}

export default JobDetails
