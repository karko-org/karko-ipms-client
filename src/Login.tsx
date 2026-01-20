import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (!email || !password) {
        setError("이메일과 비밀번호를 입력해주세요.");
        setIsLoading(false);
        return;
      }

      // ✅ 여기만 "성공" 케이스로 바꾸면 됨 (지금은 mock)
      const isValid = email === "test@company.com" && password === "1234";

      if (!isValid) {
        setError("유효하지 않은 이메일 또는 비밀번호입니다.");
        setIsLoading(false);
        return;
      }

      // (옵션) rememberMe에 따라 토큰 저장 방식 분기 가능
      // const storage = rememberMe ? localStorage : sessionStorage;
      // storage.setItem("accessToken", "mock-token");

      setIsLoading(false);

      // ✅ 홈으로 이동
      navigate("/", { replace: true });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Same as dashboard */}
      <header className="bg-[#1e3a5f] text-white">
        <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center text-sm">
              LOGO
            </div>
            <h1 className="text-lg font-medium">KAR 운영 계획 관리</h1>
          </div>

          <div className="flex items-center gap-4 text-sm text-white/80">
            <span>Internal Intranet Only</span>
            <span className="text-white/60">v1.0</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="max-w-[1440px] mx-auto px-8 flex items-center justify-center"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="mb-8">
              <h2 className="text-2xl mb-2">Sign in</h2>
              <p className="text-sm text-gray-600">
                Use your company account to access the intranet dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  이메일 <span className="text-gray-400">(Email)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  비밀번호 <span className="text-gray-400">(Password)</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#4f46e5] border-gray-300 rounded focus:ring-[#4f46e5]"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                onSubmit={handleSubmit}
                disabled={isLoading}
                className="w-full bg-[#4f46e5] text-white py-2.5 rounded-lg hover:bg-[#4338ca] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isLoading ? "로그인 중..." : "로그인 (Sign in)"}
              </button>

              {/* Forgot Password Link */}
              <div className="text-center">
                <button
                  type="button"
                  disabled
                  className="text-sm text-gray-400 cursor-not-allowed"
                >
                  Forgot password?
                </button>
              </div>
            </form>

            {/* Footer Notes */}
            <div className="mt-8 pt-6 border-t border-gray-200 space-y-2">
              <p className="text-xs text-gray-500 text-center">
                사내 내부망에서만 접속 가능합니다.
              </p>
              <p className="text-xs text-gray-500 text-center">
                Access is restricted to the company network.
              </p>
              <p className="text-xs text-gray-500 text-center">
                If you have issues, contact the administrator.
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  Security Notice
                </h3>
                <p className="text-xs text-gray-600">
                  Unauthorized access is prohibited. All access attempts are
                  logged and monitored for security purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
