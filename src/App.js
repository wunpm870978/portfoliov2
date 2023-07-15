import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import HomeLayout from "./routes/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/*" element={<HomeLayout />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
