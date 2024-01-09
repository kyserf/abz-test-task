import { Button } from "../Button/Button";
import PropTypes from 'prop-types';

export const Hero = ({ linkToSignUp }) => {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__text-container">
          <h1 className="hero__title">Test assignment for front-end developer</h1>
          <p className="hero__text">
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they&apos;ll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
          </p>
        </div>

        <Button text={"Sign up"} onClick={linkToSignUp} />
      </div>
    </section>
  )
}

Hero.propTypes = {
  linkToSignUp: PropTypes.func,
}