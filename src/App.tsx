import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Landing } from "./pages/Landing";
import { RTSPViewer } from "./pages/RTSPViewer";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/viewer" element={<RTSPViewer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App