import React from "react";
import Slider from "./components/Slider";
import "./index.css";

function App() {
  return (
    <div className="w-full h-full flex justify-center items-center bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#050505_100%)]">
      <h1 className="fixed top-[60px] left-1/2 -translate-x-1/2 text-xl md:text-2xl uppercase tracking-[0.8em] font-light opacity-30 z-[1000] pointer-events-none text-center w-full">
        Infinite Tunnel
      </h1>
      
      <Slider />
    </div>
  );
}

export default App;