import { NavPanel } from './NavPanel'
import { ContentPanel } from './ContentPanel'
import { ContextPanel } from './ContextPanel'
import { Curriculum } from '../types/curriculum'

interface SystemBodyProps {
  isInEditMode: boolean
  curriculum: Curriculum
  onCreateProcedureAI: () => void
  onCreateCurriculum: () => void
  onSaveCurriculum: () => void
  onDeleteCurriculum: () => void
  onCurriculumChanged: (curriculum: Curriculum) => void
}

export const SystemBody = ({
  isInEditMode,
  curriculum,
  onCreateProcedureAI,
  onCreateCurriculum,
  onSaveCurriculum,
  onDeleteCurriculum,
  onCurriculumChanged
}: SystemBodyProps) => {
  return (
    <div className="basis-0 content-stretch flex grow items-start justify-start min-h-px min-w-px relative shrink-0 w-full overflow-hidden" data-name="system-body">
      <NavPanel />
      <ContentPanel
        isInEditMode={isInEditMode}
        curriculum={curriculum}
        onCreateProcedureAI={onCreateProcedureAI}
        onCreateCurriculum={onCreateCurriculum}
        onSaveCurriculum={onSaveCurriculum}
        onDeleteCurriculum={onDeleteCurriculum}
        onCurriculumChanged={onCurriculumChanged}
      />
      <ContextPanel
        isInEditMode={isInEditMode}
        curriculum={curriculum}
      />
    </div>
  )
}
