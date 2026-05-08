import React from "react";
import Slider from "./components/Slider";
import "./index.css";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <div className="w-full h-full flex justify-center items-center bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#050505_100%)]">
      <TopNav />
      <Slider />
      <BottomNav />
    </div>
  );
}

export default App;