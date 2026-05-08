import React from 'react';

const TopNav = () => {
    return (
        <nav className="fixed top-[40px] opacity-40 z-[1000] w-full px-12 pointer-events-none">
            <div className="w-full flex justify-between items-center uppercase tracking-[0.2em] font-medium text-[10px] md:text-xs">
                <span className=''>Even</span>
                <span className=''>The</span>
                {/* Central Logo/Icon Placeholder */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <img
                        src="/images/img-6.jpg"
                        alt="logo"
                        className="w-[200px] h-[200px]"
                    />
                </div>
                <span>Devil</span>
                <span>Smiles</span>
            </div>
        </nav>
    );
};

export default TopNav;