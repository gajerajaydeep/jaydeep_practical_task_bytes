import { Link } from "react-router-dom"
import { Images } from "../../assets"
import NavBar from "../nav-items/NavBar"

const Header = () => {
  return (
    <>
      <div className='container flex justify-between items-center rounded-full shadow-xl px-3 md:px-5 md:py-2 bg-[#F9F9FC]  '>
        {/* logo section */}
        <Link to="/">
          <div className="header-left flex justify-center items-center gap-2">
              <img src={Images.company_logo} alt="company logo" width={50} height={50} className="w-[20px] md:w-[50px]"/>
              <p className="hidden md:flex text-2xl font-bold">User Management System</p>
          
          </div>
        </Link>

        {/* navigation menu */}
        <NavBar />
      </div >
    </>
  )
}

export default Header