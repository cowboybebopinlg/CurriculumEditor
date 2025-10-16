import { CreateCurriculumButton } from './CreateCurriculumButton'
import { SaveCurriculumButton } from './SaveCurriculumButton'
import { DeleteCurriculumButton } from './DeleteCurriculumButton'
import { OpenCurriculumButton } from './OpenCurriculumButton'

interface LessonsHeaderButtonsProps {
  isInEditMode: boolean
  onCreateProcedureAI: () => void
  onCreateCurriculum: () => void
  onSaveCurriculum: () => void
  onDeleteCurriculum: () => void
  onOpenCurriculum: () => void
  selectedCurriculumId: string | null
}

export const LessonsHeaderButtons = ({
  isInEditMode,
  onCreateCurriculum,
  onSaveCurriculum,
  onDeleteCurriculum,
  onOpenCurriculum,
  selectedCurriculumId
}: LessonsHeaderButtonsProps) => {
  return (
    <div className="content-stretch flex gap-5 items-center justify-end relative shrink-0" data-name="lessons-buttons">
      {isInEditMode ? (
        <>
          <SaveCurriculumButton onClick={onSaveCurriculum} />
          <DeleteCurriculumButton onClick={onDeleteCurriculum} />
        </>
      ) : (
        <>
          <OpenCurriculumButton
            onClick={onOpenCurriculum}
            disabled={!selectedCurriculumId}
          />
          <CreateCurriculumButton onClick={onCreateCurriculum} />
        </>
      )}
    </div>
  )
}
