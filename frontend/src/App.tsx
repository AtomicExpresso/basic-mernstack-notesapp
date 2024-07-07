import React from "react";
import Navbar from "./components/main/navBar.tsx";
import {BrowserRouter} from "react-router-dom";
import NavRoutes from "./components/routes/routes.tsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <NavRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
