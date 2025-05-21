export interface Contributor {
  id: string;
  name: string;
  avatarUrl?: string;
  role?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: 'web' | 'mobile' | 'api' | 'ai' | 'other';
  tags: string[];
  stars: number;
  forks: number;
  likes: number;
  comments: number;
  contributors: Contributor[];
  createdAt: string;
  updatedAt: string;
  starred?: boolean;
  archived?: boolean;
}

export interface ProjectActivity {
  id: string;
  projectId: string;
  type: 'branch' | 'star' | 'commit' | 'team' | 'other';
  title: string;
  text: string;
  time: string;
  codeSnippet?: string;
  contributors?: Contributor[];
  contributorsCount?: number;
  link?: string;
  linkText?: string;
} 