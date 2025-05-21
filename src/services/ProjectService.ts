import { Project, ProjectActivity, Contributor } from '../types/Project';
import { API_URL } from '../config/constants';

// Mock data until backend is ready
const mockContributors: Contributor[] = [
  { id: '1', name: 'Alex Peterson', avatarUrl: '/api/placeholder/32/32' },
  { id: '2', name: 'Sarah Kim', avatarUrl: '/api/placeholder/32/32' },
  { id: '3', name: 'Michael Chen', avatarUrl: '/api/placeholder/32/32' },
  { id: '4', name: 'Emma Wilson', avatarUrl: '/api/placeholder/32/32' },
  { id: '5', name: 'James Johnson', avatarUrl: '/api/placeholder/32/32' }
];

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'DevConnect',
    description: 'Modern developer networking platform with TypeScript, Redux Toolkit, MongoDB, and real-time collaboration features.',
    type: 'web',
    tags: ['React', 'TypeScript', 'Redux', 'MongoDB'],
    stars: 128,
    forks: 24,
    likes: 43,
    comments: 12,
    contributors: mockContributors.slice(0, 4),
    createdAt: new Date(new Date().setDate(new Date().getDate() - 60)).toISOString(),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    starred: true
  },
  {
    id: '2',
    name: 'Travel App UI',
    description: 'Beautiful travel booking application UI built with React Native and Expo, featuring interactive maps and animations.',
    type: 'mobile',
    tags: ['React Native', 'Expo', 'Animation', 'Maps API'],
    stars: 76,
    forks: 15,
    likes: 28,
    comments: 8,
    contributors: mockContributors.slice(1, 4),
    createdAt: new Date(new Date().setDate(new Date().getDate() - 90)).toISOString(),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString()
  },
  {
    id: '3',
    name: 'E-commerce API',
    description: 'Complete RESTful API for e-commerce platforms with Node.js, Express, and MongoDB. Includes authentication, payments, and order management.',
    type: 'api',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    stars: 92,
    forks: 31,
    likes: 19,
    comments: 7,
    contributors: mockContributors.slice(0, 5),
    createdAt: new Date(new Date().setDate(new Date().getDate() - 120)).toISOString(),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString()
  },
  {
    id: '4',
    name: 'AI Image Generator',
    description: 'Web application that uses AI to generate and manipulate images based on text prompts. Built with React, Node.js and TensorFlow.js.',
    type: 'ai',
    tags: ['AI/ML', 'TensorFlow', 'React', 'Canvas API'],
    stars: 143,
    forks: 42,
    likes: 56,
    comments: 23,
    contributors: mockContributors.slice(0, 5),
    createdAt: new Date(new Date().setDate(new Date().getDate() - 180)).toISOString(),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString()
  }
];

const mockActivities: ProjectActivity[] = [
  {
    id: '1',
    projectId: '1',
    type: 'branch',
    title: 'Created new branch',
    text: 'Created feature/auth-system from main in DevConnect',
    time: new Date(new Date().setHours(new Date().getHours() - 3)).toISOString(),
    codeSnippet: '+Added JWT authentication with refresh tokens\n+Improved login/signup forms\n+Implemented OAuth providers'
  },
  {
    id: '2',
    projectId: '4',
    type: 'star',
    title: 'Received recognition',
    text: 'Alex Johnson and 5 others starred your AI Image Generator project',
    time: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    contributors: mockContributors.slice(0, 3),
    contributorsCount: 6
  },
  {
    id: '3',
    projectId: '3',
    type: 'commit',
    title: 'Made 14 commits',
    text: 'Pushed to main in E-commerce API',
    time: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    link: '#',
    linkText: 'View changes'
  },
  {
    id: '4',
    projectId: '2',
    type: 'team',
    title: 'Added new team member',
    text: 'Added Sarah Kim as a contributor to Travel App UI',
    time: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    contributors: [mockContributors[1]]
  }
];

export class ProjectService {
  static async getProjects(): Promise<Project[]> {
    try {
      // For future implementation:
      // const response = await fetch(`${API_URL}/projects`);
      // return await response.json();
      
      return new Promise(resolve => {
        setTimeout(() => resolve(mockProjects), 1000);
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }
  
  static async getProject(id: string): Promise<Project | null> {
    try {
      // For future implementation:
      // const response = await fetch(`${API_URL}/projects/${id}`);
      // return await response.json();
      
      return new Promise(resolve => {
        setTimeout(() => {
          const project = mockProjects.find(p => p.id === id) || null;
          resolve(project);
        }, 500);
      });
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      return null;
    }
  }
  
  static async getActivities(): Promise<ProjectActivity[]> {
    try {
      // For future implementation:
      // const response = await fetch(`${API_URL}/activities`);
      // return await response.json();
      
      return new Promise(resolve => {
        setTimeout(() => resolve(mockActivities), 800);
      });
    } catch (error) {
      console.error('Error fetching activities:', error);
      return [];
    }
  }
  
  static async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project | null> {
    try {
      // For future implementation:
      // const response = await fetch(`${API_URL}/projects`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(project),
      // });
      // return await response.json();
      
      return new Promise(resolve => {
        setTimeout(() => {
          const newProject: Project = {
            ...project,
            id: (mockProjects.length + 1).toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          resolve(newProject);
        }, 1000);
      });
    } catch (error) {
      console.error('Error creating project:', error);
      return null;
    }
  }
  
  static async updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
    try {
      // For future implementation:
      // const response = await fetch(`${API_URL}/projects/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(updates),
      // });
      // return await response.json();
      
      return new Promise(resolve => {
        setTimeout(() => {
          const projectIndex = mockProjects.findIndex(p => p.id === id);
          if (projectIndex === -1) {
            resolve(null);
            return;
          }
          
          const updatedProject: Project = {
            ...mockProjects[projectIndex],
            ...updates,
            updatedAt: new Date().toISOString()
          };
          resolve(updatedProject);
        }, 800);
      });
    } catch (error) {
      console.error(`Error updating project ${id}:`, error);
      return null;
    }
  }
  
  static async deleteProject(id: string): Promise<boolean> {
    try {
      // For future implementation:
      // const response = await fetch(`${API_URL}/projects/${id}`, {
      //   method: 'DELETE',
      // });
      // return response.ok;
      
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      return false;
    }
  }
} 