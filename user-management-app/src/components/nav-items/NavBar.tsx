import { navItems } from '../../utils/navitems'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
      <div className='flex '>
        {
          navItems.map((item) => {
            return (
              
                <Link key={item.id}  to={item.path} className='mx-2  py-2 md:px-1 md:py-4 font-medium '><span className='flex md:gap-2 hover:border-b'> <img src={item.icon} alt={item.label} width={24} height={24} /><span className='hidden md:flex'>{item.label}</span></span></Link>
            
            )
          })
        }
      </div>
    </>
  )
}

export default NavBar