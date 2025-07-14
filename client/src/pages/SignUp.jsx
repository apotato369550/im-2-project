import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroFill from "../assets/images/heroFill.png";
import { Mail, KeyRound, Eye, EyeOff, Home as HomeIcon, User } from "lucide-react";
import axios from 'axios';

export default function SignUp() {
  const [formData, setFormData] = useState({
    user_email: "",
    user_password: "",
    first_name: "",
    last_name: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkSame, setCheckSame] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user_full_name = `${formData.first_name} ${formData.last_name}`.trim();

    if(formData.user_password != formData.confirmPassword){
      setCheckSame('Passwords do not match!');
    }else{
      setCheckSame('')
      const dataToSend = {
      ...formData,
      user_full_name,
      user_type: 'client'
      };
      
      axios.post('http://localhost/im-2-project/api/users/register', dataToSend)
      .then((response)=>{
        if(response.status = 200){
          setTimeout(()=>{
            setRegisterSuccess('Registered successfully');
          }, 2000)
          console.log(response.status);
          navigate("/login");
        }else{
          setRegisterSuccess('Something went wrong try again');
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  };

  return (
    <div className="min-h-screen bg-white flex relative">
      <Link
        to="/"
        className="absolute top-6 right-6 z-50 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
        title="Go to Home"
      >
        <HomeIcon size={28} color="#93C5FD" />
      </Link>
      <div className="w-2/5 h-screen relative">
        <div className="bg-transparent relative overflow-hidden h-full shadow-none flex items-end">
          <img src={heroFill} alt="#" className="object-cover w-full h-full rounded-br-[60px] rounded-tr-[60px] shadow-none border-0 outline-none opacity-90" />
          {/* Navigation divs */}
          <div className="absolute inset-0 flex flex-col items-end justify-end pb-60">
            <Link to={"/login"}>
              <div className="px-16 py-4 rounded-tl-full rounded-bl-full w-60 flex items-center justify-center hover:bg-white/20">
                <p className="font-alegreya-sans-sc text-white text-3xl font-bold drop-shadow-lg">Login</p>
              </div>
            </Link>
            <div className="relative w-10 h-10">
              <b className="bg-white h-10 w-10 absolute top-0 left-0 z-0 block"></b>
              <b className="bg-cbvt-sky h-10 w-10 absolute top-0 left-0 z-20 block rounded-br-4xl opacity-90"></b>
            </div>
            <div className="bg-white px-16 py-4 rounded-tl-full rounded-bl-full w-60 flex items-center justify-center">
              <p className="font-alegreya-sans-sc text-cbvt-blue text-3xl font-bold drop-shadow-lg">SIGN UP</p>
            </div>
            <div className="relative w-10 h-10">
              <b className="bg-white h-10 w-10 absolute top-0 left-0 z-0 block"></b>
              <b className="bg-cbvt-sky h-10 w-10 absolute top-0 left-0 z-20 block rounded-tr-4xl opacity-90"></b>
            </div>
          </div>
        </div>
      </div>
      {/* Right Side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-xl space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-khand font-bold text-cbvt-blue text-center capitalize leading-tight">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                name="user_email"
                placeholder="email"
                value={formData.user_email}
                onChange={handleInputChange}
                className="w-full h-[59px] px-16 py-4 bg-gray-200 rounded-full text-[21px] font-carme text-cbvt-navy placeholder-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
              />
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                <Mail size={20} color="gray" />
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  name="first_name"
                  placeholder="first name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="w-full h-[59px] px-16 py-4 bg-gray-200 rounded-full text-[21px] font-carme text-cbvt-navy placeholder-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                />
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                  <User size={20} color="gray" />
                </div>
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  name="last_name"
                  placeholder="last name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full h-[59px] px-16 py-4 bg-gray-200 rounded-full text-[21px] font-carme text-cbvt-navy placeholder-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
                />
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                  <User size={20} color="gray" />
                </div>
              </div>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="user_password"
                placeholder="password"
                value={formData.user_password}
                onChange={handleInputChange}
                className="w-full h-[59px] px-16 py-4 bg-gray-200 rounded-full text-[21px] font-carme text-cbvt-navy placeholder-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
              />
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                <KeyRound size={20} color="gray" />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff color="gray" size={20} />
                ) : (
                  <Eye color="gray" size={20} />
                )}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full h-[59px] px-16 py-4 bg-gray-200 rounded-full text-[21px] font-carme text-cbvt-navy placeholder-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-cbvt-blue"
              />
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                <KeyRound size={20} color="gray" />
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-6 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <EyeOff color="gray" size={20} />
                ) : (
                  <Eye color="gray" size={20} />
                )}
              </button>
            </div>
            {/* Error message */}
            {checkSame && (
              <p className="text-red-500 text-sm text-center p-0 m-0">
                {checkSame}
              </p>
            )}
            <button
              type="submit"
              className="w-full h-[50px] bg-cbvt-blue hover:scale-105 text-white rounded-full text-[24px] font-khand font-medium transition-all shadow-lg duration-300 ease-in-out mt-8"
            >
              Sign Up
            </button>
          </form>
          {registerSuccess && (
              <p className="text-green-500 text-sm text-center p-0 m-0">
                {registerSuccess}
              </p>
            )}

          {/* Login link for mobile */}
          <div className="lg:hidden text-center">
            <span className="text-cbvt-gray">Already have an account? </span>
            <Link
              to="/login"
              className="text-cbvt-blue font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}