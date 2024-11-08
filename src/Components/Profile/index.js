import './index.css'

const Profile = props => {
  const {value} = props
  const {name, image, bio} = value

  return (
    <>
      <div className="profile-container">
        <img className="profile-image" src={image} alt="profile" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-bio">{bio}</p>
      </div>
      <hr className="profile-hr" />
    </>
  )
}

export default Profile
