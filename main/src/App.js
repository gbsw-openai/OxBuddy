import { BrowserRouter as Router, Route, Routes, useNavigate, useMatch } from 'react-router-dom';
import Start from './screens/start';
import Analyze from './screens/analyze';
import Profile from './screens/profile';
// import Record from './screens/record';
import AnalyzeResult from './screens/analyze_result'
import './App.css'


const NavigationBar = () => {
  const navigate = useNavigate();


  return (
    <div className='header'>
      <ul style={{ padding: 0, listStyle: 'none', display: 'flex', justifyContent: 'space-around' }}>
        <li>
          <button
            className="navi_content"
            style={{ color: '#E56767', border: 'none', cursor: 'pointer' }}
            onClick={() => navigate('/profile')}
          >
            프로필
          </button>
        </li>
        <li>
          <button
            className="navi_content"
            style={{ color: '#ffffff', backgroundColor: '#FDD4D4', border: 'none', cursor: 'pointer' }}
            onClick={() => navigate('/analyze')}
          >
            대화분석
          </button>
        </li>
      </ul>
    </div>
  );
}


const App = () => {
    return (
        <Router>
          <div>
                <NavigationBar/>
                <Routes>
                    <Route path="/" element={<Start />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/analyze" element={<Analyze />} />
                    {/* <Route path="/record" element={<Record />} /> */}
                    <Route path="/analyze_result" element={<AnalyzeResult />} />
                </Routes>
            </div>
        </Router>
    )
}
export default App;