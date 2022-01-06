//CONTINUOUS ASSESSMENT II - BSC30921
//STUDENT ID: 21565
//STUDENT NAME: ALESSANDRA SILVA DOS REIS

import './App.css';
import Singers from './components/Singers';
import SingerEdit from './components/SingerEdit';
import SingerView from './components/SingerView';
import SingerAdd from './components/SingerAdd';
import {
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return(
    <div>
      {}
        <Routes>
          <Route path='/' element={<Singers />} />
          <Route path='/editSinger' element={<SingerEdit />} />
          <Route path='/viewSinger' element={<SingerView />} />
          <Route path='/addSinger' element={<SingerAdd />} />
        </Routes>
    </div>
  );
}

export default App;

