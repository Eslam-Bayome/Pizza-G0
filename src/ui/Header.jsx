import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="flex flex-col items-center justify-between  gap-4 border-b border-stone-300 bg-yellow-500 px-5 py-3 uppercase sm:flex-row sm:gap-0 sm:px-6">
      <Link to="/" className="tracking-widest">
        Pizza G0
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
