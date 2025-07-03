import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="d-flex flex-column flex-lg-row vh-100 overflow-hidden position-relative">
      {/* SIDEBAR MOBILE (slide-in) */}
      <div
        className={`d-lg-none position-fixed top-0 start-0 h-100 bg-dark shadow`}
        style={{
          width: '16rem',
          zIndex: 1041,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <Sidebar onClose={closeSidebar} />
      </div>

      {/* BACKDROP per mobile */}
      {sidebarOpen && (
        <div
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar desktop */}
      <div className="d-none d-lg-block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-grow-1 d-flex flex-column">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main
          className="flex-grow-1 overflow-auto p-3 bg-light"
          style={{
            height: window.innerWidth < 992 ? 'calc(100vh - 64px)' : 'auto',
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
