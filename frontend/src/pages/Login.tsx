import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import API from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const [form, setForm] = useState({ phone: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      await login(data.token);
      if (data.role === "CITIZEN") navigate("/citizen");
      else if (data.role === "COLLECTOR") navigate("/collector");
      else navigate("/leadership");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/5">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center text-xl">Login to PrajaConnect</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="phone" placeholder="Phone Number" onChange={handleChange} required />
            <Input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
