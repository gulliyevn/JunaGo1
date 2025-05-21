// Monaco Editor Configuration
let editor;
let currentFile = 'project/index.html';
let currentLanguage = 'html';
let fileContents = {
    'project/index.html': '',
    'project/styles.css': '',
    'project/js/main.js': ''
};

// Initialize Monaco Editor
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' }});
require(['vs/editor/editor.main'], function() {
    // Create the editor instance
    editor = monaco.editor.create(document.getElementById('monaco-editor'), {
        value: '',
        language: currentLanguage,
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBars: {
            vertical: 'visible',
            horizontal: 'visible'
        },
        renderLineHighlight: 'all',
        renderIndentGuides: true,
        renderFinalNewline: true,
    });
    
    // Load initial file
    loadFile(currentFile);
    
    // Add editor change event
    editor.onDidChangeModelContent(() => {
        fileContents[currentFile] = editor.getValue();
        updateStatusBar();
    });
    
    // Add cursor position change event
    editor.onDidChangeCursorPosition(e => {
        document.querySelector('.status-position').textContent = `Ln ${e.position.lineNumber}, Col ${e.position.column}`;
    });
});

// Load file content
async function loadFile(filePath) {
    try {
        // If we already have the content cached, use it
        if (fileContents[filePath] !== undefined) {
            updateEditor(fileContents[filePath], getLanguageFromFilePath(filePath));
            return;
        }
        
        // Otherwise, fetch the file content
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load file: ${filePath}`);
        }
        
        const content = await response.text();
        fileContents[filePath] = content;
        updateEditor(content, getLanguageFromFilePath(filePath));
    } catch (error) {
        console.error(error);
        updateEditor('// Error loading file', 'plaintext');
    }
}

// Update editor with content and language
function updateEditor(content, language) {
    currentLanguage = language;
    
    // Update language in status bar
    document.querySelector('.status-item').textContent = language.toUpperCase();
    
    // Set editor model
    const oldModel = editor.getModel();
    const newModel = monaco.editor.createModel(content, language);
    editor.setModel(newModel);
    
    if (oldModel) {
        oldModel.dispose();
    }
    
    updateStatusBar();
}

// Get language based on file extension
function getLanguageFromFilePath(filePath) {
    const extension = filePath.split('.').pop().toLowerCase();
    
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
}

// Update status bar
function updateStatusBar() {
    // Update file status indicator
    const fileStatus = document.querySelectorAll('.status-item')[2];
    fileStatus.textContent = `${currentFile.split('/').pop()}${fileContents[currentFile] === '' ? '' : '*'}`;
}

// File tree functionality
document.addEventListener('DOMContentLoaded', function() {
    // Toggle folder content
    const folderNames = document.querySelectorAll('.folder-name');
    folderNames.forEach(folder => {
        folder.addEventListener('click', function() {
            const folderContent = this.nextElementSibling;
            folderContent.style.display = folderContent.style.display === 'none' ? 'block' : 'none';
        });
    });
    
    // File selection
    const files = document.querySelectorAll('.file');
    files.forEach(file => {
        file.addEventListener('click', function() {
            // Update active file
            document.querySelector('.active-file')?.classList.remove('active-file');
            this.classList.add('active-file');
            
            // Load the file
            const filePath = this.getAttribute('data-path');
            currentFile = filePath;
            loadFile(filePath);
        });
    });
    
    // Run button functionality
    document.querySelector('.run-button').addEventListener('click', function() {
        // Save all files
        saveFiles();
        
        // Show preview panel
        const previewPanel = document.getElementById('preview-panel');
        previewPanel.classList.add('visible');
        
        // Reload iframe
        const iframe = document.getElementById('preview-iframe');
        iframe.src = 'project/index.html';
    });
    
    // Close preview button
    document.querySelector('.close-preview-button').addEventListener('click', function() {
        document.getElementById('preview-panel').classList.remove('visible');
    });
    
    // Theme toggle
    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            monaco.editor.setTheme('vs-light');
        } else {
            monaco.editor.setTheme('vs-dark');
        }
    });
});

// Save all files to localStorage
function saveFiles() {
    for (const [filePath, content] of Object.entries(fileContents)) {
        localStorage.setItem(`junago-${filePath}`, content);
    }
}

// Load files from localStorage
function loadFilesFromStorage() {
    for (const filePath of Object.keys(fileContents)) {
        const storedContent = localStorage.getItem(`junago-${filePath}`);
        if (storedContent) {
            fileContents[filePath] = storedContent;
        }
    }
} 