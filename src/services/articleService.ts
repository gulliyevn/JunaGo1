import { Article, ArticleCategory, ArticleFilterOptions, ArticlePaginationOptions } from '../types/Article';

// Моковые данные для статей
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Building Modern UIs with React and TypeScript',
    description: 'Learn how to leverage TypeScript with React to build type-safe, maintainable user interfaces for your web applications.',
    category: 'React',
    coverImage: '/assets/images/articles/react-cover.jpg',
    author: {
      id: '101',
      name: 'Alex Johnson',
      avatar: '/assets/images/authors/alex-johnson.jpg'
    },
    publishDate: '2025-05-15',
  },
  {
    id: '2',
    title: 'Creating RESTful APIs with Express and MongoDB',
    description: 'A comprehensive guide to building scalable backend services using Express.js and MongoDB databases.',
    category: 'Node.js',
    coverImage: '/assets/images/articles/nodejs-cover.jpg',
    author: {
      id: '102',
      name: 'Sarah Kim',
      avatar: '/assets/images/authors/sarah-kim.jpg'
    },
    publishDate: '2025-05-10',
  },
  {
    id: '3',
    title: 'CI/CD Pipeline Setup with GitHub Actions',
    description: 'Learn how to automate your testing and deployment processes using GitHub Actions for continuous integration.',
    category: 'DevOps',
    coverImage: '/assets/images/articles/devops-cover.jpg',
    author: {
      id: '103',
      name: 'Mike Chen',
      avatar: '/assets/images/authors/mike-chen.jpg'
    },
    publishDate: '2025-05-05',
  },
  {
    id: '4',
    title: 'Modern JavaScript: ES6 and Beyond',
    description: 'Explore the latest features and improvements in JavaScript that make coding more efficient and enjoyable.',
    category: 'JavaScript',
    coverImage: '/assets/images/articles/javascript-cover.jpg',
    author: {
      id: '104',
      name: 'David Smith',
      avatar: '/assets/images/authors/david-smith.jpg'
    },
    publishDate: '2025-04-28',
  },
  {
    id: '5',
    title: 'Best Practices for Frontend Testing',
    description: 'A guide to implementing effective testing strategies for your frontend applications using Jest and React Testing Library.',
    category: 'Testing',
    coverImage: '/assets/images/articles/testing-cover.jpg',
    author: {
      id: '105',
      name: 'Emily Wong',
      avatar: '/assets/images/authors/emily-wong.jpg'
    },
    publishDate: '2025-04-22',
  },
  {
    id: '6',
    title: 'Integrating AI Assistants in Your Development Workflow',
    description: 'How to leverage modern AI tools to enhance productivity and code quality in your software development process.',
    category: 'AI',
    coverImage: '/assets/images/articles/ai-cover.jpg',
    author: {
      id: '106',
      name: 'James Wilson',
      avatar: '/assets/images/authors/james-wilson.jpg'
    },
    publishDate: '2025-04-18',
  },
  {
    id: '7',
    title: 'Advanced React Hooks Patterns',
    description: 'Deep dive into complex React Hooks patterns and custom hooks for state management and component optimization.',
    category: 'React',
    coverImage: '/assets/images/articles/react-hooks-cover.jpg',
    author: {
      id: '101',
      name: 'Alex Johnson',
      avatar: '/assets/images/authors/alex-johnson.jpg'
    },
    publishDate: '2025-04-12',
  },
  {
    id: '8',
    title: 'GraphQL vs REST: Choosing the Right API Approach',
    description: 'Compare the benefits and drawbacks of GraphQL and REST API architectures for your next application.',
    category: 'Node.js',
    coverImage: '/assets/images/articles/graphql-cover.jpg',
    author: {
      id: '102',
      name: 'Sarah Kim',
      avatar: '/assets/images/authors/sarah-kim.jpg'
    },
    publishDate: '2025-04-05',
  },
  {
    id: '9',
    title: 'Containerization with Docker and Kubernetes',
    description: 'Learn how to effectively containerize your applications and orchestrate deployments using Kubernetes.',
    category: 'DevOps',
    coverImage: '/assets/images/articles/kubernetes-cover.jpg',
    author: {
      id: '103',
      name: 'Mike Chen',
      avatar: '/assets/images/authors/mike-chen.jpg'
    },
    publishDate: '2025-03-28',
  }
];

// Функция для получения статей с фильтрацией и пагинацией
export const getArticles = async (
  filterOptions: ArticleFilterOptions,
  paginationOptions: { page: number; itemsPerPage: number }
): Promise<{ articles: Article[]; pagination: ArticlePaginationOptions }> => {
  // Имитация задержки API
  await new Promise(resolve => setTimeout(resolve, 300));

  let filteredArticles = [...mockArticles];

  // Применение фильтров
  if (filterOptions.category && filterOptions.category !== 'All') {
    filteredArticles = filteredArticles.filter(article => article.category === filterOptions.category);
  }

  if (filterOptions.searchTerm) {
    const searchLower = filterOptions.searchTerm.toLowerCase();
    filteredArticles = filteredArticles.filter(article => 
      article.title.toLowerCase().includes(searchLower) || 
      article.description.toLowerCase().includes(searchLower)
    );
  }

  // Сортировка по дате публикации (от новых к старым)
  filteredArticles.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  // Применение пагинации
  const { page, itemsPerPage } = paginationOptions;
  const totalItems = filteredArticles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  return {
    articles: paginatedArticles,
    pagination: {
      page,
      itemsPerPage,
      totalItems,
      totalPages
    }
  };
};

// Функция для получения списка категорий
export const getCategories = async (): Promise<ArticleCategory[]> => {
  // Имитация задержки API
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Возвращаем уникальные категории из моковых данных + опцию "All"
  const categories: ArticleCategory[] = ['All'];
  mockArticles.forEach(article => {
    if (!categories.includes(article.category)) {
      categories.push(article.category);
    }
  });
  
  return categories;
};

// Функция для получения статьи по ID
export const getArticleById = async (id: string): Promise<Article | null> => {
  // Имитация задержки API
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const article = mockArticles.find(article => article.id === id);
  return article || null;
}; 