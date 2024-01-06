import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState } from "react";
import "./App.css";
import Main from "./pages/Main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Event from "./pages/Event/Event";
// import Routes from "./routes/Routes";
import CreateVenue from "./pages/Venue/CreateVenue/CreateVenue";
import UpdateVenue from "./pages/Venue/CreateVenue/UpdateVenue";

export const AppContext = React.createContext();

function App() {
  const [library, setLibrary] = useState([]);
  const [bag, setBag] = useState([]);

  return (
    <>
      {/* <Routes> */}
      <AppContext.Provider value={{ library, setLibrary, bag, setBag }}>
        <Router>
        {/* <Main /> */}
          <Routes>
            <Route path="/create-venue" element={<CreateVenue />} />
            <Route path="/update-venue/:venueId" element={<UpdateVenue />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </Router>

        {/* <Event/> */}
      </AppContext.Provider>
      {/* </Routes> */}
    </>
  );
}

export default App;
