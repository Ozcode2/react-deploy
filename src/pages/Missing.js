import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div className="Missing">
      <h2>404 - Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>
        <Link to="/react-deploy">Visit Our Homepage</Link>
      </p>
    </div>
  );
};

export default Missing;
