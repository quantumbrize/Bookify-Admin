import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from './redux/slices/authSlice';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Loader from './components/Loader';
import { RootState } from './redux/store';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    const adminInfoFromStorage = localStorage.getItem('adminInfo');

    if (tokenFromStorage && adminInfoFromStorage) {
      dispatch(setAuth({
        token: JSON.parse(tokenFromStorage),
        adminInfo: JSON.parse(adminInfoFromStorage),
      }));
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
