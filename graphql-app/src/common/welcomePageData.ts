import { AvailableLangs } from '@/context/langContext';

export interface Developer {
  name: Record<AvailableLangs, string>;
  githubLink: string;
  imageLink: string;
  description: Record<AvailableLangs, string[]>;
}

export interface SectionInfo {
  title: Record<AvailableLangs, string>;
  content: Record<AvailableLangs, string>;
  link?: string;
}

export const developers: Developer[] = [
  {
    name: {
      en: 'Irina Osipova',
      ru: 'Ирина Осипова',
    },
    githubLink: 'https://github.com/IrinaOsp',
    imageLink: 'https://avatars.githubusercontent.com/u/108676588?v=4',
    description: {
      en: [
        'signin and signup pages',
        'authorization & protected routes',
        'localization',
        'GraphQL schema',
      ],
      ru: [
        'страницы входа и регистрации',
        'авторизация и защищенные маршруты',
        'локализация',
        'схема GraphQL',
      ],
    },
  },
  {
    name: {
      en: 'Alexey Semyachkin',
      ru: 'Алексей Семячкин',
    },
    githubLink: 'https://github.com/aleksem07',
    imageLink: 'https://avatars.githubusercontent.com/u/89778523?v=4',
    description: {
      en: [
        'repository & tasks management tool organization',
        'editor page with headers and variables',
        'GraphQL requests',
        'query prettifying',
      ],
      ru: [
        'организация репозитория и программы управления задачами',
        'GraphQL-запросы',
        'страница редактора с заголовками и переменными',
        'обработка ошибок',
        'форматирование запросов',
      ],
    },
  },
  {
    name: {
      en: 'Julia Izbrodina',
      ru: 'Юлия Избродина',
    },
    githubLink: 'https://github.com/JuliaAvona',
    imageLink: 'https://avatars.githubusercontent.com/u/94717941?v=4',
    description: {
      en: ['welcome page', '      sticky header'],
      ru: ['страница приветствия', '"липкий" хедер'],
    },
  },
];

export const sections: SectionInfo[] = [
  {
    title: {
      en: 'About this project',
      ru: 'О проекте',
    },
    content: {
      en: `Explore the full capabilities of our GraphiQL Application – an advanced tool built for effortless GraphQL request management. Our app seamlessly interacts with open GraphQL APIs supporting CORS, ensuring a comprehensive GraphQL experience with a modern technology stack.

      Notably, our application supports custom headers and variables, providing you with flexibility and control over your GraphQL queries.
      
      To access the editor page, we've integrated Firebase authorization and authentication via email.
      
      In crafting this app, we've harnessed key technologies such as React 18 with Suspense, TypeScript, and the Next.js framework.`,
      ru: `Исследуйте полные возможности нашего приложения GraphiQL – современного инструмента, созданного для легкого управления запросами GraphQL. Наше приложение взаимодействует с открытыми GraphQL API, поддерживающими CORS, обеспечивая всесторонний опыт работы с GraphQL с использованием современного стека технологий.

      Наше приложение поддерживает пользовательские заголовки и переменные, предоставляя вам гибкость и контроль над вашими запросами GraphQL.
      
      Для доступа к редактору мы интегрировали аутентификацию и авторизацию Firebase через электронную почту.
      
      Для создания приложения, мы использовали ключевые технологии, такие как React 18 с Suspense, TypeScript и фреймворк Next.js`,
    },
    link: 'https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md',
  },
  {
    title: {
      en: 'About this course',
      ru: 'О курсе',
    },
    content: {
      en: 'This course is created by the Rolling Scopes School, a renowned educational platform offering dynamic and comprehensive learning experiences in the field of web development. Designed to nurture practical skills and up-to-date knowledge, the course prepares students for real-world challenges in the tech industry.',
      ru: 'Этот курс создан Rolling Scopes School, известной образовательной платформой, предлагающей динамичные и всесторонние образовательные программы в области веб-разработки. Разработанный для развития практических навыков и актуальных знаний, курс готовит студентов к реальным вызовам в технологической индустрии.',
    },
    link: 'https://rs.school/',
  },
];
