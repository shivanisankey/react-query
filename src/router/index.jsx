import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import List from "../pages/List.jsx";
import BasicUserList from "../examples/BasicUserList.jsx";
import ReduxUser from "../examples/ReduxUser.jsx";
import ProductsList from "../examples/ProductsList.jsx";
import TrendList from "../pages/List.jsx";
import Paginated from "../pages/Paginated.jsx";
import Parallel from "../pages/Parallel.jsx";
import Dependant from "../pages/Dependent.jsx";
import Optimistic from "../pages/optimistic.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Main routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/basic" element={<BasicUserList />} />
      <Route path="/redux" element={<ReduxUser />} />
      <Route path="/list" element={<ProductsList />} />
      <Route path="/pagination" element={<Paginated />} />
      <Route path="/parallel" element={<Parallel />} />
      <Route path="/dependent" element={<Dependant />} />
      <Route path="/optimistic" element={<Optimistic />} />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
