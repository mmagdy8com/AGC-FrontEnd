import "./Design/InfoMessage.css";

const InfoMessage = ({ text = "Something went wrong!" }) => {
  return (
    <div className="infoMessage">
      <h5>{text}</h5>
    </div>
  );
};

export default InfoMessage;
