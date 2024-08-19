import { BrowserRouter } from 'react-router-dom';
import RoutersApp from './routes'
import AuthProvider from './context/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={3000} />
        <RoutersApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
