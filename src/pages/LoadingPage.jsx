import dipperRunning from "../assets/img/dipper_running.gif";
import "../styles/LoadingPage.scss";

function LoadingPage() {
  return (
    <div className="loadingPage">
      <img src={dipperRunning} alt="Running Dipper" />
      <p>Loaing...</p>
    </div>
  );
}

export default LoadingPage;
