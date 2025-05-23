import React from 'react';
import CodeEditorComponent from '../components/Courses/CodeEditor';
import usePageTitle from '../hooks/usePageTitle';
import MainLayout from '../components/layout/MainLayout';

const CodeEditor = () => {
  const pageTitle = usePageTitle('Code Editor');

  return (
    <MainLayout>
      {pageTitle}
      <div className="code-editor-page">
        <div className="container">
          <h1 className="page-title">Code Editor</h1>
          <p className="page-description">
            Practice your coding skills in our interactive environment
          </p>
          <CodeEditorComponent />
        </div>
      </div>
    </MainLayout>
  );
};

export default CodeEditor; 