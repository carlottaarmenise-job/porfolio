import { useLocation, Link } from 'react-router-dom'
import { Accordion, Nav } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const navGroups = [
  {
    title: 'General',
    items: [
      { name: 'Home', path: '/app/' },
      { name: 'About', path: '/app/about' },
      { name: 'Settings', path: '/app/settings' },
    ],
  },
  {
    title: 'Content',
    items: [
      { name: 'Blog', path: '/app/blog' },
      { name: 'Chat', path: '/app/chat' },
      { name: 'Events', path: '/app/events' },
      { name: 'Tasks', path: '/app/task' },
    ],
  },
  {
    title: 'Management',
    items: [
      { name: 'Users', path: '/app/users' },
      { name: 'Invoice', path: '/app/invoice' },
      { name: 'Products', path: '/app/products' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Templates', path: '/app/templates' },
      { name: 'Figma Lite', path: '/app/figma' },
      { name: 'Wix Lite', path: '/app/wix' },
    ],
  },
]

export default function Sidebar() {
  const { pathname } = useLocation()
  const [openKeys, setOpenKeys] = useState([])

  useEffect(() => {
    const foundIndex = navGroups.findIndex(group =>
      group.items.some(item => item.path === pathname)
    )
    if (foundIndex !== -1) {
      setOpenKeys([String(foundIndex)])
    }
  }, [pathname])

  const toggleKey = (key) => {
    setOpenKeys(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    )
  }

  return (
    <aside
      style={{ width: '16rem', height: '100vh', flexShrink: 0 }}
      className="bg-dark text-white p-3 d-flex flex-column border-end border-secondary overflow-auto"
    >
      <h5 className="fw-bold text-light mb-3 px-1">📋 Dashboard</h5>

      <Accordion activeKey={openKeys} alwaysOpen>
        {navGroups.map((group, idx) => {
          const eventKey = String(idx)
          return (
            <Accordion.Item
              eventKey={eventKey}
              key={group.title}
              className="bg-dark text-white border-0"
            >
              <Accordion.Header
                onClick={() => toggleKey(eventKey)}
                style={{
                  backgroundColor: '#212529',
                  color: '#f8f9fa',
                }}
              >
                {group.title}
              </Accordion.Header>
              <Accordion.Body className="p-0 bg-dark">
                <Nav className="flex-column">
                  {group.items.map((item) => (
                    <Nav.Link
                      as={Link}
                      to={item.path}
                      key={item.path}
                      className="px-3 py-2"
                      style={{
                        color: pathname === item.path ? '#fff' : '#adb5bd',
                        backgroundColor: pathname === item.path ? '#343a40' : 'transparent',
                        fontWeight: pathname === item.path ? 'bold' : 'normal',
                        borderRadius: '4px',
                        transition: 'background 0.2s',
                      }}
                    >
                      {item.name}
                    </Nav.Link>
                  ))}
                </Nav>
              </Accordion.Body>
            </Accordion.Item>
          )
        })}
      </Accordion>
      <div className="mt-auto pt-3 border-top border-secondary">
        <Nav.Link
          as={Link}
          to="/"
          className="text-light px-3 py-2"
          style={{
            backgroundColor: '#212529',
            borderRadius: '4px',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          ⬅️ Torna al sito
        </Nav.Link>
      </div>
    </aside>
  )
}
