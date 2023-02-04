const generateBtnStroke = ({
  borderColor = 'transparent',
  opacity = '0.38',
  borderWidth = '1px',
}) => {
  return {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '0px',
      left: '0px',
      right: '0px',
      bottom: '0px',
      border: `${borderWidth} solid`,
      borderRadius: 'inherit',
      pointerEvents: 'none',
      borderColor: borderColor,
      transition: 'all 0.35s ease-in-out',
      opacity: opacity,
    },
  };
};

module.exports = {
  generateBtnStroke,
};
