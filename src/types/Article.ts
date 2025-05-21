export interface Author {
  id: string;
  name: string;
  avatar?: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  category: ArticleCategory;
  coverImage: string;
  author: Author;
  publishDate: string;
  readTime?: number;
}

export type ArticleCategory = 'React' | 'Node.js' | 'DevOps' | 'JavaScript' | 'Testing' | 'AI' | 'All';

export interface ArticleFilterOptions {
  category?: ArticleCategory;
  searchTerm?: string;
}

export interface ArticlePaginationOptions {
  page: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
} 