import Logo from '../../../public/images/Logo.svg';
import { Button } from '../Button/Button';
import PropTypes from 'prop-types';

export const Header = ({ linkToUsers, linkToSignUp }) => {
  return (
    <header className="header">
      <div className="header__logo_container">
        <img src={Logo} alt="logo" className="header__logo" />
      </div>

      <div className="header__button_container">
        <Button className="header__button" text={"Users"} onClick={linkToUsers} />
        <Button className="header__button" text={"Sign up"} onClick={linkToSignUp} />
      </div>
    </header>
  )
}

Header.propTypes = {
  linkToUsers: PropTypes.func,
  linkToSignUp: PropTypes.func,
}