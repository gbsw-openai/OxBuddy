import './record.css'
import { useNavigate } from 'react-router';

const records = ['박민서와의 기록 1번째','김유진과의 기록 1번째','박민서와의 기록 2번째','김유진과의 기록 2번째','',''];

const Record = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className='header'>
        
      </div>
      <h1 style={{textAlign: 'center', color:'#F1A7A7', marginBottom:'70px',fontSize:'40px', fontWeight:'bold'}}>지금까지 한 기록보기</h1>
      <div className="content_container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 35%)', gap: '80px', width:'100%', justifyContent:'space-around'}}>
            {records.map((record, index) => (
              <div key={index} className="records" style={{ border: 'none', padding: '10px', textAlign: 'center' }}>
                {record!=''? '기록'+(index+1) : 'ㅡ'}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}


export default Record;
