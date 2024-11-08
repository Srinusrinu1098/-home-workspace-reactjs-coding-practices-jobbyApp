import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'
import JobItems from '../JobItems'
import './index.css'

const profileStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profile: {},
    empType: [],
    salary: '',
    dummyRole: '',
    roles: '',
    profileApiStatus: profileStatus.initial,
  }

  componentDidMount = () => {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({profileApiStatus: profileStatus.progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(response.ok)

      if (response.ok) {
        const updatedData = {
          name: data.profile_details.name,
          image: data.profile_details.profile_image_url,
          bio: data.profile_details.short_bio,
        }
        this.setState({
          profile: updatedData,
          profileApiStatus: profileStatus.success,
        })
      } else {
        this.setState({profileApiStatus: profileStatus.failure})
      }
    } catch (e) {
      this.setState({profileApiStatus: profileStatus.failure})
    }
  }

  inputValueRecive = value => {
    this.setState(prevState => ({empType: [...prevState.empType, value]}))
  }

  inputValueRemove = value => {
    const {empType} = this.state
    const removed = empType.filter(each => value !== each)
    this.setState({empType: removed})
  }

  changeTheRadio = value => {
    this.setState({salary: value})
  }

  searchEngine = event => {
    this.setState({dummyRole: event.target.value})
  }

  search = () => {
    const {dummyRole} = this.state
    this.setState({roles: dummyRole})
  }

  profileRetry = () => {
    this.getProfile()
  }

  renderProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {profile} = this.state
    return <Profile value={profile} />
  }

  renderFailure = () => (
    <div className="retry-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.profileRetry}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {empType, salary, roles, profileApiStatus} = this.state
    const {value1, value2} = this.props
    console.log(value1)
    let content

    switch (profileApiStatus) {
      case profileStatus.progress:
        content = this.renderProgress()
        break
      case profileStatus.success:
        content = this.renderSuccess()
        break
      case profileStatus.failure:
        content = this.renderFailure()
        break
      default:
        break
    }

    return (
      <>
        <Header />
        <div className="main-bg-container">
          <div>
            <div className="input-style">
              <input
                type="search"
                placeholder="search"
                onChange={this.searchEngine}
                className="sm-input"
              />
              <div className="icon-style">
                <BsSearch onClick={this.search} />
              </div>
            </div>
            {content}
            <h1 className="employment-types">Type of employment</h1>
            <ul className="employment-list">
              {value1.map(each => (
                <EmploymentType
                  key={each.employmentTypeId}
                  values={each}
                  inputValueRecive={this.inputValueRecive}
                  inputValueRemove={this.inputValueRemove}
                />
              ))}
            </ul>
            <hr className="profile-hr" />
            <h1 className="employment-types">Salary Range</h1>
            <ul className="employment-list">
              {value2.map(each => (
                <SalaryRange
                  key={each.salaryRangeId}
                  values1={each}
                  changeTheRadio={this.changeTheRadio}
                />
              ))}
            </ul>
          </div>
          <div className="job-item-div">
            <JobItems empType={empType} salary={salary} roles={roles} />
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
