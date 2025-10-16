import { CurriculumIcon } from './CurriculumIcon'
import { HelpIcon } from './HelpIcon'

interface NavTabProps {
  iconType: 'curriculum' | 'help'
  label: string
  isActive: boolean
}

export const NavTab = ({ iconType, label, isActive }: NavTabProps) => {
  const bgColor = isActive ? 'bg-[#ffffff]' : 'bg-transparent'
  const borderStyle = isActive ? 'border-[#e5e7eb] border-[0px_1px_1px_0px]' : ''
  
  return (
    <button 
      className={`${bgColor} box-border flex-col flex-nowrap cursor-pointer flex gap-[5px] items-center justify-center min-h-px min-w-px p-[7.5px] relative w-full ${borderStyle} border-solid hover:bg-[#f3f3f5] transition-colors`}
      data-name="nav-tab"
      title={label}
    >
      <div className="shrink-0 content-stretch flex items-start justify-start min-h-px min-w-px relative size-[25px]">
        {iconType === 'curriculum' && <CurriculumIcon />}
        {iconType === 'help' && <HelpIcon />}
      </div>
      <div className="shrink-0 flex items-start justify-start min-h-px min-w-px relative w-[50px]">
        <div className="text-[#595959] text-center text-[11px] tracking-[0px] break-words relative size-full">
          {label}
        </div>
      </div>
    </button>
  )
}
