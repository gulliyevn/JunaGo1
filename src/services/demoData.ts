// src/services/demoData.ts
// Файл с демо-данными для использования без бэкенда

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  salePrice?: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  studentsCount: number;
  instructor: {
    name: string;
    avatar: string;
  };
  topics: string[];
  progress?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'instructor' | 'admin';
  isPremium: boolean;
  enrolledCourses: string[];
  savedCourses: string[];
  completedLessons: string[];
}

// Демо-пользователь для имитации авторизованной сессии
export const demoUser: User = {
  id: 'demo-user-123',
  name: 'Демо Пользователь',
  email: 'demo@junago.com',
  avatar: '/assets/demo-avatar.png',
  role: 'student',
  isPremium: true,
  enrolledCourses: ['course-1', 'course-3', 'course-5'],
  savedCourses: ['course-2', 'course-4'],
  completedLessons: ['course-1-lesson-1', 'course-1-lesson-2', 'course-3-lesson-1']
};

// Демо-курсы
export const demoCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Введение в JavaScript',
    description: 'Узнайте основы JavaScript, включая переменные, функции, условия и циклы. Идеальный стартовый курс для новичков в программировании.',
    imageUrl: '/assets/course-js.jpg',
    price: 79.99,
    duration: '8 недель',
    level: 'beginner',
    rating: 4.8,
    studentsCount: 1243,
    instructor: {
      name: 'Алексей Петров',
      avatar: '/assets/instructor-1.jpg'
    },
    topics: ['Переменные и типы данных', 'Функции', 'Массивы и объекты', 'Условия и циклы', 'DOM-манипуляции', 'Асинхронный JavaScript'],
    progress: 25
  },
  {
    id: 'course-2',
    title: 'React Фундаментальный',
    description: 'Изучите React.js - одну из самых популярных библиотек для создания интерфейсов. Научитесь создавать компоненты, управлять состоянием и строить SPA.',
    imageUrl: '/assets/course-react.jpg',
    price: 89.99,
    duration: '10 недель',
    level: 'intermediate',
    rating: 4.9,
    studentsCount: 876,
    instructor: {
      name: 'Мария Иванова',
      avatar: '/assets/instructor-2.jpg'
    },
    topics: ['JSX', 'Компоненты', 'Props и State', 'Хуки', 'Роутинг', 'Context API', 'Redux']
  },
  {
    id: 'course-3',
    title: 'Python для науки о данных',
    description: 'Освойте Python для анализа данных, машинного обучения и визуализации. Работайте с библиотеками NumPy, Pandas и Matplotlib.',
    imageUrl: '/assets/course-python.jpg',
    price: 99.99,
    salePrice: 79.99,
    duration: '12 недель',
    level: 'intermediate',
    rating: 4.7,
    studentsCount: 1567,
    instructor: {
      name: 'Дмитрий Смирнов',
      avatar: '/assets/instructor-3.jpg'
    },
    topics: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'Jupyter Notebooks', 'Статистика'],
    progress: 10
  },
  {
    id: 'course-4',
    title: 'Полный курс веб-разработки',
    description: 'Станьте full-stack разработчиком с нуля. HTML, CSS, JavaScript, React, Node.js, MongoDB и деплой проектов.',
    imageUrl: '/assets/course-web.jpg',
    price: 149.99,
    salePrice: 119.99,
    duration: '24 недели',
    level: 'beginner',
    rating: 4.9,
    studentsCount: 2431,
    instructor: {
      name: 'Елена Васильева',
      avatar: '/assets/instructor-4.jpg'
    },
    topics: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB']
  },
  {
    id: 'course-5',
    title: 'TypeScript мастер-класс',
    description: 'Улучшите свои навыки JavaScript с помощью TypeScript. Изучите типы, интерфейсы, дженерики и продвинутые концепции.',
    imageUrl: '/assets/course-ts.jpg',
    price: 69.99,
    duration: '6 недель',
    level: 'intermediate',
    rating: 4.6,
    studentsCount: 723,
    instructor: {
      name: 'Игорь Соколов',
      avatar: '/assets/instructor-5.jpg'
    },
    topics: ['Типы', 'Интерфейсы', 'Классы', 'Дженерики', 'Декораторы', 'Модули'],
    progress: 50
  }
];

