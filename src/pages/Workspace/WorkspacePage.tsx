import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useChatbot } from '../../contexts/ChatbotContext';
import './WorkspaceEditor.css';
import * as monaco from 'monaco-editor';

interface CursorPosition {
  lineNumber: number;
  column: number;
}

interface FileContents {
  [key: string]: string;
}

/**
 * Monaco-based Workspace page with integrated code editor
 */
const WorkspacePage: React.FC = () => {
  const { user } = useAuth();
  const { openChatbot } = useChatbot();
  
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof monaco | null>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  
  const [currentFile, setCurrentFile] = useState<string>('project/index.html');
  const [currentLanguage, setCurrentLanguage] = useState<string>('html');
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ lineNumber: 1, column: 1 });
  const [fileContents, setFileContents] = useState<FileContents>({
    'project/index.html': 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Hello, JunaGO Workspace!</h1>
    <p>Start coding your amazing project here.</p>
    
    <script src="js/main.js"></script>
</body>
</html>`,
    'project/styles.css': 
`body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
    color: #333;
}

h1 {
    color: #2563eb;
    font-size: 24px;
}

p {
    line-height: 1.6;
}`,
    'project/js/main.js': 
`// main.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document is ready!');
    
    // You can add your JavaScript code here
    const greeting = 'Welcome to JunaGO!';
    console.log(greeting);
    
    // Example: Add a click event to the h1 element
    const h1Element = document.querySelector('h1');
    if (h1Element) {
        h1Element.addEventListener('click', function() {
            this.style.color = getRandomColor();
        });
    }
    
    // Function to generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});`
  });
  
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [darkTheme, setDarkTheme] = useState<boolean>(true);

  // Initialize Monaco editor and load initial file
  useEffect(() => {
    // Ensure Monaco is properly configured
    if (!window.MonacoEnvironment) {
      window.MonacoEnvironment = {
        getWorkerUrl: function (_moduleId: string, label: string) {
          if (label === 'json') {
            return '/static/json.worker.js';
          }
          if (label === 'css' || label === 'scss' || label === 'less') {
            return '/static/css.worker.js';
          }
          if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return '/static/html.worker.js';
          }
          if (label === 'typescript' || label === 'javascript') {
            return '/static/ts.worker.js';
          }
          return '/static/editor.worker.js';
        }
      };
    }
    
    // Load Monaco Editor
    const loadMonaco = async () => {
      try {
        const Monaco = await import('monaco-editor');
        monacoRef.current = Monaco;
        
        // Set Monaco default theme
        Monaco.editor.defineTheme('vs-dark-custom', {
          base: 'vs-dark',
          inherit: true,
          rules: [],
          colors: {
            'editor.background': '#1a1a2e',
            'editor.lineHighlightBackground': '#16213e',
            'editorLineNumber.foreground': '#60a5fa',
            'editorCursor.foreground': '#ffffff'
          }
        });
        
        Monaco.editor.defineTheme('vs-light-custom', {
          base: 'vs',
          inherit: true,
          rules: [],
          colors: {
            'editor.background': '#ffffff',
            'editor.lineHighlightBackground': '#f5f5f5',
            'editorLineNumber.foreground': '#98B5A4',
            'editorCursor.foreground': '#333333'
          }
        });
        
        // Make sure the container element exists
        if (!editorContainerRef.current) {
          console.error('Editor container element not found');
          return;
        }
        
        // Create editor instance
        const editor = Monaco.editor.create(editorContainerRef.current, {
          value: fileContents[currentFile],
          language: getLanguageFromFilePath(currentFile),
          theme: darkTheme ? 'vs-dark-custom' : 'vs-light-custom',
          automaticLayout: true,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          renderLineHighlight: 'all',
          guides: { indentation: true },
        });
        
        editorRef.current = editor;
        
        // Add editor change event
        editor.onDidChangeModelContent(() => {
          setFileContents(prev => ({
            ...prev,
            [currentFile]: editor.getValue()
          }));
        });
        
        // Add cursor position change event
        editor.onDidChangeCursorPosition((e: monaco.editor.ICursorPositionChangedEvent) => {
          setCursorPosition({ 
            lineNumber: e.position.lineNumber, 
            column: e.position.column 
          });
        });
      } catch (error) {
        console.error('Error initializing Monaco editor:', error);
      }
    };
    
    loadMonaco();
    
    return () => {
      // Cleanup
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, []);
  
  // Update editor when selected file changes
  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      const language = getLanguageFromFilePath(currentFile);
      setCurrentLanguage(language);
      
      try {
        // Update model
        const oldModel = editorRef.current.getModel();
        const newModel = monacoRef.current.editor.createModel(
          fileContents[currentFile], 
          language
        );
        
        editorRef.current.setModel(newModel);
        
        if (oldModel) {
          oldModel.dispose();
        }
      } catch (error) {
        console.error('Error updating editor model:', error);
      }
    }
  }, [currentFile, fileContents]);
  
  // Update theme when theme changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ 
        theme: darkTheme ? 'vs-dark-custom' : 'vs-light-custom' 
      });
    }
  }, [darkTheme]);
  
  // Get language based on file extension
  const getLanguageFromFilePath = (filePath: string): string => {
    const extension = filePath.split('.').pop()?.toLowerCase() || '';
    
    switch (extension) {
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'js':
        return 'javascript';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      default:
        return 'plaintext';
    }
  };
  
  // Handle file selection
  const handleFileClick = (filePath: string): void => {
    setCurrentFile(filePath);
  };
  
  // Toggle folder content display
  const toggleFolder = (e: React.MouseEvent): void => {
    const target = e.target as HTMLElement;
    const folderContent = target.closest('.folder-name')?.nextElementSibling as HTMLElement;
    if (folderContent) {
      folderContent.style.display = folderContent.style.display === 'none' ? 'block' : 'none';
    }
  };
  
  // Run code and show preview
  const handleRun = (): void => {
    // Show preview panel
    setPreviewVisible(true);
  };
  
  // Close preview panel
  const handleClosePreview = (): void => {
    setPreviewVisible(false);
  };
  
  // Toggle theme
  const handleToggleTheme = (): void => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Update document theme
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-theme');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.body.classList.remove('dark-theme');
    }
  };

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setDarkTheme(true);
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-theme');
    } else if (savedTheme === 'light') {
      setDarkTheme(false);
      document.documentElement.removeAttribute('data-theme');
      document.body.classList.remove('dark-theme');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkTheme(prefersDark);
      
      if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.add('dark-theme');
      }
    }
  }, []);

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <div className="top-navbar">
        <div className="menu-section">
          <div className="menu-item">File</div>
          <div className="menu-item">Edit</div>
          <div className="menu-item">View</div>
          <div className="menu-item">Navigate</div>
          <div className="menu-item">Code</div>
          <div className="menu-item">Run</div>
          <div className="menu-item">Tools</div>
          <div className="menu-item">Window</div>
          <div className="menu-item">Help</div>
        </div>
      </div>
      
      {/* Workspace Header */}
      <div className="workspace-header">
        <div className="workspace-title">
          <i className="fas fa-code"></i>
          <span>JunaGO Workspace</span>
        </div>
        <div className="workspace-actions">
          <button className="action-button run-button" onClick={handleRun}>
            <i className="fas fa-play"></i>
            <span>Run</span>
          </button>
          <button className="action-button invite-button">
            <i className="fas fa-user-plus"></i>
            <span>Invite</span>
          </button>
          <button className="action-button deploy-button">
            <i className="fas fa-rocket"></i>
            <span>Deploy</span>
          </button>
          <div className="theme-toggle">
            <input 
              type="checkbox" 
              id="theme-switch" 
              className="theme-switch" 
              checked={!darkTheme}
              onChange={handleToggleTheme}
            />
            <label htmlFor="theme-switch" className="theme-label"></label>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="main-content">
        {/* Project Explorer Sidebar */}
        <div className="project-explorer">
          <div className="explorer-header">
            <div className="explorer-title">Project</div>
            <button className="add-button">+</button>
          </div>
          <div className="file-tree">
            <div className="folder">
              <div className="folder-name" onClick={toggleFolder}>
                <i className="fas fa-folder"></i>
                <span>project</span>
              </div>
              <div className="folder-content">
                <div 
                  className={`file ${currentFile === 'project/index.html' ? 'active-file' : ''}`} 
                  onClick={() => handleFileClick('project/index.html')}
                >
                  <i className="fas fa-file-code"></i>
                  <span>index.html</span>
                </div>
                <div 
                  className={`file ${currentFile === 'project/styles.css' ? 'active-file' : ''}`} 
                  onClick={() => handleFileClick('project/styles.css')}
                >
                  <i className="fas fa-file-code"></i>
                  <span>styles.css</span>
                </div>
                <div className="folder">
                  <div className="folder-name" onClick={toggleFolder}>
                    <i className="fas fa-folder"></i>
                    <span>js</span>
                  </div>
                  <div className="folder-content">
                    <div 
                      className={`file ${currentFile === 'project/js/main.js' ? 'active-file' : ''}`} 
                      onClick={() => handleFileClick('project/js/main.js')}
                    >
                      <i className="fas fa-file-code"></i>
                      <span>main.js</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Editor Area */}
        <div className="editor-container">
          <div id="monaco-editor" ref={editorContainerRef}></div>
          <div className="editor-status-bar">
            <div className="status-items">
              <div className="status-item">{currentLanguage.toUpperCase()}</div>
              <div className="status-item">UTF-8</div>
              <div className="status-item">LF</div>
            </div>
            <div className="status-position">
              Ln {cursorPosition.lineNumber}, Col {cursorPosition.column}
            </div>
            <div className="status-items">
              <div className="status-item">Spaces: 2</div>
              <div className="status-item">{currentFile.split('/').pop()}*</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Preview Panel */}
      <div className={`preview-panel ${previewVisible ? 'visible' : ''}`} id="preview-panel">
        <div className="preview-header">
          <span>Preview</span>
          <button className="close-preview-button" onClick={handleClosePreview}>×</button>
        </div>
        <iframe 
          id="preview-iframe" 
          srcDoc={fileContents['project/index.html']}
          title="Preview"
          sandbox="allow-scripts"
        ></iframe>
      </div>
    </div>
  );
};

export default WorkspacePage; 