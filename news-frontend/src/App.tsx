import { Link, Outlet } from "react-router-dom"

export default function App() {

  return (
    <div className="container">
      <header className="header">
        <Link to="/"><h2>📰 News App</h2></Link>
        
      </header>

      <Outlet />
    </div>
  )
}