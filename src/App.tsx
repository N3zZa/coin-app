import Header from 'components/Header/Header';
import routes from 'pages/routes';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { CoinsProvider } from 'context/CoinsContext';

function App() {
  return (
    <CoinsProvider>
        <Router>
          <Header />
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Router>
    </CoinsProvider>
  );
}

export default App;
