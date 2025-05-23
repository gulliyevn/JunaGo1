// src/components/Courses/CodeEditor.js
import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { Button } from '../../components/common/Button/Button';
import '../../styles/components/CodeEditor.css';

export default function CodeEditor() {
    const [activeTab, setActiveTab] = useState('javascript');
    const [code, setCode] = useState(`// Write your code here
function greetUser(name) {
  // Your implementation
}

function sumNumbers(a, b) {
  // Your implementation
}
`);
    const [consoleOutput, setConsoleOutput] = useState('> Ready to run code...');
    const consoleRef = useRef(null);

    // Scroll console to bottom when output changes
    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [consoleOutput]);

    // Run code function
    const runCode = () => {
        let newOutput = `${consoleOutput}\n> Running code...\n`;
        setConsoleOutput(newOutput);

        try {
            // Save original console.log
            const originalConsoleLog = console.log;
            let logs = '';

            // Override console.log to capture output
            console.log = function() {
                const args = Array.from(arguments);
                logs += args.join(' ') + '\n';
                originalConsoleLog.apply(console, arguments);
            };

            // Execute code (Note: this is not secure for production)
            const result = new Function(code)();

            // Restore console.log
            console.log = originalConsoleLog;

            // Display results
            if (logs) {
                newOutput += logs;
            }

            if (result !== undefined) {
                newOutput += `Result: ${result}\n`;
            }

            newOutput += '> Execution complete\n';
            setConsoleOutput(newOutput);
        } catch (error) {
            newOutput += `Error: ${error.message}\n`;
            setConsoleOutput(newOutput);
        }
    };

    // Clear console
    const clearConsole = () => {
        setConsoleOutput('> Console cleared\n');
    };

    // Определяем расширения редактора в зависимости от активной вкладки
    const getExtensions = () => {
        return activeTab === 'javascript' ? [javascript()] : [html()];
    };

    return (
        <div className="code-editor-container">
            <div className="editor-header">
                <h3 className="editor-title">
                    <i className="code-icon"></i>
                    Practice Environment
                </h3>
            </div>

            <div className="editor-content">
                {/* Code tabs */}
                <div className="code-tabs">
                    <Button 
                        variant={activeTab === 'javascript' ? 'primary' : 'secondary'}
                        size="small"
                        className={`code-tab ${activeTab === 'javascript' ? 'active' : ''}`}
                        onClick={() => setActiveTab('javascript')}
                    >
                        script.js
                    </Button>
                    <Button 
                        variant={activeTab === 'html' ? 'primary' : 'secondary'}
                        size="small"
                        className={`code-tab ${activeTab === 'html' ? 'active' : ''}`}
                        onClick={() => setActiveTab('html')}
                    >
                        index.html
                    </Button>
                </div>

                {/* Code editor */}
                <div className="code-editor-wrapper">
                    <CodeMirror
                        value={code}
                        height="300px"
                        theme={oneDark}
                        extensions={getExtensions()}
                        onChange={(value) => setCode(value)}
                        basicSetup={{
                            lineNumbers: true,
                            highlightActiveLine: true,
                            bracketMatching: true,
                            closeBrackets: true,
                            indentOnInput: true,
                            tabSize: 2,
                        }}
                    />
                </div>

                {/* Console output */}
                <div className="console-container">
                    <div className="console-header">
                        <span>Console</span>
                        <div className="console-controls">
                            <Button 
                                variant="primary"
                                size="small"
                                className="run-code-button"
                                onClick={runCode}
                            >
                                Run <i className="run-icon"></i>
                            </Button>
                            <Button 
                                variant="secondary"
                                size="small"
                                className="clear-console-button"
                                onClick={clearConsole}
                            >
                                <i className="trash-icon"></i> Clear
                            </Button>
                        </div>
                    </div>
                    <div
                        className="console-output"
                        ref={consoleRef}
                    >
                        {consoleOutput}
                    </div>
                </div>
            </div>
        </div>
    );
}