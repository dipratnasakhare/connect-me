import { Route, Routes } from "react-router-dom";

import { Home } from "../PagesOfRoutes/Home/Home";
import { Error } from "../pages/Error/Error";
import { SignUpPage } from "../pages/Login/SignUpBox/SignUpBox";
import { LoginPage } from "../pages/Login/LoginBox/LoginBox";
import { Trending } from "../PagesOfRoutes/Trending/Trending";
import { Settings } from "../PagesOfRoutes/Settings/Settings";
import { Explore } from "../PagesOfRoutes/Explore/Explore";
import { Favourites } from "../PagesOfRoutes/Favourites/Favourites";

export const RouteBox = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};
