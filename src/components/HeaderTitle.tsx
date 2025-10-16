interface HeaderTitleProps {
  isInEditMode: boolean
}

export const HeaderTitle = ({ isInEditMode }: HeaderTitleProps) => {
  return (
    <div className="basis-0 content-stretch flex gap-2.5 grow items-center justify-start min-h-px min-w-px relative shrink-0" data-name="title">
      <div className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#707070] text-[18px] text-nowrap">
        {isInEditMode ? (
          <p className="leading-[normal] whitespace-pre">Curriculum > Untitled Curriculum</p>
        ) : (
          <p className="leading-[normal] whitespace-pre">Curriculum</p>
        )}
      </div>
    </div>
  )
}
