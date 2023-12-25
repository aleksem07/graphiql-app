export interface Developer {
  name: string;
  githubLink: string;
  imageLink: string;
  description: string;
}

export interface SectionInfo {
  title: string;
  content: string;
  link?: string;
}

export const developers: Developer[] = [
  {
    name: 'Irina Osipova',
    githubLink: 'https://github.com/IrinaOsp',
    imageLink: 'https://avatars.githubusercontent.com/u/108676588?v=4',
    description:
      'Junior Frontend Developer with a keen interest in building user-centric web interfaces. Proficient in HTML, CSS, and JavaScript. Dedicated to learning and applying new technologies, I aim to grow professionally in a collaborative environment.',
  },
  {
    name: 'Alexey Semyachkin',
    githubLink: 'https://github.com/aleksem07',
    imageLink: 'https://avatars.githubusercontent.com/u/89778523?v=4',
    description:
      'Frontend developer skilled in HTML, CSS, and JavaScript. Focused on creating engaging web experiences, I bring a strong foundation in web technologies. I am committed to ongoing learning and leveraging my skills in a team setting.',
  },
  {
    name: 'Julia Izbrodina',
    githubLink: 'https://github.com/JuliaAvona',
    imageLink: 'https://avatars.githubusercontent.com/u/94717941?v=4',
    description:
      'Currently studying at The Rolling Scopes School of React, I am passionate about frontend development. With a focus on HTML, CSS, and JavaScript, I am eager to apply my knowledge and continue growing in a dynamic professional environment.',
  },
];

export const sections: SectionInfo[] = [
  {
    title: 'About this project',
    content:
      'Welcome to our GraphiQL Application! This powerful tool is designed for efficient GraphQL request handling, featuring secure access with authorization and authentication. Key technologies include React 18 with Suspense, TypeScript, and optional frameworks like Vite, Gatsby, NextJS, or Remix. Our app supports any open GraphQL endpoint, enhanced with a built-in proxy service for CORS compatibility. Embrace a seamless GraphQL experience with our advanced features and cutting-edge technology!',
    link: 'https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md',
  },
  {
    title: 'About this course',
    content:
      'This course is created by the Rolling Scopes School, a renowned educational platform offering dynamic and comprehensive learning experiences in the field of web development. Designed to nurture practical skills and up-to-date knowledge, the course prepares students for real-world challenges in the tech industry.',
    link: 'https://rs.school/',
  },
];
