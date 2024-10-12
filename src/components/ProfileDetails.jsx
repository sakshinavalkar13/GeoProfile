import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem("profiles"));
    if (storedProfiles) {
      const foundProfile = storedProfiles.find(
        (profile) => profile.id === parseInt(id)
      );

      if (foundProfile) {
        setProfile(foundProfile);
        setLoading(false);
      } else {
        setError("Profile not found");
        setLoading(false);
      }
    } else {
      setError("No profiles found in storage");
      setLoading(false);
    }
  }, [id]);

  // Function to handle closing the profile card
  const handleCloseCard = () => {
    navigate(-1); // Go back to the previous page or use navigate("/") to go to the home page.
  };

  if (loading)
    return <div className="text-center mt-10">Loading profile details...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 z-50 flex items-center justify-center">
  <div className="relative bg-zinc-300 rounded-lg shadow-lg p-8 w-11/12 max-w-2xl transition-all duration-300 transform hover:scale-105">
    {/* Close Button */}
    <button
      onClick={handleCloseCard}
      className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700 transition duration-200"
    >
      Close
    </button>

    {/* Profile Image */}
    <div className="flex flex-col items-center">
      {profile.imageFile && (
        <img
          src={profile.imageFile}
          alt={`${profile.name}'s Profile`}
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-200 shadow-lg mb-4"
        />
      )}

      {/* Profile Name */}
      <h2 className="text-3xl font-semibold text-blue-600 text-center mb-4">
        {profile.name}
      </h2>
    </div>

    {/* Profile Details */}
    <div className="text-center space-y-4">
      <p className="text-lg text-gray-800 mb-2">
        <strong>Email:</strong>{" "}
        <span className="text-gray-600">{profile.email}</span>
      </p>
      <p className="text-lg text-gray-800 mb-2">
        <strong>Address:</strong>{" "}
        <span className="text-gray-600">{profile.address}</span>
      </p>
      <p className="text-lg text-gray-800 mb-2">
        <strong>Description:</strong>{" "}
        <span className="text-gray-600">{profile.description}</span>
      </p>
      <p className="text-lg text-gray-800 mb-2">
        <strong>Interests:</strong>{" "}
        <span className="text-gray-600">{profile.interests}</span>
      </p>
    </div>

    {/* Contact Information */}
    <div className="mt-6 flex justify-center space-x-4">
      <p className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
        Contact No.: {profile.phone}
      </p>
    </div>
  </div>
</div>

  );
};

export default ProfileDetails;
