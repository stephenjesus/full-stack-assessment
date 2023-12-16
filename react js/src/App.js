import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PasswordChecker from './PasswordChecker';
import PartitionMatcher from './PartitionMatcher';
import Sidebar from './Sidebar';
import HomeIcon from '@mui/icons-material/Home'; 
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';


const routes = [
  { path: '/', name: 'Password Checker', component: PasswordChecker , icon: <HomeIcon/> },
  { path: '/partition-matcher', name: 'Minimum Difference', component: PartitionMatcher , icon :<SafetyCheckIcon/> },
];

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Sidebar routes={routes}></Sidebar>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
