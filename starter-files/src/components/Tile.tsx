import Feels from './Icons/Feels'
import Pop from './Icons/Pop'
import Pressure from './Icons/Pressure'
import Visibility from './Icons/Visibility'
import Wind from './Icons/Wind'
import Humidity from './Icons/Humidity'
type Props = {
  icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'pressure' | 'pop'
  title: string
  info: string | JSX.Element
  description: string
}

const icons = {
  wind: Wind,
  feels: Feels,
  humidity: Humidity,
  visibility: Visibility,
  pressure: Pressure,
  pop: Pop,
}
const Tile = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon]
  return (
    <article className=" w-[140px] h-[130px] text-zinc-700 bg-white/20 backdrop-blur-lg rounded drop-shadow-lg p-2 mb-5 flex flex-col justify content-between">
      <div className="flex items-center text-sm font-bold">
        <Icon />
        <h3 className="ml-1"> {title}</h3>
      </div>
      <p className="mt-2 text-lg"> {info}</p>
      <p className="text-xs font-bold"> {description}</p>
    </article>
  )
}
export default Tile
