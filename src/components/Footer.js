import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa";
const Footer = () => {
  const today = new Date();
  return (
    <footer className="Footer">
      <p className="copyright">Copyright &copy; {today.getFullYear()}</p>
      <div className="social-icons">
        <a href="/" target="_blank" className="social-icon">
          <FaFacebook className="social-icon-item" />
        </a>
        <a href="/" target="_blank" className="social-icon">
          <FaInstagram className="social-icon-item" />
        </a>
        <a href="/" target="_blank" className="social-icon">
          <FaTwitter className="social-icon-item" />
        </a>
        <a href="/" target="_blank" className="social-icon">
          <FaPinterest className="social-icon-item" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
