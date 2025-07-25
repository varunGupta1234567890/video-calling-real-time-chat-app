import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Correct package
import useSignUp from "../hooks/useSignUp.js";
import { ShipWheelIcon } from "lucide-react";


const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    username: ""
  });
  //without using custon hook
// const queryClient = useQueryClient();
//   const { mutate:signupMutation, isPending, error } = useMutation({
//     mutationFn: signup, //ye api.js me daal diya h
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
//   });
  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = async (e) => {
    e.preventDefault();
      try {
    await signupMutation(signupData);  // Use await to avoid double request
   
  } catch (error) {
    console.error("Signup failed", error);
  }
  };

  return (
    <div className="text-dark" style={{backgroundColor:"#3e314a ",color:"white"}}>
    <div className="container py-5" style={{}}>
      <div className="row justify-content-center align-items-center min-vh-100" >
        <div className="col-lg-10 shadow-lg rounded-4 p-4 black border"  style={{backgroundColor:"#67635b "}} >

          <div className="row">
            {/* Left - Form */}
            <div className="col-lg-6 p-4">
              <div className="mb-4 d-flex align-items-center gap-2" >
                <i className="bi bi-compass fs-3 text-primary"></i>
                   <ShipWheelIcon size={36} className="" style={{color:" "}}/>
            <span style={{color:"  "}}>  <h1 className="fw-bold">Streamify</h1></span>  
              </div>

              {error && (
                <div className="alert alert-danger">
                  {error.response?.data?.message || "Signup failed."}
                </div>
              )}

              <h3 className="mb-3">Create an Account</h3>
              <h5 className="text-muted mb-4">
                Join Streamify and start your language learning adventure!
              </h5>

              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label htmlFor="fullName"   className="form-label">Full Name</label>
                  <input
                  id="fullName"
                   name="fullName"
                    type="text"
                    className="form-control"
                    placeholder="John Doe"
                    value={signupData.fullName}
                    onChange={(e) =>
                      setSignupData({ ...signupData, fullName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email"    className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                     name="email"
                    className="form-control"
                    placeholder="john@gmail.com"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="username"   className="form-label">Username</label>
                  <input
                   id="username"
                    name="username"
                    type="text"
                    className="form-control"
                    placeholder="eg johnny123"
                    value={signupData.username}
                    onChange={(e) =>
                      setSignupData({ ...signupData, username: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password"  className="form-label">Password</label>
                  <input
                   id="password"
                  name="password"
                    type="password"
                    className="form-control"
                    placeholder="********"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    required
                  />
                  <h6 className="text-muted">
                    Password must be at least 6 characters long
                  </h6>
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="terms"
                    required
                  />
                  <label htmlFor="terms" className="form-check-label small">
                    I agree to the <span className="text-primary">terms of service</span> and{" "}
                    <span className="text-primary">privacy policy</span>.
                  </label>
                </div>

                <button className="btn btn-primary w-100" type="submit" disabled={isPending}>
                  {isPending ? "Creating Account..." : "Create Account"}
                </button>

                <div className="text-center mt-3">
                  <p className="text-muted">
                    Already have an account?{" "}
                    <Link to="/login" className="text-light">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Right - Illustration */}
            <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-light p-4">
              <div className="text-center">
                <img src="/i.png" alt="Illustration" className="img-fluid mb-4 rounded-3" />
                <h5>Connect with language partners worldwide</h5>
                <p className="text-muted">
                  Practice conversations, make friends, and improve your language skills together.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default SignUpPage;
