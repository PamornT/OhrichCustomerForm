import { useState } from "react";
import { Lock, User } from "lucide-react";

interface LoginProps {
  onLogin: (username: string) => void;
}

const VALID_ACCOUNTS = [
  { username: "praranee.b", password: "Srt@2025" },
  { username: "jirawan.k", password: "Srt@2025" },
  { username: "nattapho.k", password: "Srt@2025" },
  { username: "tawan.k", password: "Srt@2025" },
  { username: "methus.l", password: "Srt@2025" },
];

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const account = VALID_ACCOUNTS.find(
      (acc) =>
        acc.username === username && acc.password === password,
    );

    if (account) {
      onLogin(username);
    } else {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="h-20 rounded-2xl mx-auto flex items-center justify-center mb-0">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoq6cNxB4Kmc2Can8ZQwKLkb6dP415mZHFhQ&s"
              alt="OH! RICH Logo"
              className="h-20 w-auto"
            />
          </div>
          <p className="text-gray-500 mt-0">
            ระบบจัดการข้อมูลลูกค้า
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">
              ชื่อผู้ใช้
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              รหัสผ่าน
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#97d700] text-white py-3 rounded-lg transition-colors"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
}