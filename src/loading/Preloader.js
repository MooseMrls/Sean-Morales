import React, { useState, useEffect } from 'react';
import './Preloader.css';

const Preloader = ({ onLoadComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [typedText, setTypedText] = useState('');

  const codeSteps = [
    'Initializing system...',
    'Loading modules...',
    'Compiling components...',
    'Establishing connections...',
    'Ready to deploy!'
  ];

  const terminalCommands = [
    '> npm install experience',
    '> git clone skills.git',
    '> docker run --portfolio',
    '> kubectl apply -f talent.yaml',
    '> Portfolio deployed successfully ✓'
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= codeSteps.length - 1) {
          clearInterval(stepInterval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              onLoadComplete && onLoadComplete();
            }, 3000);
          }, 1500);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(stepInterval);
  }, [onLoadComplete]);

  useEffect(() => {
    if (currentStep < terminalCommands.length) {
      const command = terminalCommands[currentStep];
      let index = 0;
      setTypedText('');
      
      const typeInterval = setInterval(() => {
        if (index <= command.length) {
          setTypedText(command.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    }
  }, [currentStep]);

  const generateMatrix = () => {
    return Array.from({ length: 15 }, (_, i) => (
      <div 
        key={i} 
        className="matrix-column"
        style={{
          '--delay': `${Math.random() * 3}s`,
          '--duration': `${2 + Math.random() * 2}s`
        }}
      >
        {Array.from({ length: 20 }, (_, j) => (
          <span key={j} className="matrix-char">
            {Math.random() > 0.5 ? '1' : '0'}
          </span>
        ))}
      </div>
    ));
  };

  return (
    <div className={`preloader ${isComplete ? 'fade-out' : ''}`}>
      <div className="matrix-bg">
        {generateMatrix()}
      </div>
      
      <div className="preloader-content">
        <div className="code-editor">
          <div className="editor-header">
            <div className="editor-buttons">
              <span className="btn-close"></span>
              <span className="btn-minimize"></span>
              <span className="btn-maximize"></span>
            </div>
            <div className="editor-title">portfolio.jsx</div>
          </div>
          
          <div className="editor-content">
            <div className="line-numbers">
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            
            <div className="code-content">
              <div className="code-line">
                <span className="keyword">const</span> <span className="variable">developer</span> = {'{'}
              </div>
              <div className="code-line">
                &nbsp;&nbsp;<span className="property">name</span>: <span className="string">"Sean Morales"</span>,
              </div>
              <div className="code-line">
                &nbsp;&nbsp;<span className="property">role</span>: <span className="string">"Software Engineer"</span>,
              </div>
              {/* <div className="code-line">
                &nbsp;&nbsp;<span className="property">skills</span>: [<span className="string">"React"</span>, <span className="string">"Node.js"</span>, <span className="string">"JavaScript"</span>],
              </div> */}
              <div className="code-line">
                &nbsp;&nbsp;<span className="property">passion</span>: <span className="string">"Building Solutions"</span>
              </div>
              <div className="code-line">{'};'}</div>
              <div className="code-line"></div>
              <div className="code-line">
                <span className="keyword">export default</span> <span className="variable">developer</span>;<span className="cursor">|</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="terminal">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="btn-close"></span>
              <span className="btn-minimize"></span>
              <span className="btn-maximize"></span>
            </div>
            <div className="terminal-title">Terminal</div>
          </div>
          
          <div className="terminal-content">
            {terminalCommands.slice(0, currentStep + 1).map((cmd, index) => (
              <div key={index} className="terminal-line">
                {index === currentStep ? typedText : cmd}
                {index === currentStep && <span className="terminal-cursor">_</span>}
              </div>
            ))}
          </div>
        </div> */}

        <div className="loading-status">
          <div className="status-text">{codeSteps[currentStep]}</div>
          {/* <div className="circuit-animation">
            <div className="circuit-dot"></div>
            <div className="circuit-line"></div>
            <div className="circuit-dot"></div>
            <div className="circuit-line vertical"></div>
            <div className="circuit-dot"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Preloader;