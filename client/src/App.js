import './App.css';
import Complaints from './pages/Complaints';
import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import Risks from './pages/Risks';
import Sidebar from './utils/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='w-screen h-screen bg-[#F1F5F9]'>
        <BrowserRouter>
      <Sidebar>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/details' element={<Details />} />
            <Route path='/risks' element={<Risks />} />
            <Route path='/complaints' element={<Complaints />} />
            <Route path='/profile' element={<Profile />} />

          </Routes>
      </Sidebar>
        </BrowserRouter>
    </div>
  );
}

export default App;
