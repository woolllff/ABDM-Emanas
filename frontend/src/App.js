
import Login from './components/login.components';
import ConsentRequest from './components/consentRequest';
import Otp from './components/otpVerify';

import {   
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/makecr" element={<ConsentRequest />} />
      <Route path='/otp' element={<Otp />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
