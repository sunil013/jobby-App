import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {MdBusinessCenter} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <div className="mobile-header-icons-container">
          <li className="mobile-list-icons">
            <Link to="/" className="header-links">
              <AiFillHome className="mobile-header-icons" />
            </Link>
          </li>
          <li className="mobile-list-icons">
            <Link to="/jobs" className="header-links">
              <MdBusinessCenter className="mobile-header-icons" />
            </Link>
          </li>
          <li className="mobile-list-icons">
            <FiLogOut className="mobile-header-icons" onClick={onClickLogout} />
          </li>
        </div>
        <ul className="desktop-header-text-list">
          <li className="desktop-header-links">
            <Link to="/" className="header-links">
              Home
            </Link>
          </li>
          <li className="desktop-header-links">
            <Link to="/jobs" className="header-links">
              Jobs
            </Link>
          </li>
        </ul>
        <button className="header-button" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
