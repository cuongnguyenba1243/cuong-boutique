import { useState } from "react";

const EditUserManagement = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <div className="mx-auto max-w-5xl rounded-md p-6 shadow-md">
      <h2 className="mb-6 text-3xl font-bold">Edit User</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">Email</label>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">Password</label>
          <input
            type="text"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="w-full rounded border p-2"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-green-500 py-2 text-white transition-colors hover:bg-green-600"
        >
          Update User
        </button>
      </form>
    </div>
  );
};
export default EditUserManagement;
