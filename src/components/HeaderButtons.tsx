import { SearchBar } from './SearchBar'
import { ProfileButton } from './ProfileButton'

export const HeaderButtons = () => {
  return (
    <div className="shrink-0 content-stretch flex gap-[15px] items-center justify-start min-h-px min-w-px relative">
      <SearchBar onSearch={() => {}} />
      <ProfileButton />
    </div>
  )
}
