import AppFooter from "../components/AppFooter";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";

function AppLayout() {
  return (
    <>
      <div>
        <AppHeader />
        <main>
          <div className="container">
            <Outlet />
          </div>
        </main>
        <AppFooter />
      </div>
    </>
  );
}

export default AppLayout;
