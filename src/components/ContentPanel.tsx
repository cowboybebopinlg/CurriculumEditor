import { LessonsHeader } from './LessonsHeader'
import { SearchBar } from './SearchBar'
import { CurriculumTable } from './CurriculumTable'
import { CurriculumBuilder } from './CurriculumBuilder'
import { Curriculum } from '../types/curriculum'

interface ContentPanelProps {
  isInEditMode: boolean
  curriculum: Curriculum
  onCreateProcedureAI: () => void
  onCreateCurriculum: () => void
  onSaveCurriculum: () => void
  onDeleteCurriculum: () => void
  onCurriculumChanged: (curriculum: Curriculum) => void
}

export const ContentPanel = ({
  isInEditMode,
  curriculum,
  onCreateProcedureAI,
  onCreateCurriculum,
  onSaveCurriculum,
  onDeleteCurriculum,
  onCurriculumChanged
}: ContentPanelProps) => {
  return (
    <div className="basis-0 bg-[#ffffff] content-stretch flex flex-col grow h-screen items-start justify-start min-h-px min-w-px relative shrink-0" data-name="content-panel">
      <LessonsHeader
        isInEditMode={isInEditMode}
        onCreateProcedureAI={onCreateProcedureAI}
        onCreateCurriculum={onCreateCurriculum}
        onSaveCurriculum={onSaveCurriculum}
        onDeleteCurriculum={onDeleteCurriculum}
      />

      {!isInEditMode ? (
        <>
          <SearchBar />
          <CurriculumTable />
        </>
      ) : (
        <CurriculumBuilder
          curriculum={curriculum}
          onCurriculumChanged={onCurriculumChanged}
        />
      )}
    </div>
  )
}
