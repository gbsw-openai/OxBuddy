import './start.css'
import { useNavigate } from 'react-router';

const Start = () => {

  const navigate = useNavigate();

  return (
    <div className="App">
      <img src='/okbun.png' className='okbun' alt="okbun"></img>
      <img src='/dobun.png' className='dobun' alt="dobun"></img>
      <div className="content_container">
        <p style={{color:'#F1A7A7', fontSize: '40px', fontWeight: 'bold',marginTop:'0px', marginBottom:'40px', textAlign: 'center'}}>그 사람과의 연애 가능성이 궁금하시다구요?</p>
        <div style={{ margin: '0 auto', width: '800px', textAlign: 'center'}}>
        <p style={{color:'#FDC0C0', fontSize: '25px', textAlign:'left'}}>"마지막으로 연락한 시간은?"</p>
        <p style={{color:'#FDC0C0', fontSize: '25px', textAlign:'left'}}>"연락 텀은?"</p>
        <p style={{color:'#FDC0C0', fontSize: '25px', textAlign:'left'}}>"연락 응답 시간은?"</p>
        <p style={{color:'#FDC0C0', fontSize: '25px', textAlign:'left'}}>"연락할 때 말투는?"</p>
        <p style={{color:'#FDD4D4',fontSize: '30px', marginBottom:'50px'}}>이젠 <p style={{fontSize: '45px', fontWeight:'bold'}}>고민</p> 그만! AI 대화 분석을 통한 확실한 솔루션</p>
        <button className="solve_problem" onClick={()=>navigate('/analyze')}>문제 해결해 보기!</button>
        </div>
      </div>
    </div>
  );
}

export default Start;
