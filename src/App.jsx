import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import routes from './routes';

function App() {
  return (
    <div className="App">
        <RouterProvider router={createBrowserRouter(routes)}/>
    </div>
  );
}

export default App;
