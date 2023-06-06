import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "pages/dashboard"

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  </Router>
)

export default AppRouter
