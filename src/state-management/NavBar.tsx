import LoginStatus from "./auth/LoginStatus";
import useCounterStore from "./counter/store";

const NavBar = () => {
  const { counter } = useCounterStore();

  console.log("NavBar rendered");

  return (
    <nav className="navbar d-flex justify-content-between">
      <span className="badge text-bg-secondary">4</span>
      <LoginStatus />
    </nav>
  );
};

export default NavBar;
