import { useDispatch, useSelector } from 'react-redux';
import { show, hide } from '../reducers/NotificationReducer';
import { useEffect } from 'react';

const Notification = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.notification.visible);
  const message = useSelector((state) => state.notification.message);
  const duration = useSelector((state) => state.notification.duration);

  useEffect(() => {
    if (message !== '') {
      dispatch(show({ message, isVisible, duration }));
      const timerId = setTimeout(() => {
        dispatch(hide());
      }, duration);
      console.log('use effect');
      return () => clearTimeout(timerId);
    }
  }, [dispatch, isVisible, message, duration]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (message === '') return null;

  return isVisible && <div style={style}>{message}</div>;
};

export default Notification;
