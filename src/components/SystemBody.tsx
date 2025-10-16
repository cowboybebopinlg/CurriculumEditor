import { NavPanel } from './NavPanel'
import { ContentPanel } from './ContentPanel'
import { ContextPanel } from './ContextPanel'
import { Curriculum } from '../types/curriculum'

interface SystemBodyProps {
  isInEditMode: boolean
  curriculum: Curriculum | null
  curricula: Curriculum[]
  selectedCurriculumId: string | null
  errors: { curriculumName?: string; moduleNames?: { [moduleId: string]: string } }
  onCreateProcedureAI: () => void
  onCreateCurriculum: () => void
  onSaveCurriculum: () => void
  onDeleteCurriculum: () => void
  onCurriculumChanged: (curriculum: Curriculum) => void
  onSelectCurriculum: (id: string) => void
  onOpenCurriculum: () => void
  onCloseCurriculum: () => void
}

export const SystemBody = ({
  isInEditMode,
  curriculum,
  curricula,
  selectedCurriculumId,
  errors,
  onCreateProcedureAI,
  onCreateCurriculum,
  onSaveCurriculum,
  onDeleteCurriculum,
  onCurriculumChanged,
  onSelectCurriculum,
  onOpenCurriculum,
  onCloseCurriculum
}: SystemBodyProps) => {
  return (
    <div className="basis-0 content-stretch flex grow items-start justify-start min-h-px min-w-px relative shrink-0 w-full overflow-hidden" data-name="system-body">
      <NavPanel />
      <ContentPanel
        isInEditMode={isInEditMode}
        curriculum={curriculum}
        curricula={curricula}
        selectedCurriculumId={selectedCurriculumId}
        errors={errors}
        onCreateProcedureAI={onCreateProcedureAI}
        onCreateCurriculum={onCreateCurriculum}
        onSaveCurriculum={onSaveCurriculum}
        onDeleteCurriculum={onDeleteCurriculum}
        onCurriculumChanged={onCurriculumChanged}
        onSelectCurriculum={onSelectCurriculum}
        onOpenCurriculum={onOpenCurriculum}
      />
      <ContextPanel
        isInEditMode={isInEditMode}
        curriculum={curriculum}
        onOpenCurriculum={onOpenCurriculum}
        onCloseCurriculum={onCloseCurriculum}
      />
    </div>
  )
}
