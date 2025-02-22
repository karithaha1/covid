import { Routes, Route } from 'react-router-dom';
import CovidDashboard from './pages/CovidDashboard';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CovidDashboard />} />
      </Routes>
    </>
  );
};

export default App;
