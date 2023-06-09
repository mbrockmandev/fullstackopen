const Notification = ({ message, type }) => {
  if (type === 'error') {
    return (
      <div>
        {type}: {message}
      </div>
    );
  } else if (type === 'success') {
    return (
      <div>
        {message} - {type}
      </div>
    );
  } else {
    return null;
  }
};

export default Notification;
