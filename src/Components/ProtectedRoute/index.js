import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({component: Component, ...restProps}) => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <Route
      {...restProps}
      render={props => <Component {...props} {...restProps} />}
    />
  )
}
export default ProtectedRoute
