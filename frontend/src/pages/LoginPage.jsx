import { useState } from "react";
import { Link } from "react-router-dom";
import { ShipWheelIcon } from "lucide-react";
import useLogin from "../hooks/useLogin";
import React from "react";
import { useNavigate } from "react-router-dom"; 
import useAuthUser from "../hooks/useAuthUser";
import { toast } from "react-hot-toast";
const LoginPage = () => {
  //without using custon hook
// const queryClient = useQueryClient();
//   const { mutate:loginMutation, isPending, error } = useMutation({
//     mutationFn: login,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
//   });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
const { refetch } = useAuthUser();
  const { isPending, error, loginMutation } = useLogin();//uselogin fxn se ye values leni h
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    
       e.preventDefault();
    await loginMutation(loginData, {
    onSuccess: async () => {
      const result = await refetch();
      const user = result?.data?.user;

      if (user?.isOnboarded) {
        navigate("/");
      } else {
        navigate("/onboarding");
      }

      toast.success("Login Successful");
    },
   onError: (error) => {
 console.error("Login failed:", error);
      toast.error(error?.response?.data?.message || "Invalid email or password");
  },})}
    
    
    

  return (
    <div className="" style={{backgroundColor:"#506040"}}>
     <h1 style={{marginLeft:"490px",paddingTop:"50px",color:"white",fontSize:"300%"}}>LOGIN PAGE</h1>
     {/* <i classname="bi bi-bell-fill"></i> */}
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center  py-4" style={{backgroundColor:"#506040",marginBottom:"500px"}}>
       
      <div className="row w-100 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: "1000px", backgroundColor: "#5b9023 ",color:"black" }}>
        
        {/* Left Side - Form */}
        <div className="col-lg-6 p-5">
          {/* Logo */}
          <div className="d-flex align-items-center gap-2 mb-4">
            <ShipWheelIcon size={36} className="" style={{color:"#1b4b75 "}}/>
          <span style={{color:"#1b4b75"}}> <h1 className="fw-bold m-0" >Streamify</h1> </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error.response?.data?.message || "Login failed"}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <h3 className="mb-2">Welcome Back</h3>
            <p className="text-muted mb-4">Sign in to your account to continue your language journey</p>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="hello@example.com"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary" disabled={isPending}>
                {isPending ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            <div className="text-center mt-3">
              <small>
                Don't have an account?{" "}
                <Link to="/register" className="text-decoration-none text-dark fw-semibold">
                  Create one
                </Link>
              </small>
            </div>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-primary bg-opacity-10">
          <div className="text-center px-4">
            <img src="/i.png" alt="Language Illustration" className="img-fluid rounded mb-4" />
            <h5 className="fw-bold">Connect with language partners worldwide</h5>
            <h6 className="text-muted small">
              Practice conversations, make friends, and improve your language skills together
            </h6>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
