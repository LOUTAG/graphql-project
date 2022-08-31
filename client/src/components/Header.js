import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { useState} from "react";
import { AiOutlineUser, AiOutlinePlusSquare, AiOutlineLogout } from "react-icons/ai";
const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth]=useState(localStorage.getItem('userAuth')? true : false)
  const menu = [
    {
      name: "Posts",
      path: "/posts",
    },
    {
      name: "teach",
      path: "/teach",
    },
    {
      name: "discover",
      path: "/discover",
    },
  ];
  const onLogoutClick =()=>{
    localStorage.removeItem('userAuth');
    setAuth(false);
    navigate('/')
  }
  const renderMenu = () => {
    return menu.map((item) => {
      return (
        <li
          key={uuidv4()}
          className={`${
            window.location.pathname === item.path
              ? "text-white"
              : "text-gray-400 hover:text-white"
          } font-semibold pr-2`}
        >
          <Link to={item.path}>{item.name}</Link>
        </li>
      );
    });
  };
  return (
    <div className="fixed z-20 inset-x-0 top-0 flex justify-between items-center text-lg py-4 px-4  h-[3.125rem] bg-black">
      <div className="left-content flex items-center justify-start">
        <div className="uppercase text-xl tracking-wide font-bold text-white pr-2">
          <Link to="/">the blog</Link>
        </div>
        <nav>
          <ul className="flex items-center flex-wrap justify-start">
            {renderMenu()}
          </ul>
        </nav>
      </div>
      <div className="right-content flex items-center justify-end">
        <Link to="/addpost" className="text-gray-400 hover:text-white mr-2">
          <AiOutlinePlusSquare size={24} />
        </Link>
        {!auth ? (
          <Link to="/login" className="text-gray-400 hover:text-white">
            <AiOutlineUser size={24} />
          </Link>
        ) : (
          <button className="text-gray-400 hover:text-white" onClick={()=>onLogoutClick()}>
            <AiOutlineLogout size={24} />
          </button>
        )}
      </div>
    </div>
  );
};
export default Header;
