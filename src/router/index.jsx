import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import List from "../pages/List.jsx";
import BasicUserList from "../examples/BasicUserList.jsx";
import ReduxUser from "../examples/ReduxUser.jsx";
import RQUserList from "../examples/RQUserList.jsx";
import TrendList from "../pages/List.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Main routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/basic" element={<BasicUserList />} />
      <Route path="/redux" element={<ReduxUser />} />
      <Route path="/list" element={<RQUserList />} />
      <Route path="/list1" element={<TrendList />} />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
