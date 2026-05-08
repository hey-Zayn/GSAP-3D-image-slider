

const BottomNav = () => {
    return (
        <nav className="fixed bottom-[40px] z-[1000] w-full px-12 pointer-events-none flex justify-center">
            {/* The Centered Button Box */}
            <div className="pointer-events-auto flex items-center justify-between border border-white/20 px-2 py-2 min-w-[300px] bg-black/10 backdrop-blur-sm">

                {/* Left Square Icon */}
                <div className="w-4 h-4 bg-white"></div>

                {/* Center Text */}
                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-light text-white opacity-60 alegria">
                    Explore
                </span>

                {/* Right Ellipsis Icon */}
                <div className="flex gap-1">
                    <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                    <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                    <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                </div>

            </div>
        </nav>
    );
};

export default BottomNav;