import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/shadcn/ui/card";
import { Label } from "./components/shadcn/ui/label";
import { Input } from "./components/shadcn/ui/input";
import { Alert, AlertDescription } from "./components/shadcn/ui/alert";
import { Checkbox } from "./components/shadcn/ui/checkbox";
import { Button } from "./components/shadcn/ui/button";

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

      const isValid = email === "a@company.com" && password === "1234";
      if (!isValid) {
        setError("유효하지 않은 이메일 또는 비밀번호입니다.");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigate("/", { replace: true });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main
        className="max-w-[1440px] mx-auto px-8 flex items-center justify-center"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <div className="w-full max-w-md">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">로그인</CardTitle>
              <CardDescription>
                운영 계획 관리 시스템에 접속하려면 로그인하세요.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@karko.co.kr"
                    autoComplete="email"
                    className="focus-visible:ring-[#1e3a5f]"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="pr-10 focus-visible:ring-[#1e3a5f]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Remember me */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(v) => setRememberMe(Boolean(v))}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Remember me
                  </Label>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1e3a5f] text-white hover:bg-[#162c49] disabled:opacity-50"
                >
                  {isLoading ? "로그인 중..." : "로그인"}
                </Button>

                {/* Forgot password */}
                <div className="text-center">
                  <Button
                    variant="link"
                    type="button"
                    disabled
                    className="text-muted-foreground"
                  >
                    Forgot password?
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
