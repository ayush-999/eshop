import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-primary-600">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex">
          <ul className="flex h-11 flex-row items-center font-semibold mx-auto mt-0 text-sm gap-7">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.url}
                  className={`text-white p-3 hover:bg-primary-700 ${location.pathname === item.url ? 'bg-primary-700' : ''}`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
