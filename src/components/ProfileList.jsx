import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];
    setProfiles(savedProfiles);
  }, []);

  useEffect(() => {
    handleCloseMap();
  }, [location.pathname]);

  const viewProfileDetails = (profile) => {
    setSelectedProfile(profile);
    setMapVisible(true); // Show the summary modal
  };

  const handleCloseMap = () => {
    setMapVisible(false);
    setSelectedProfile(null);
    setSummaryVisible(false); // Close the summary modal
  };

  const initializeMap = () => {
    if (selectedProfile) {
      const map = L.map("map").setView([51.505, -0.09], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      const geocodeURL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        selectedProfile.address
      )}`;

      fetch(geocodeURL)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            map.setView([lat, lon], 13);
            L.marker([lat, lon]).addTo(map);
          } else {
            console.error("Address not found");
          }
        })
        .catch((error) => console.error("Error fetching geocode:", error));
    }
  };

  useEffect(() => {
    if (mapVisible) {
      initializeMap();
    }
    // eslint-disable-next-line
  }, [mapVisible, selectedProfile]);

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const highlightText = (text) => {
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="admin-panel pt-20 min-h-screen" style={{ background: 'linear-gradient(135deg, #E0F7FA, #E3F2FD)' }}>
      <input
          type="text"
          placeholder="Search profiles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-3 ml-3 rounded-lg w-full max-w-md mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {filteredProfiles.length === 0 ? (
          <div className="text-center text-[#333333] italic mt-8">
            <div className="text-2xl font-semibold mb-4">
              😕 No Profiles Found
            </div>
            <p className="text-lg mb-4">
              📋 You haven't added any profiles yet. Click the button below to get started.
            </p>
            <button
              onClick={() => navigate("/admin")}
              className="px-4 py-2 rounded bg-[#00A896] hover:bg-indigo-700 text-white transition-colors duration-300 shadow-lg"
            >
              🚀 Go to Admin Panel
            </button>
          </div>
        )
         : (
          <div className="overflow-x-auto">
          <table className="min-w-full ml-3 border-collapse bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-teal-100">
              <th className="border p-4 text-teal-700">Sr. No.</th>
              <th className="border p-4 text-teal-700">Profile Image</th>
              <th className="border p-4 text-teal-700">Name</th>
              <th className="border p-4 text-teal-700">Email</th>
              <th className="border p-4 text-teal-700">Description</th>
              <th className="border p-4 text-teal-700">Address</th>
              <th className="border p-4 text-teal-700">Actions</th>
            </tr>
          </thead>
              <tbody>
                {filteredProfiles.map((profile, index) => (
                  <tr
                    key={profile.id}
                    className="border-b hover:bg-blue-50 transition duration-150"
                  >
                    <td className="border p-4 text-center">{index + 1}</td>
                    <td
                      onClick={() => navigate(`/profile/${profile.id}`)}
                      className="border cursor-pointer flex justify-center p-4 text-center"
                    >
                      <img
                        src={profile?.imageFile}
                        className="h-16 w-16 rounded-full shadow-md object-cover"
                        alt="Profile"
                      />
                    </td>
                    <td className="border p-4">
                      {highlightText(profile.name)}
                    </td>
                    <td className="border p-4">
                      {highlightText(profile.email)}
                    </td>
                    <td className="border p-4">{profile.description}</td>
                    <td className="border p-4">
                      {highlightText(profile.address)}
                    </td>
                    <td className="border p-4 text-center space-x-4 text-xl">
                      <button
                        className="text-teal-600"
                        onClick={() => {
                          setSelectedProfile(profile);
                          setSummaryVisible(true); // Show the map modal
                        }}
                      >
                        <FaEye title="View Profile" />
                      </button>
                      <button
                        className="bg-[#00A896] text-white text-base py-1 px-2 rounded hover:bg-indigo-700"
                        onClick={() => viewProfileDetails(profile)}
                      >
                        Location
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Map Modal */}
        {mapVisible && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="relative bg-white rounded shadow-lg p-6 w-11/12 max-w-4xl">
              <button
                className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleCloseMap}
              >
                Close Map
              </button>
              <h2 className="text-2xl font-bold mb-4">
                {selectedProfile.name.split(" ")[0]}'s Location
              </h2>
              <div id="map" className="h-96 w-full rounded"></div>
            </div>
          </div>
        )}

        {/* Summary Modal */}
        {summaryVisible && selectedProfile && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-70 z-50 flex items-center justify-center">
    <div className="relative bg-zinc-300 rounded-lg shadow-lg p-8 w-11/12 max-w-2xl transition-all duration-300 transform hover:scale-105">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700 transition duration-200"
        onClick={handleCloseMap}
      >
        Close
      </button>

      {/* Profile Name */}
      <h2 className="text-3xl font-semibold mb-4 text-blue-600 text-center">
        {selectedProfile.name}
      </h2>

      {/* Profile Image */}
      {selectedProfile.imageFile && (
        <div className="flex justify-center mb-4">
          <img
            src={selectedProfile.imageFile}
            alt={`${selectedProfile.name}'s Profile`}
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-200 shadow-lg"
          />
        </div>
      )}

      {/* Profile Details */}
      <div className="text-center">
        <p className="text-lg text-gray-800 mb-2">
          <strong>Email:</strong>{" "}
          <span className="text-gray-600">{selectedProfile.email}</span>
        </p>
        <p className="text-lg text-gray-800 mb-2">
          <strong>Address:</strong>{" "}
          <span className="text-gray-600">{selectedProfile.address}</span>
        </p>
        <p className="text-lg text-gray-800 mb-2">
          <strong>Description:</strong>{" "}
          <span className="text-gray-600">{selectedProfile.description}</span>
        </p>
        <p className="text-lg text-gray-800 mb-2">
        <strong>Interests:</strong>{" "}
        <span className="text-gray-600">{selectedProfile.interests}</span>
      </p>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
      <p className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
        Contact No.: {selectedProfile.phone}
      </p>
    </div>
    
    </div>
  </div>
)}

      </div>
      <Footer />
    </>
  );
};

export default ProfileList;
