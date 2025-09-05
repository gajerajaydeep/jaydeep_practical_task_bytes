import { Outlet } from "react-router-dom"
import Header from "../components/layout/Header"

const PageLayout = () => {
    return (
        <>
            <div className="flex flex-col  w-full flex-1 h-screen bg-[#eee8f6] py-2">
                <div className="w-full fixed top-1 z-50">
                    <Header />
                </div>
                <main className="flex-1  mx-6 mt-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default PageLayout
