import { ChangeEvent } from 'react'
import { optionType } from '../types'
import Button from './Button'

type Props = {
  term: string
  options: []
  showLoader: boolean
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onOptionSelect: (option: optionType) => void
  onSubmit: () => void
}

const Search = ({
  term,
  options,
  showLoader,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props): JSX.Element => {
  return (
    <div className="flex justify-center items-center h-[100vh] w-full">
      <section className=" h-full w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded text-zinc-700">
        <h1 className="text-4xl font-light ">
          Weather <span className="font-black">Forecast</span>
        </h1>
        <p className="text-sm mt-2">
          Enter below a place you want to know the wether of and select an
          option from the dropdown
        </p>
        <div className="flex flex-col mt-10 md:mt-4">
          <div>
            <input
              title="search"
              aria-labelledby="search"
              type="text"
              onChange={onInputChange}
              value={term}
              className="px-2 py-1 rounded-1-md border-2 border-white"
            />
            <Button
              text="search"
              loading={showLoader}
              disabled={showLoader}
              id="search"
              styling=" min-h-full min-w-max rounded-r-md border-2 border-zinc-900 hover:border-zinc-500 hover:text-zinc-500 text-zinc-900 px-2 py-1 cursor-pointer"
              onClick={onSubmit}
            ></Button>
          </div>
          <div>
            <ul className=" self-end bg-white m1-1 rounded-b-md">
              {options.map((option: optionType, index: number) => (
                <li key={option.name + '-' + index}>
                  <button
                    className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer "
                    onClick={() => onOptionSelect(option)}
                  >
                    {option.name},{option.country}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Search
