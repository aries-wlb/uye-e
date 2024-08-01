import { useState } from 'react'
import { Button, Input } from 'antd';
import JsonView from '@uiw/react-json-view';
import './App.css'

const { TextArea } = Input;
function App() {
  // useEffect(() => {
  //   chrome.action.onClicked.addListener((tab: unknown) => {
  //     console.log(tab)
  //   });
  // }, [])

  const [text, setText] = useState('');
  const [resp, setResp] = useState({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
    setText(e.target.value);
  };

  const onTransform = () => {
    console.log('Transform');
    const info = text.split('|')[4]
    const data = JSON.parse(info);
    setResp(JSON.parse(data.resp));
  };

  return (
    <>
      <TextArea rows={4} onChange={onChange}/>
      <Button type="primary" onClick={onTransform}>Transform</Button>
      <div>
        <JsonView value={resp}/>
      </div>
    </>
  )
}

export default App

