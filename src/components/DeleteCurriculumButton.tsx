import { DeleteIcon } from './DeleteIcon'

interface DeleteCurriculumButtonProps {
  onClick: () => void
}

export const DeleteCurriculumButton = ({ onClick }: DeleteCurriculumButtonProps) => {
  return (
    <div
      className="bg-[#dc3545] box-border content-stretch flex gap-[5px] items-center justify-center p-[10px] relative rounded-md shrink-0 cursor-pointer hover:bg-[#c82333] transition-colors"
      data-name="delete-curriculum-btn"
      onClick={onClick}
    >
      <div aria-hidden="true" className="absolute border border-[#dc3545] border-solid inset-0 pointer-events-none rounded-md"></div>
      <DeleteIcon />
      <div className="flex flex-col font-['Roboto:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Delete</p>
      </div>
    </div>
  )
}
