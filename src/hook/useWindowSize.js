import React from 'react';
import _ from 'lodash'
/**
 * Description:
 *      this hook will add a resize listener and automatically delete it when parent unmount
 *
 * @return {object} return windowSize
 * @author lun7
 */
export default function useWindowSize(
  callback = () => {},
  throttleTimeout = 1000
) {
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleWindowSizeChange = _.throttle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, throttleTimeout);

  React.useEffect(() => {
    callback(windowSize);
  }, [windowSize]);

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      handleWindowSizeChange();
    });
    return () => {
      window.removeEventListener('resize', () => {
        handleWindowSizeChange();
      });
    };
  }, []);
  return windowSize;
}
