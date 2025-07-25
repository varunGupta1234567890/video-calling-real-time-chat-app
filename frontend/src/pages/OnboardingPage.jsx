import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api.js";
import { LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon, CameraIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",//isse usme authenticated user ka data pehle se hi set hoga 
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({//mutate ko rename kiya h 
    mutationFn: completeOnboarding,//ye api.js me daal diya h
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });//refetch authuser data
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;//generate random index btw 1 to 100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center  py-4" style={{ backgroundColor: "#141A59"}}>
      <div className="card shadow-lg w-100" style={{ maxWidth: "800px",backgroundColor: "#141A59" }}>
        <div className="card-body p-4 p-md-5"style={{ backgroundColor: "#E0DAD6",borderRadius:"20px"}}>
          <h1 className="card-title text-center mb-4">Complete Your Profile</h1>

          <form onSubmit={handleSubmit}>
            {/* Profile Picture */}
            <div className="d-flex flex-column align-items-center mb-4">
              <div
                className="rounded-circle bg-secondary bg-opacity-10 d-flex justify-content-center align-items-center overflow-hidden"
                style={{ width: "120px", height: "120px" }}
              >
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
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
              >
                <ShuffleIcon size={16} className="me-2" />
                Generate Random Avatar
              </button>
            </div>

            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your full name"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
              />
            </div>

            {/* Bio */}
            <div className="mb-3">
              <label className="form-label">Bio</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Tell others about yourself and your language learning goals"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
              ></textarea>
            </div>

            {/* Languages */}
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label className="form-label">Native Language</label>
                <select
                  className="form-select"
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({ ...formState, nativeLanguage: e.target.value })
                  }
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
                  value={formState.learningLanguage}
                  onChange={(e) =>
                    setFormState({ ...formState, learningLanguage: e.target.value })
                  }
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

            {/* Location */}
            <div className="mb-4">
              <label className="form-label">Location</label>
              <div className="input-group">
                <span className="input-group-text">
                  <MapPinIcon size={16} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="City, Country"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
              disabled={isPending}>
            
              {isPending ? (
                <>
                  <LoaderIcon className="me-2 spinner-border spinner-border-sm" />
                  Onboarding...
                </>
              ) : (
                <>
                  <ShipWheelIcon size={18} className="me-2" />
                  Complete Onboarding
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
