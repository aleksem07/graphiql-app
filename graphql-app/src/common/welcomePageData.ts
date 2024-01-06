import { AvailableLangs } from '@/context/langContext';

export interface Developer {
  name: Record<AvailableLangs, string>;
  githubLink: string;
  imageLink: string;
  description: Record<AvailableLangs, string>;
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
      en: 'Junior Frontend Developer with a keen interest in building user-centric web interfaces. Proficient in HTML, CSS, and JavaScript. Dedicated to learning and applying new technologies, I aim to grow professionally in a collaborative environment.',
      ru: '',
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
      en: 'Frontend developer skilled in HTML, CSS, and JavaScript. Focused on creating engaging web experiences, I bring a strong foundation in web technologies. I am committed to ongoing learning and leveraging my skills in a team setting.',
      ru: '',
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
      en: 'Currently studying at The Rolling Scopes School of React, I am passionate about frontend development. With a focus on HTML, CSS, and JavaScript, I am eager to apply my knowledge and continue growing in a dynamic professional environment.',
      ru: '',
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
