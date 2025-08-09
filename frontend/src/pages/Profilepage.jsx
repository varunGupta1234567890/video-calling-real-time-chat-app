import { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { updateprofilepage } from "../lib/api.js"; // API function to update
import { useNavigate } from "react-router-dom";
import { ShuffleIcon,CameraIcon} from "lucide-react";
import { LANGUAGES } from "../constants";
import {toast} from "react-hot-toast"

const Profilepage = () => {
  const { authUser, isLoading,refetch } = useAuthUser();
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    dob: "",
    location: "",
    bio: "",
    profilePic: "",
 nativeLanguage: "",     
  learningLanguage: "", 
  });

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName || "",
        email: authUser.email || "",
        gender: authUser.gender || "",
        dob: authUser.dob || "",
        location: authUser.location || "",
        bio: authUser.bio || "",
        profilePic: authUser.profilePic || "",
         nativeLanguage: authUser.nativeLanguage || "",
         learningLanguage: authUser.learningLanguage || "",
      });
    }
  }, [authUser]);

  const onchange = (e) => {
    e.preventDefault();
    setFormData({...formData,[e.target.name]:e.target.value})
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateprofilepage(formData);
  await refetch(); //  Force update user data from backend
  toast.success("Profile updated successfully")
      navigate("/")
     
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  const handleRandomAvatar = () => {
      const idx = Math.floor(Math.random() * 100) + 1;//generate random index btw 1 to 100
    //   const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
   const randomAvatar = `https://i.pravatar.cc/300?u=${idx}`;

      setFormData({ ...formData, profilePic: randomAvatar });
      toast.success("Random profile picture generated!");
    };

  if (isLoading) return <div className="text-center my-5">Loading...</div>;

  return (
    <div className="container ">
        <div>
      <div className="card shadow p-4">
         <h1 className="mb-4 text-center">Your Profile</h1>
        <div className="text-center mb-4">
          
              <div className="d-flex flex-column align-items-center mb-4">
              <div
                className="rounded-circle bg-secondary bg-opacity-10 d-flex justify-content-center align-items-center overflow-hidden"
                style={{ width: "120px", height: "120px" }}
              >
                {formData.profilePic ? (
                  <img
                    src={formData.profilePic}
                    alt="Profile"
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                ) : (
                  <CameraIcon size={40} className="text-muted" />
                )}
              </div>
               <button
                type="button"
                className="btn btn-outline-primary mt-3 d-flex align-items-center"
                onClick={handleRandomAvatar}
                //  value={formData.profilePic}
                // onChange={onchange}

              >
                <ShuffleIcon size={16} className="me-2" />
                Generate Random Avatar
              </button>
            
          
        </div>


        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={formData.fullName}
                onChange={onchange}
              />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={onchange}
                disabled // Usually we don't allow editing email
              />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                name="gender"
                value={formData.gender}
                onChange={onchange}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label mr-0">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dob"
                value={formData.dob}
                onChange={onchange}
              />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={onchange}
              />
            </div>


            
          
                      {/* Languages */}
                      <div className="row mb-3">
                        <div className="col-md-6 mb-3 mb-md-0">
                          <label className="form-label">Native Language</label>
                          <select
                            className="form-select"
                            value={formData.nativeLanguage}
                            onChange={onchange}
                            name="nativeLanguage"
                          >
                            <option value="">Select your native language</option>
                            {LANGUAGES.map((lang) => (
                              <option key={`native-${lang}`} value={lang.toLowerCase()}>
                                {lang}
                              </option>
                            ))}
                          </select>
                        </div>
          
                        <div className="col-md-6">
                          <label className="form-label">Learning Language</label>
                          <select
                            className="form-select"
                            value={formData.learningLanguage}
                            onChange={onchange}
                            name="learningLanguage"
                          >
                            <option value="">Select language you're learning</option>
                            {LANGUAGES.map((lang) => (
                              <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                                {lang}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>


            <div className="mb-3 col-12">
              <label className="form-label">Bio</label>
              <textarea
                className="form-control"
                rows="3"
                name="bio"
                value={formData.bio}
                onChange={onchange}
              />
            </div>
          </div>

          <div className="text-center">
            <button className="btn btn-primary px-4 mt-3" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Profilepage;
