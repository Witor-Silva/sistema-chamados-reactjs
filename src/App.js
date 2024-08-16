import { BrowserRouter } from 'react-router-dom';
import RoutersApp from './routes'
import AuthProvider from './context/auth';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutersApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
