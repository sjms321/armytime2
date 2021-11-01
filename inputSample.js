function InputSample() {
    const [text, setText] = useState('');
    // 하단 input 박스에서 값 변경 시 이벤트 객체가 파라미터(e)에 담겨서 온다.
    const onChange = (e) => {
        // e.target에는 이벤트가 발생한 input DOM에 대한 정보를 가지고 있다.
        console.log(e.target);
        // 이벤트가 발생한 DOM의 값 가져오기
        console.log(e.target.value);
        setText(e.target.value);
    }
    // 초기화
    const onReset = () => {
        setText('');
    }
    return (
        <div>
            <input onChange={onChange} value={text} />
            <button onClick={onReset}>s초기화</button>
            <div>
                <b>값 : </b>
                {text}
            </div>
        </div>
    )
}

export default InputSample;