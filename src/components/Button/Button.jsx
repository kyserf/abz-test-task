import PropTypes from 'prop-types';

export const Button = ({ text, isActive, type, onClick }) => {
  return (
    <>
      {type === "registration" ? (
        <button 
          className={`button ${isActive ? '' : 'button__disabled'}`}
          disabled={!isActive}
          onClick={onClick}
        >
          {text}
        </button>
      ) : (
        <button 
          className={`button`}
          onClick={onClick}
        >
          {text}
        </button>
      )}
    </>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
};