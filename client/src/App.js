import './App.css';
import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import Profile from './pages/Profile';
import Sidebar from './utils/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='w-screen h-screen bg-[#F1F5F9]'>
        <BrowserRouter>
      <Sidebar>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/details' element={<Details />} />
            <Route path='/profile' element={<Profile />} />

          </Routes>
      </Sidebar>
        </BrowserRouter>
    </div>
  );
}

export default App;
