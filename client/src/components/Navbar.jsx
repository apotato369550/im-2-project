import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa';
import { LogOut } from 'lucide-react';
import { jwtDecode } from 'jwt-decode'  

const Navbar = () => {
const [user, setUser] = useState(null)
const [userImage, setUserImage] = useState(null)
const navigate = useNavigate();
  useEffect(()=>{
    const userData = localStorage.getItem('user_data');
    if(userData){
      try{
        const parsed= JSON.parse(userData);
        console.log(parsed)
        const firstName = parsed.user_full_name.split(" ")[0];
        const decodedToken = jwtDecode(parsed.token);

        if(decodedToken.exp * 1000 < Date.now()){
          console.log("Token expired");
          localStorage.removeItem('user_data');
          setUser(null);  
          setUserImage(null);
        }else{
          setUser(firstName);
          setUserImage(`http://localhost/im-2-project/${parsed.image_path.replace(/^(\.\.\/)+/, '')}` || null);
        }
      }catch(err){
        console.error("Invalid token:", err);
        localStorage.removeItem('user_data');
        setUser(null);
        setUserImage(null);
      }
    }
  }, []);

  const handleLogout = (e)=>{
    localStorage.removeItem("user_data");
    setUser(null);
    setUserImage(null);
    navigate("/");
  }
  return (
    <>
    <div className=" bg-white flex justify-center">
      <nav className="container mx-auto px-12  py-8 mt-4">
        <div className="flex items-center justify-between">
            <Link to="/">
              <h1 className="text-5xl font-khand font-bold capitalize text-cbvt-navy hover:text-cbvt-blue transition-colors">Cebu Best Value Trading</h1>
            </Link>
          <div className="links flex flex-row space-x-18">
            <Link to="/about" className="text-xl text-cbvt-navy font-alegreya-sans-sc capitalize hover:text-cbvt-blue transition-colors self-center cursor-pointer duration-300">
              about
            </Link>
            <Link to="/contact" className="text-xl text-cbvt-navy font-alegreya-sans-sc capitalize hover:text-cbvt-blue transition-colors self-center">
              contact us
            </Link>
            <Link to="/catalog" className="text-xl text-cbvt-navy font-alegreya-sans-sc capitalize hover:text-cbvt-blue transition-colors self-center">
              catalog
            </Link>
             {user ? (
              <div className="flex items-center space-x-2 text-cbvt-navy">
                <Link to="/clientdashboard">
                  {userImage ? (
                    <img 
                      src={userImage} 
                      alt="User profile" 
                      className="w-8 h-8 rounded-full object-cover border-2 border-cbvt-navy"
                    />
                  ) : (
                    <FaUserCircle className="text-3xl" />
                  )}
                </Link>
                <span className="flex gap-5 text-xl font-alegreya-sans-sc capitalize cursor-pointer">
                  <Link to="/clientdashboard">
                    {user}
                  </Link>
                  
                    <LogOut className='cursor-pointer' onClick={handleLogout}/>
                </span>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-cbvt-navy px-11 py-2 text-white rounded-full capitalize font-alegreya-sans-sc text-xl transition-transform duration-300 hover:scale-105"
              >
                login
                
              </Link>
            )}
               
          </div>
        </div>
      </nav>
    </div>
    </>
  )
}

export default Navbar;