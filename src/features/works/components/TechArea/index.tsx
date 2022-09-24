import Image from 'next/image'

import { Tooltip } from '@/components/overlay'
import { Tech } from '@/api/types'

export interface TechAreaProps {
  techs: Tech[]
}

export const TechArea: React.FC<TechAreaProps> = (props) => {
  const { techs } = props

  return (
    <div className="flex justify-center space-x-2 pb-2">
      {techs.map((tech) => (
        <div key={tech.name}>
          <Tooltip label={tech.name}>
            <Image
              src={tech.image.url}
              alt={tech.name}
              width="30"
              height="30"
            />
          </Tooltip>
        </div>
      ))}
    </div>
  )
}
