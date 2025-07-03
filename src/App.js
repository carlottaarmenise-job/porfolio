import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'
import Users from './pages/Users'
import Settings from './pages/Settings'
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './pages/Profile'
import Products from './pages/Products'
import About from './pages/About'
import ProductEdit from './pages/ProductEdit'
import AddProduct from './pages/AddProduct'
import { ProductsProvider } from './reducer/ProductsContext'
import { UsersProvider } from './reducer/UsersContext'
import Events from './pages/Events'
import Templates from './pages/Templates'
import Chat from './pages/Chat'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import CustomerCanvas from './pages/Canvas'
import InvoicesPage from './pages/Invoce'
import CanvasEditor from './pages/FigmaLite'
import WebsiteBuilder from './pages/WixLite'
import DailyTasks from './pages/Task'
import LandingPage from './pages/LandingPage'


export default function App() {
  return (
     <ProductsProvider>
      <UsersProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing fuori dal layout */}
            <Route path="/" element={<LandingPage />} />

            {/* Tutto il resto nel dashboard layout */}
            <Route path="/app" element={<DashboardLayout />}>
              <Route index element={<Home />} />
              <Route path="users" element={<Users />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductEdit />} />
              <Route path="products/new" element={<AddProduct />} />
              <Route path="about" element={<About />} />
              <Route path="templates" element={<Templates />} />
              <Route path="events" element={<Events />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<BlogPost />} />
              <Route path="chat" element={<Chat />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="canvas" element={<CustomerCanvas />} />
              <Route path="invoice" element={<InvoicesPage />} />
              <Route path="task" element={<DailyTasks />} />
              <Route path="figma" element={<CanvasEditor />} />
              <Route path="wix" element={<WebsiteBuilder />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UsersProvider>
    </ProductsProvider>
  )
}