// Отзывы пользователей
export const demoTestimonials = [
  {
    id: 1,
    name: 'Елена Новак',
    avatar: '/assets/user-1.jpg',
    rating: 3,
    text: 'Это хороший сервис, но я считаю, что некоторые аспекты можно улучшить, особенно пользовательский интерфейс.'
  },
  {
    id: 2,
    name: 'Миа Патель',
    avatar: '/assets/user-2.jpg',
    rating: 5,
    text: 'Я пробовала похожие сервисы, но этот выделяется! Внимание к деталям и обслуживание клиентов на высшем уровне.'
  },
  {
    id: 3,
    name: 'Александр Ковальчук',
    avatar: '/assets/user-3.jpg',
    rating: 4,
    text: 'Платформа очень помогла мне в изучении программирования. Материалы хорошо структурированы, а поддержка отвечает быстро.'
  }
];

// Дорожная карта обучения
export const demoRoadmap = [
  {
    id: 'frontend',
    title: 'Front-end разработчик',
    description: 'Путь к освоению фронтенд-разработки',
    steps: [
      {
        id: 'step-1',
        title: 'Основы',
        courses: ['course-1'],
        skills: ['HTML', 'CSS', 'JavaScript']
      },
      {
        id: 'step-2',
        title: 'Фреймворки',
        courses: ['course-2'],
        skills: ['React', 'Redux', 'TypeScript']
      },
      {
        id: 'step-3',
        title: 'Продвинутый уровень',
        courses: ['course-5'],
        skills: ['TypeScript', 'GraphQL', 'Testing']
      }
    ]
  },
  {
    id: 'data-science',
    title: 'Специалист по данным',
    description: 'Станьте экспертом в анализе данных',
    steps: [
      {
        id: 'step-1',
        title: 'Основы Python',
        courses: ['course-3'],
        skills: ['Python', 'NumPy', 'Pandas']
      },
      {
        id: 'step-2',
        title: 'Машинное обучение',
        courses: [],
        skills: ['Scikit-learn', 'TensorFlow', 'Статистика']
      }
    ]
  }
];

// Статьи
export const demoArticles = [
  {
    id: 'article-1',
    title: 'Введение в React Hooks',
    summary: 'Узнайте, как использовать хуки React для более чистого и эффективного кода.',
    imageUrl: '/assets/article-1.jpg',
    author: 'Мария Иванова',
    date: '2023-10-15',
    content: 'Полное содержание статьи о React Hooks...'
  },
  {
    id: 'article-2',
    title: 'JavaScript vs TypeScript: что выбрать?',
    summary: 'Сравнение JavaScript и TypeScript для современной веб-разработки.',
    imageUrl: '/assets/article-2.jpg',
    author: 'Игорь Соколов',
    date: '2023-09-22',
    content: 'Полное содержание статьи о сравнении JS и TS...'
  },
  {
    id: 'article-3',
    title: 'Оптимизация производительности React-приложений',
    summary: 'Практические советы по улучшению производительности ваших React-приложений.',
    imageUrl: '/assets/article-3.jpg',
    author: 'Алексей Петров',
    date: '2023-08-30',
    content: 'Полное содержание статьи об оптимизации React...'
  }
];

// Данные для панели управления
export const demoDashboardData = {
  enrolledCourses: demoCourses.filter(course => demoUser.enrolledCourses.includes(course.id)),
  savedCourses: demoCourses.filter(course => demoUser.savedCourses.includes(course.id)),
  progress: {
    totalLessons: 24,
    completedLessons: demoUser.completedLessons.length,
    certificates: 1
  },
  upcomingEvents: [
    {
      id: 'event-1',
      title: 'Вебинар: Карьера в IT',
      date: '2023-11-10T18:00:00',
      link: '/webinar/career-in-it'
    },
    {
      id: 'event-2',
      title: 'Практический воркшоп по React',
      date: '2023-11-15T16:00:00',
      link: '/workshop/react'
    }
  ],
  achievements: [
    {
      id: 'achievement-1',
      title: 'Первые шаги',
      description: 'Завершена первая неделя обучения',
      icon: '🏆',
      date: '2023-10-05'
    },
    {
      id: 'achievement-2',
      title: 'Консистентность',
      description: '7 дней подряд на платформе',
      icon: '🔥',
      date: '2023-10-10'
    }
  ]
}; 