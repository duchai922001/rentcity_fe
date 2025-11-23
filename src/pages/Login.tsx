import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { AuthService } from "../services/auth.service";

const Login = () => {
  const [phone, setPhone] = useState(""); // ✅ đổi từ email → phone
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await AuthService.login({ phone, password });

      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("user", JSON.stringify(res.user));

      console.log("Đăng nhập thành công:", res);

      navigate("/admin");
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex">
      <div className="w-1/2 relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="House"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-3xl p-12 shadow-xl">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-300 rounded-xl flex items-center justify-center">
                <img src="/logo.png" alt="Logo" className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-orange-500">EASYRENT</h1>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              ĐĂNG NHẬP EASY RENT
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
              <div>
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  pattern="[0-9]{10,11}" // ✅ chỉ cho phép nhập số (10–11 ký tự)
                  className="w-full px-4 py-3 bg-white rounded-lg border-2 border-transparent focus:border-orange-400 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg border-2 border-transparent focus:border-orange-400 focus:outline-none transition-colors"
                  required
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-400"
                />
                <label htmlFor="remember" className="ml-2 text-gray-700">
                  Ghi nhớ mật khẩu?
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-semibold py-3 rounded-full hover:shadow-lg transition-shadow disabled:opacity-50"
              >
                {isLoading ? "Đang xử lý..." : "ĐĂNG NHẬP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
