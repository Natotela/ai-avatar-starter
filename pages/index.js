import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [input, setInput] = useState('');
  const [img, setImg] = useState(''); 
  const onChange = (event) => {
    setInput(event.target.value);
  };
  
  async function generateAction() {
    console.log('Generating...');
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
      },
      body: JSON.stringify({ input }),
    });
  
    const data = await response.json();

    if (response.status === 503) {
      console.log('Model is loading still :(.')
      return;
    }
    if (!response.ok) {
      console.log(`Error: ${data.error}`);
      return;
    }

    setImg(data.image);
  
  }

  return (
    <div className="root">
      <Head>
        <title>IC4 Avatar Generator</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generation XXX,whY,ZzZzZ... Generation IC4</h1>
          </div>
          <div className="prompt-container">
            <input className="prompt-box" value={input} onChange={onChange} />
            <div className="prompt-buttons">
              <a className="generate-button" onClick={generateAction}>
                <div className="generate">
                  <p>deGenerate</p>
                </div>
              </a>
            </div>
          </div>
          <div className="header-subtitle">
            <h2>A.I. ic4 avatar generator</h2>
            <h3>use the phrase ic4 in your prompt</h3>
          </div>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-avatar"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>BuildSpace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
