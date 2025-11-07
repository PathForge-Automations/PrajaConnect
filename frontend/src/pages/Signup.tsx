import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../lib/api";

interface SignupForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export default function Signup() {
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "CITIZEN",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("OTP sent to your phone!");
      navigate(`/login/${form.role.toLowerCase()}`);
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-blue-700">PrajaConnect Signup</h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="CITIZEN">Citizen</option>
          <option value="COLLECTOR">Collector</option>
          <option value="LEADERSHIP">Leadership</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
