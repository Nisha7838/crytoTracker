
import './App.css';

import Card from './Card';
import Navbar from './Navbar';
import Table from './Table';

function App() {
  return (
    <div className="App container mx-auto">
      <div lassName="subcontainer">
        <div>
          <Navbar />
        </div>
        <Card />
        <div>
          <Table />
        </div>
      </div>

    </div>
  );
}

export default App;
