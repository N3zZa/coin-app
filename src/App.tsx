import { FavoritesProvider } from 'context/FavoritesContext';
import Header from 'components/Header/Header';
import routes from 'pages/routes';
import { BrowserRouter as Router, Route, Routes } from 'react-router';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Header />
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
