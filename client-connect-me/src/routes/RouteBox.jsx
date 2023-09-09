import { Route, Routes } from "react-router-dom";

import { Home } from "../PagesOfRoutes/Home/Home";
import { Error } from "../pages/Error/Error";
import { Signup } from "../pages/Signup/Signup";
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
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};
