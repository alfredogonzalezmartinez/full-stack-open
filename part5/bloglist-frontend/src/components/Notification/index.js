import "./Notification.css"

const Notification = ({ errorStatus }) => {
  if (errorStatus === null) return null;

  const { isError, message } = errorStatus;

  return (
    <section className={`${isError ? "error" : "success"} notification`}>
      <p> {message} </p>
    </section>
  );
};

export default Notification;
