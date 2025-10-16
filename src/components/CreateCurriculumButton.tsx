import { CurriculumIcon } from './CurriculumIcon'

interface CreateCurriculumButtonProps {
  onClick: () => void
}

export const CreateCurriculumButton = ({ onClick }: CreateCurriculumButtonProps) => {
  return (
    <div
      className="bg-[#2d8ef3] box-border content-stretch flex gap-[5px] items-center justify-center p-[10px] relative rounded-md shrink-0 cursor-pointer hover:bg-[#2563eb] transition-colors"
      data-name="create-curriculum-btn"
      onClick={onClick}
    >
      <div aria-hidden="true" className="absolute border border-[#2d8ef3] border-solid inset-0 pointer-events-none rounded-md"></div>
      <CurriculumIcon />
      <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Create Curriculum</p>
      </div>
    </div>
  )
}
