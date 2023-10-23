
const Header = ({ title }) => {

  return (
    <header className="Header">
      <h1>{title}</h1>
      <img className="pic" src="/icons.png" />
    </header>
  );
};

export default Header;
