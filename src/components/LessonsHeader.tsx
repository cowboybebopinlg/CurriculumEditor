import { HeaderTitle } from './HeaderTitle'
import { LessonsHeaderButtons } from './LessonsHeaderButtons'

interface LessonsHeaderProps {
  isInEditMode: boolean
  onCreateProcedureAI: () => void
  onCreateCurriculum: () => void
  onSaveCurriculum: () => void
  onDeleteCurriculum: () => void
  onOpenCurriculum: () => void
  selectedCurriculumId: string | null
}

export const LessonsHeader = ({
  isInEditMode,
  onCreateProcedureAI,
  onCreateCurriculum,
  onSaveCurriculum,
  onDeleteCurriculum,
  onOpenCurriculum,
  selectedCurriculumId
}: LessonsHeaderProps) => {
  return (
    <div className="bg-[#ffffff] sticky top-0 z-20 shrink-0 w-full" data-name="lessons-header">
      <div aria-hidden="true" className="absolute border-[#bbbbbb] border-[0px_0px_1px] border-solid inset-0 pointer-events-none"></div>
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between p-[10px] relative w-full">
          <HeaderTitle isInEditMode={isInEditMode} />
          <LessonsHeaderButtons
            isInEditMode={isInEditMode}
            onCreateProcedureAI={onCreateProcedureAI}
            onCreateCurriculum={onCreateCurriculum}
            onSaveCurriculum={onSaveCurriculum}
            onDeleteCurriculum={onDeleteCurriculum}
            onOpenCurriculum={onOpenCurriculum}
            selectedCurriculumId={selectedCurriculumId}
          />
        </div>
      </div>
    </div>
  )
}
