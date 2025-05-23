import { CakeSlice, Heart, List, Wallet } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-border h-16 flex items-center shadow-lg">
      <NavLink
        to="/milestones"
        className={`nav-item ${
          location.pathname === "/milestones" ? "active" : ""
        }`}
      >
        <Heart
          className={`h-6 w-6 ${
            location.pathname === "/milestones"
              ? "text-love-400 animate-pulse-heart"
              : ""
          }`}
        />
        <span className="text-xs mt-1">Cột mốc</span>
      </NavLink>

      <NavLink
        to="/restaurants"
        className={`nav-item ${
          location.pathname === "/restaurants" ? "active" : ""
        }`}
      >
        <CakeSlice
          className={`h-6 w-6 ${
            location.pathname === "/restaurants" ? "text-love-400" : ""
          }`}
        />
        <span className="text-xs mt-1">Quán ăn</span>
      </NavLink>

      <NavLink
        to="/todos"
        className={`nav-item ${location.pathname === "/todos" ? "active" : ""}`}
      >
        <List
          className={`h-6 w-6 ${
            location.pathname === "/todos" ? "text-love-400" : ""
          }`}
        />
        <span className="text-xs mt-1">Todo</span>
      </NavLink>
      <NavLink
        to="/expenses"
        className={`nav-item ${
          location.pathname === "/expenses" ? "active" : ""
        }`}
      >
        <Wallet
          className={`h-6 w-6 ${
            location.pathname === "/expenses" ? "text-love-400" : ""
          }`}
        />
        <span className="text-xs mt-1">Chi tiêu</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;
