import './analyze_result.css'
import { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router';

const AnalyzeResult = () => {
  //const navigate = useNavigate();
  const [analysisResult, setAnalysisResult] = useState({
    response: ''
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/analyze_result') // 서버의 엔드포인트에 맞게 수정 필요
      .then(response => {
        if (!response.ok) {
          throw new Error('분석 결과를 불러오는 데 실패했습니다');
        }
        return response.json();
      })
      .then(data => {
        console.log('분석 결과:', data);
        setAnalysisResult({
          response: data.response
        });
      })
      .catch(error => {
        console.error('분석 결과를 가져오는 중 에러 발생:', error);
      });
  }, []);

  useEffect(() => {
    const matchPercent = analysisResult.response.match(/\d+% Interest Level/);
    if (matchPercent) {
      const percent = matchPercent[0].replace('% Interest Level', '');
      localStorage.setItem('babyPercent', percent); // LocalStorage에 저장
    }
  }, [analysisResult.response]);


  return (
    <div className="App">
      <div className='content_container'>
      <div className="analyze_result">
        <h1 style={{fontSize:'40px', fontWeight:'bold', color:'#F1A7A7', marginBottom:'20px'}}>대화 내용 분석</h1>
        <p className='result'>{analysisResult.response}</p>
      </div>
      </div>
    </div>
  );
}

export default AnalyzeResult;
