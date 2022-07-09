import { DefaultUi, Player, Youtube } from '@vime/react'
import { gql, useQuery } from '@apollo/client';
import { CaretRight, DiscordLogo, FileArrowDown, Image, Lightning } from 'phosphor-react'

import '@vime/core/themes/default.css'

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug ($slug: String) {
    lesson(where: {slug: $slug}) {
      title
      videoId
      description
      teacher {
        bio
        name
        avatarURL
      }
    }
  }
`;

interface GetLessonBySlugResponse{
  lesson: {
    title: string;
    videoId: string;
    description: string;
    teacher: {
      bio: string;
      avatarURL: string;
      name: string;
    }
  }
}

interface VideoProps{
  lessonSlug: string;
}

export function Video(props: VideoProps) {
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug: props.lessonSlug
    }
  }) 

  if(!data){
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="animate-spin -ml-1 mr-3 h-8 w-8 text-green-300" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
          </svg>
          <p className="text-2xl text-gray-100">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{data.lesson.title}</h1>
            <p className="mt-4 text-gray-200 leading-relaxed">{data.lesson.description}</p>
            <div className="flex items-center gap-4 mt-6">
              <img 
                className="h-16 w-16 rounded-full border-2 border-blue-500"
                src={data.lesson.teacher.avatarURL} 
                alt=""
              />

              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>
                <span className="text-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <a 
              href="" 
              className="text-white bg-green-300 text-sm font-bold uppercase flex items-center justify-center gap-2 p-4 border border-green-300 rounded hover:bg-green-700 hover:border-green-700 transition-colors"
              >
              <DiscordLogo size={30} />
              COMUNIDADE NO DISCORD
            </a>
            <a 
              href=""
              className="text-blue-500 bg-transparent text-sm font-bold uppercase flex items-center justify-center gap-2 p-4 border border-blue-500 rounded hover:bg-blue-500 hover:text-gray-900 transition-colors"
            >
              <Lightning size={30} />
              ACESSE O DESAFIO
            </a>
          </div>
        </div>

        <div className="gap-8 mt-20 grid grid-cols-2">
          <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={40} />

            </div>
          </a>
          <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <Image size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={40} />

            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
