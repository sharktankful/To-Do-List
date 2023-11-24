const NavBar = () => {
    const handleSignOut = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand mx-auto text-danger" href="#" onClick={handleSignOut}>
          Sign Out
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
