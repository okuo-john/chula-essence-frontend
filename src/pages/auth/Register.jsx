import chulaLogo from "../../assets/logos/chula-essence-logo.png"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import api from "../../services/api";
import { toast } from "react-toastify";

function Register() {

 const navigate = useNavigate();

 const [formData, setFormData] = useState({
   fullname: "",
   email: "",
   phoneNumber: "",
   password: "",
 });

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/register", formData);
      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Registration successful");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full flex justify-center items-center">
      <div className="max-w-6xl bg-white shadow rounded-md px-4 ">
        <div className="flex justify-center items-center mx-4">
          <div className="">
            <Link to="/" className="shrink-0 flex justify-center">
              <img
                src={chulaLogo}
                alt="Chula Essence"
                className="w-26.25 h-auto"
              />
            </Link>
            <div className="my-6">
              <h2 className="font-bold">Create Account</h2>

              <form onSubmit={handleSubmit} className="flex flex-col my-5 gap-3 w-70">

                <div className="md:col-span-2">
                  <label htmlFor="fullname" className="mb-1 block text-sm font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Your full name"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full rounded border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#ff68aa] " />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="fullName" className="mb-1 block text-sm font-semibold text-slate-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#ff68aa] " />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="phoneNumber" className="mb-1 block text-sm font-semibold text-slate-700">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="0701 2345 6789"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full rounded border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#ff68aa] " />
                </div>

                 <div className="md:col-span-2 relative">
                  <label htmlFor="password" className="mb-1 block text-sm font-semibold text-slate-700">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="* * * * * * *"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition placeholder:text-slate-400 placeholder:font-bold focus:border-[#ff68aa] " />
                    

                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-11 -translate-y-1/2"
                    >
                      {showPassword ? <Eye className="h-4 w-4"/> : <EyeClosed className="h-4 w-4 "/>}
                    </button>
                </div>

                <button 
                className="mt-8 w-full rounded-xl bg-primary-pink px-5 py-3.5 font-semibold text-white shadow-sm transition hover:bg-pink-400 active:scale-[0.99] cursor-pointer"
                disabled={loading}
                type="submit"
                >
                  {loading ? "Registering..." : "Create Account"}
                  </button>

              </form>

              <h3 className="font-semibold text-center">Already have an account? <Link to="/login" className="text-pink-400 underline">Login</Link></h3>
            </div>
          </div>

        </div>


      </div>
    </main>
  );
}

export default Register;