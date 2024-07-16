import { useState } from 'react';
import './analyze.css'
import { useNavigate } from 'react-router';

const Analyze = () => {

  const navigate = useNavigate();
  const [imageView, setImageView] = useState(null);

  const handle_submit = async (event) => {
        event.preventDefault(); // 버튼 잠시 금지
    
        const formData = new FormData(event.target); // 폼 데이터 생성
        const question = formData.get('question');
        const relationship_status = formData.get('relationship_status');
        const response_time = formData.get('response_time');
        const contact_frequency = formData.get('contact_frequency');
        const contact_duration = formData.get('contact_duration');
        const contact_interval = parseInt(formData.get('contact_interval'), 10);

        const payload = {
          relationship_status,
          response_time,
          contact_frequency,
          contact_duration,
          contact_interval,
          question,
        };
        console.log(payload);
        

        // 서버로 데이터 보내기
        try {
          const response = await fetch('http://127.0.0.1:8000/analyze', {
            method: 'POST',
            // headers: {
            //   'Content-Type': 'application/json', // JSON 형식
            // },
            //body: JSON.stringify(payload)
            body: JSON.stringify(payload)
          });
    
          if (!response.ok) {
            throw new Error('서버 응답 에러');
          }
          navigate('/analyze_result');
        } catch (error) {
          console.error('서버 요청 에러:', error);
        }
      };

      const handle_Image = (event) => {
        const file = event.target.files[0];
          if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageView(reader.result);
          };
        reader.readAsDataURL(file);
      }
  };

  return (
    <div className="App">
      <h1 className="title" style={{fontSize:'40px', fontWeight:'bold', color:'#F1A7A7', marginBottom:'10px', textAlign:'center'}}>대화 내용 분석</h1>
      <div className="content_container">
        <form onSubmit={handle_submit} className='form_content'>
            <div className='question_box'>
              <label>질문</label>
              <input type='text' name='question'/>
            </div>
            <div className='lr_container'>
            <div className='left'>
            <label>그 사람과의 관계</label>
            <input type='text' name='relationship_status'/>
            <label>연락 응답 시간</label>
            <input type='text' name="response_time"/>
            <label>연락 빈도(ex:하루에 한번)</label>
            <input type='text' name='contact_frequency'/>
            <label>연락 한 기간</label>
            <input type='text' name='contact_duration'/>
          </div>
          <div className='right'>
            <label>연락 텀(1분~하루이상)</label>
            <input type='range' name='contact_interval'/>
            <label>이미지 업로드</label>
            <div style={{}}>
              <input type='file' name='upload' style={{height: '200px', alignContent:'center', fontSize:'0px'}}  onChange={handle_Image} className='image'/>
              {imageView && <img src={imageView} alt="미리보기" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />}
            </div>
          </div>
          <button type='submit'>➤</button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default Analyze;
