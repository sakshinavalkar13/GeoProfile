import React, { useState, useEffect } from "react";

const ProfileForm = ({ onSubmit, profile, closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    email: "",
    phone: "",
    interests: "",
    imageFile: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
      setImagePreview(profile.imageFile ? profile.imageFile : null);
    } else {
      setFormData({
        name: "",
        description: "",
        address: "",
        email: "",
        phone: "",
        interests: "",
        imageFile: "",
      });
      setImagePreview(null);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imageFile") {
      const file = files[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setFormData({ ...formData, imageFile: imageUrl });
        setImagePreview(imageUrl);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="relative max-w-lg w-full mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {profile ? "Update Profile" : "Add Profile"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields */}
        <div className="max-h-[450px] overflow-y-auto space-y-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Phone</label>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 mb-1">Interests</label>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                className="textarea border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 mb-1">Upload Profile Image</label>
              <input
                type="file"
                name="imageFile"
                onChange={handleChange}
                className="input border border-gray-300 rounded p-2 w-full"
                accept="image/*"
              />
            </div>
          </div>

          {imagePreview && (
            <div className="mt-4 flex items-center">
              <div className="border border-gray-300 p-2">
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded"
                />
              </div>
              <div className="ml-4">
                <p>Uploaded profile image.</p>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="sticky bottom-0 bg-white flex justify-end space-x-4 p-4 border-t border-gray-200">
          <button
            onClick={closeModal}
            className="btn bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Close
          </button>
          <button
            type="submit"
            className="btn bg-[#00A896] text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            {profile ? "Update Profile" : "Add Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
