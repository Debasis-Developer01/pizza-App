import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <Home/>
     </BrowserRouter>
    </div>
  );
}

export default App;
