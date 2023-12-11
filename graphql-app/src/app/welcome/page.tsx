import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Welcome page - Graphql playground',
};

export default function Welcome() {
    return (
        <>
            <div className="flex-1 flex items-start justify-start m-10" >
                <div className="flex-1 flex items-center justify-center flex-col m-10  pt-20">
                    <h2 className="text-2xl font-bold">About Us</h2>
                    <div className="grid gap-4 grid-cols-3 pt-20">
                        <div className='m-2'>
                            <a href="https://github.com/IrinaOsp" target="_blank">
                                <img src="https://media.licdn.com/dms/image/D4D35AQGCeIk3IcKmBw/profile-framedphoto-shrink_100_100/0/1700574648660?e=1702875600&v=beta&t=lTiioUC71ZfM6C_xGfG6wPrJb8DZQbVxZF8ved1Kba0" alt="Developer 1" className='w-24 h-24 rounded-full mx-auto' />
                            </a>
                            <h4 className='font-bold pt-10'>Irina Osipova</h4>
                            <p>Motivated and skilled Junior Frontend Developer with a passion for crafting user-friendly web experiences. Possessing a solid foundation in HTML, CSS, and JavaScript, I am eager to contribute my knowledge and learn from experienced professionals to further develop my skills in frontend.</p>
                        </div>
                        <div className='m-2'>
                            <a href="https://github.com/aleksem07" target="_blank">
                                <img src="https://avatars.githubusercontent.com/u/89778523?v=4" alt="Developer 2" className='w-24 h-24 rounded-full mx-auto' />
                            </a>
                            <h4 className='font-bold pt-10'>Alexey Semyachkin</h4>
                            <p>Frontend developer with a solid foundation in HTML, CSS, and JavaScript. I am eager to contribute my knowledge and learn from experienced professionals to further develop my skills in frontend.</p>
                        </div>
                        <div className='m-2'>
                            <a href="https://github.com/JuliaAvona" target="_blank">
                                <img src="https://avatars.githubusercontent.com/u/94717941?v=4" alt="Developer 3" className='w-24 h-24 rounded-full mx-auto' />
                            </a>
                            <h4 className='font-bold pt-10'>Julia Izbrodina</h4>
                            <p>At the moment I'm studying at The Rolling Sopes School of React.</p>
                        </div>
                    </div>
                </div>
            </div >
            <div className="flex-1 flex items-center justify-center flex-col m-10  pt-20">
                <h2 className="text-2xl font-bold pb-5">About this project</h2>
                <p>Welcome to our GraphiQL Application! This powerful tool is designed for efficient GraphQL request handling, featuring secure access with authorization and authentication. Key technologies include React 18 with Suspense, TypeScript, and optional frameworks like Vite, Gatsby, NextJS, or Remix. Our app supports any open GraphQL endpoint, enhanced with a built-in proxy service for CORS compatibility. Embrace a seamless GraphQL experience with our advanced features and cutting-edge technology!</p>
                <a href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md" target="_blank">Learn more about this project...</a>
            </div >
            <div className="flex-1 flex items-center justify-center flex-col m-10  pt-20">
                <h2 className="text-2xl font-bold pb-5">About this course</h2>
                <p>
                    This course is created by the Rolling Scopes School, a renowned educational platform offering dynamic and comprehensive learning experiences in the field of web development. Designed to nurture practical skills and up-to-date knowledge, the course prepares students for real-world challenges in the tech industry.</p>
                <a href="https://rs.school/" target="_blank">Learn more about the Rolling Scopes School...</a>
            </div >
        </ >
    );
};
