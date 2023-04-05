import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  }, [notification, dispatch]);

  if (notification !== '') {
    return <div style={style}>{notification}</div>;
  } else {
    return null;
  }
};

export default Notification;
