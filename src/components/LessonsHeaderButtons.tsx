import { CreateCurriculumButton } from './CreateCurriculumButton'
import { SaveCurriculumButton } from './SaveCurriculumButton'
import { DeleteCurriculumButton } from './DeleteCurriculumButton'

interface LessonsHeaderButtonsProps {
  isInEditMode: boolean
  onCreateProcedureAI: () => void
  onCreateCurriculum: () => void
  onSaveCurriculum: () => void
  onDeleteCurriculum: () => void
}

export const LessonsHeaderButtons = ({
  isInEditMode,
  onCreateCurriculum,
  onSaveCurriculum,
  onDeleteCurriculum
}: LessonsHeaderButtonsProps) => {
  return (
    <div className="content-stretch flex gap-5 items-center justify-end relative shrink-0" data-name="lessons-buttons">
      {isInEditMode ? (
        <>
          <SaveCurriculumButton onClick={onSaveCurriculum} />
          <DeleteCurriculumButton onClick={onDeleteCurriculum} />
        </>
      ) : (
        <CreateCurriculumButton onClick={onCreateCurriculum} />
      )}
    </div>
  )
}
