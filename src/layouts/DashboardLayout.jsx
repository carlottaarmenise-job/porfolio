import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
export default function DashboardLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar />
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Header />
        <main
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: '1rem',
            backgroundColor: '#f8f9fa',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
