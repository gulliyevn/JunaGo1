import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import PlaceholderImage from '../../components/common/PlaceholderImage';
import ChatbotWidget from '../../components/Chatbot/ChatbotWidget';
import { useChatbot } from '../../contexts/ChatbotContext';
import styles from './WorkspacePage.module.css';

/**
 * Workspace page with integrated code editor and AI assistant
 */
const WorkspacePage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { openChatbot } = useChatbot();
  const [activeProject, setActiveProject] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [showBuiltInAssistant, setShowBuiltInAssistant] = useState(true);
  const [files, setFiles] = useState([
    { id: 'file1', name: 'index.html', language: 'html', content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Project</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n  <p>Welcome to my project</p>\n</body>\n</html>' },
    { id: 'file2', name: 'styles.css', language: 'css', content: 'body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n  color: #333;\n}\n\nh1 {\n  color: #0066cc;\n}' },
    { id: 'file3', name: 'script.js', language: 'javascript', content: 'document.addEventListener("DOMContentLoaded", function() {\n  console.log("Page loaded!");\n  \n  // Add event listeners\n  document.querySelector("h1").addEventListener("click", function() {\n    alert("Hello from JavaScript!");\n  });\n});' }
  ]);
  
  const projectsList = [
    { id: 'proj1', name: 'Personal Website', description: 'A simple personal portfolio website' },
    { id: 'proj2', name: 'Todo App', description: 'A basic todo application with React' },
    { id: 'proj3', name: 'Weather Dashboard', description: 'A weather dashboard using OpenWeather API' }
  ];

  // Initialize chatbot on component mount
  useEffect(() => {
    openChatbot();
  }, [openChatbot]);

  const handleFileSelect = (file) => {
    setCurrentFile(file);
  };

  const handleProjectSelect = (project) => {
    setActiveProject(project);
    // Reset selected file when changing projects
    setCurrentFile(null);
  };

  const handleEditorChange = (value) => {
    if (currentFile) {
      const updatedFiles = files.map(file => 
        file.id === currentFile.id ? { ...file, content: value } : file
      );
      setFiles(updatedFiles);
    }
  };

  return (
    <div className={styles.workspaceFullContainer}>
      {/* Home button */}
      <Link to="/" className={styles.homeButton}>
        🏠
      </Link>

      <div className={styles.workspaceContainer}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h3>Projects</h3>
            <button className={styles.newButton}>+ New</button>
          </div>
          
          <div className={styles.projectList}>
            {projectsList.map((project) => (
              <div 
                key={project.id}
                className={`${styles.projectItem} ${activeProject?.id === project.id ? styles.active : ''}`}
                onClick={() => handleProjectSelect(project)}
              >
                <span className={styles.projectIcon}>📁</span>
                <div className={styles.projectInfo}>
                  <h4>{project.name}</h4>
                  <p>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main content */}
        <div className={styles.mainContent}>
          {activeProject ? (
            <>
              <div className={styles.fileNavBar}>
                <div className={styles.breadcrumbs}>
                  <span>{activeProject.name}</span>
                  <span> / </span>
                  <span>{currentFile?.name || 'Select a file'}</span>
                </div>
                
                <div className={styles.tabList}>
                  {files.map((file) => (
                    <div 
                      key={file.id}
                      className={`${styles.fileTab} ${currentFile?.id === file.id ? styles.activeTab : ''}`}
                      onClick={() => handleFileSelect(file)}
                    >
                      {file.name}
                      <span className={styles.closeTab}>×</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.editorContainer}>
                {currentFile ? (
                  <div className={styles.codeEditor}>
                    {/* This would be replaced with Monaco Editor once dependencies are resolved */}
                    <textarea
                      value={currentFile.content}
                      onChange={(e) => handleEditorChange(e.target.value)}
                      className={styles.editorTextarea}
                    />
                  </div>
                ) : (
                  <div className={styles.noFileSelected}>
                    <PlaceholderImage 
                      width={300} 
                      height={200} 
                      text="Select a file to edit" 
                      colorScheme="blue"
                    />
                    <h3>No file selected</h3>
                    <p>Select a file from the list to start editing</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.noProjectSelected}>
              <PlaceholderImage 
                width={300} 
                height={200} 
                text="Select a project" 
                colorScheme="purple"
              />
              <h2>Welcome to your JunaGO Workspace</h2>
              <p>Select a project to get started or create a new one</p>
              <button className={styles.createProjectButton}>Create New Project</button>
            </div>
          )}
        </div>
        
        {/* AI Assistant panel integrated directly into the workspace */}
        {showBuiltInAssistant && (
          <div className={styles.aiAssistant}>
            <div className={styles.assistantHeader}>
              <h3>AI Coding Assistant</h3>
              <div className={styles.assistantControls}>
                <button className={styles.minimizeButton}>_</button>
              </div>
            </div>
            
            <div className={styles.conversationContainer}>
              <div className={styles.conversation}>
                <div className={styles.assistantMessage}>
                  <span className={styles.assistantAvatar}>🤖</span>
                  <div className={styles.messageContent}>
                    <p>Hello! I'm your coding assistant. How can I help you with your project today?</p>
                  </div>
                </div>
                
                <div className={styles.userMessage}>
                  <div className={styles.messageContent}>
                    <p>How do I center a div?</p>
                  </div>
                  <span className={styles.userAvatar}>👤</span>
                </div>
                
                <div className={styles.assistantMessage}>
                  <span className={styles.assistantAvatar}>🤖</span>
                  <div className={styles.messageContent}>
                    <p>There are several ways to center a div:</p>
                    <pre className={styles.codeSample}>
{`.centered-div {
  /* Using Flexbox */
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* OR using Grid */
  display: grid;
  place-items: center;
  
  /* OR using absolute positioning */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`}
                    </pre>
                    <p>Which approach would you like to use?</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.inputArea}>
              <textarea 
                placeholder="Ask me anything about coding..."
                className={styles.assistantInput}
              ></textarea>
              <button className={styles.sendButton}>Send</button>
            </div>
          </div>
        )}
        
        {!showBuiltInAssistant && <ChatbotWidget />}
      </div>
    </div>
  );
};

export default WorkspacePage; 