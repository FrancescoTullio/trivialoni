import AppFooter from "../components/AppFooter";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";

function AppLayout() {
    return (
        <>
            <div>
                <AppHeader />
                <main>
                    <Outlet />
                </main>
                <AppFooter />
            </div>
        </>
    )
};

export default AppLayout;