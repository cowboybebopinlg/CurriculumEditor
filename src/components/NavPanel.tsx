import { NavIcon } from './NavIcon'
import { NavTab } from './NavTab'

export const NavPanel = () => {
  return (
    <div className="bg-[#f7f7f8] flex-col flex-nowrap shrink-0 content-stretch flex gap-0 items-start justify-start min-h-px min-w-px pt-[15px] pb-0 px-0 relative w-[65px] h-full overflow-hidden" data-name="nav-panel">
      <div className="shrink-0 content-stretch flex-col flex gap-[5px] items-start justify-start min-h-px min-w-px pb-[15px] pt-0 px-0 relative w-full">
        <NavIcon />
        <NavTab iconType="curriculum" label="Curricula" isActive={true} />
        <NavTab iconType="help" label="Help" isActive={false} />
      </div>
    </div>
  )
}
