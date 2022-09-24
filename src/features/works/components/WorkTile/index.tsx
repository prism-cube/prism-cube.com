import { TechArea, LinkArea, PlatformArea } from '@/features/works/components'
import { Work } from '@/api/types'

export interface WorkTileProps {
  work: Work
}

export const WorkTile: React.FC<WorkTileProps> = (props) => {
  const { work } = props

  return (
    <div className="flex flex-col rounded-lg p-4 dark:bg-ashen-700">
      <h2 className="pb-2 text-center text-xl font-bold">{work.title}</h2>
      <PlatformArea platform={work.platform} />
      <TechArea techs={work.techs} />
      <p className="flex flex-1 justify-center pb-2 dark:text-gray-300">
        {work.description}
      </p>
      <LinkArea
        url={work.url}
        appStoreUrl={work.appStoreUrl}
        googlePlayUrl={work.googlePlayUrl}
        githubUrl={work.githubUrl}
      />
    </div>
  )
}
