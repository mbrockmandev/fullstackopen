const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  if (type === 'error') {
    return (
      <div className={type}>
        {type}: {message}
      </div>
    );
  } else if (type === 'success') {
    return (
      <div className={type}>
        {message} - {type}
      </div>
    );
  } else {
    return null;
  }
};

export default Notification;
