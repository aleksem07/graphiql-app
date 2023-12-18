import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Welcome page - Graphql playground',
};

interface Developer {
    name: string;
    githubLink: string;
    imageLink: string;
    description: string;
}

interface SectionInfo {
    title: string;
    content: string;
    link?: string;
}

const developers: Developer[] = [
    {
        name: 'Irina Osipova',
        githubLink: 'https://github.com/IrinaOsp',
        imageLink: 'https://media.licdn.com/dms/image/D4D35AQGCeIk3IcKmBw/profile-framedphoto-shrink_100_100/0/1700574648660?e=1702875600&v=beta&t=lTiioUC71ZfM6C_xGfG6wPrJb8DZQbVxZF8ved1Kba0',
        description: 'Junior Frontend Developer with a keen interest in building user-centric web interfaces. Proficient in HTML, CSS, and JavaScript. Dedicated to learning and applying new technologies, I aim to grow professionally in a collaborative environment.'
    },
    {
        name: 'Alexey Semyachkin',
        githubLink: 'https://github.com/aleksem07',
        imageLink: 'https://avatars.githubusercontent.com/u/89778523?v=4',
        description: 'Frontend developer skilled in HTML, CSS, and JavaScript. Focused on creating engaging web experiences, I bring a strong foundation in web technologies. I am committed to ongoing learning and leveraging my skills in a team setting.',
    },
    {
        name: 'Julia Izbrodina',
        githubLink: 'https://github.com/JuliaAvona',
        imageLink: 'https://avatars.githubusercontent.com/u/94717941?v=4',
        description: 'Currently studying at The Rolling Scopes School of React, I am passionate about frontend development. With a focus on HTML, CSS, and JavaScript, I am eager to apply my knowledge and continue growing in a dynamic professional environment.',
    }
];

const sections: SectionInfo[] = [
    {
        title: 'About this project',
        content: 'Welcome to our GraphiQL Application! This powerful tool is designed for efficient GraphQL request handling, featuring secure access with authorization and authentication. Key technologies include React 18 with Suspense, TypeScript, and optional frameworks like Vite, Gatsby, NextJS, or Remix. Our app supports any open GraphQL endpoint, enhanced with a built-in proxy service for CORS compatibility. Embrace a seamless GraphQL experience with our advanced features and cutting-edge technology!',
        link: 'https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md'
    },
    {
        title: 'About this course',
        content: 'This course is created by the Rolling Scopes School, a renowned educational platform offering dynamic and comprehensive learning experiences in the field of web development. Designed to nurture practical skills and up-to-date knowledge, the course prepares students for real-world challenges in the tech industry.',
        link: 'https://rs.school/'
    }
];

const DeveloperCard = ({ developer }: { developer: Developer }) => (
    <div className='m-2'>
        <a href={developer.githubLink} target="_blank" rel="noopener noreferrer">
            <div className='w-24 h-24 rounded-full mx-auto overflow-hidden transition-transform duration-200 hover:scale-105'>
                <Image
                    src={developer.imageLink}
                    alt={developer.name}
                    width={96}
                    height={96}
                    layout='responsive'
                    className='rounded-full'
                />
            </div>
        </a>
        <h4 className='font-bold pt-10'>{developer.name}</h4>
        <p>{developer.description}</p>
    </div>
);


const Section = ({ info }: { info: SectionInfo }) => (
    <div className="flex-1 flex items-center justify-center flex-col m-10 pt-20">
        <h2 className="text-2xl font-bold pb-5">{info.title}</h2>
        <p>{info.content}</p>
        {<a href={info.link} target="_blank" rel="noopener noreferrer" className="text-white bg-gray-500 hover:bg-gray-700 px-3 py-1 rounded mt-5">
            Learn more...
        </a>}
    </div>
);

export default function Welcome() {
    return (
        <>
            <div className="mx-auto max-w-[1280px] h-100vh">
                <div className="flex-1 flex items-start justify-start">
                    <div className="flex-1 flex items-center justify-center flex-col m-10 pt-20">
                        <h2 className="text-2xl font-bold">About Us</h2>
                        <div className="grid gap-4 grid-cols-1 pt-20 xs:grid-cols-3">
                            {developers.map(developer => <DeveloperCard key={developer.name} developer={developer} />)}
                        </div>
                    </div>
                </div>
                {sections.map(section => <Section key={section.title} info={section} />)}
            </div>
        </>
    );
};