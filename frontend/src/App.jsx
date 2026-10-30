import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Login = lazy(() => import('../src/pages/Login'));
const Register = lazy(() => import('../src/pages/Register'));
const Dashboard = lazy(() => import('../src/pages/Dashboard'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={
          <div className="d-flex align-items-center justify-content-center">
            <h4>Loading...</h4>
          </div>
        }>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;