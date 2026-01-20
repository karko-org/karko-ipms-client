export function Header() {
  return (
    <header className="bg-[#1e3a5f] text-white">
      <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10  rounded flex items-center justify-center text-sm">
            <img
              src="/kar_logo_white.png"
              alt="KAR Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-lg font-medium">운영 계획 관리</h1>
        </div>
      </div>
    </header>
  );
}
