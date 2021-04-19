import PropTypes from 'prop-types';
import FA from 'react-fontawesome';

const Ribbon = ({ type, className, icon, text, cutSide, containerProps, isWide, showText }) => (
  <div
    className={`ribbon-outer-container-cut-${cutSide} ${isWide ? 'ribbon-wide' : ''} ${className}`}
    {...containerProps}
  >
    <div className={`ribbon ribbon-${type} ribbon-cut-${cutSide}`}>
      <FA name={icon} />
      {
        showText &&
      <span className="text">{text}</span>
      }
    </div>
  </div>
);


Ribbon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
  containerProps: PropTypes.shape({}),
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'success', 'cn', 'htf', 'snd']),
  cutSide: PropTypes.oneOf(['left', 'right', 'both']),
  isWide: PropTypes.bool,
  showText: PropTypes.bool,
};

Ribbon.defaultProps = {
  className: '',
  icon: 'handshake',
  text: '',
  containerProps: {},
  type: 'primary',
  cutSide: 'left',
  isWide: false,
  showText: true,
};

export default Ribbon;
