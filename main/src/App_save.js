import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from './screens/start';
import Analyze from './screens/analyze';
import Profile from './screens/profile';
import Record from './screens/record';

const App = () => {
    return (
        <Router>
            <Start />
            <Routes>
                <Route path='./screens/Profile' element={<Profile/>}/>
                <Route path='./screens/analyze' element={<Analyze/>}/>
                <Route path='./screens/record' element={<Record/>}/>
            </Routes>
        </Router>
    )
}
export default App;