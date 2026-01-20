export function Header() {
  return (
    <header className="bg-[#1e3a5f] text-white">
      <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center text-sm">
            LOGO
          </div>
          <h1 className="text-lg font-medium">KAR 운영 계획 관리</h1>
        </div>

        <div className="text-sm text-white/80">Last updated: Today 10:42</div>
      </div>
    </header>
  );
}
