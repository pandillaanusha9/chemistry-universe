import { Outlet, Route, Routes } from "react-router-dom";
import AppShell from "../../organic-chemistry-visualizer/src/components/layout/AppShell.jsx";
import HomePage from "../../organic-chemistry-visualizer/src/pages/HomePage.jsx";
import CategoryPage from "../../organic-chemistry-visualizer/src/pages/CategoryPage.jsx";

function OrganicRoutesShell() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

export default function OrganicPlatform() {
  return (
    <Routes>
      <Route element={<OrganicRoutesShell />}>
        <Route index element={<HomePage />} />
        <Route path=":categorySlug" element={<CategoryPage />} />
      </Route>
    </Routes>
  );
}
