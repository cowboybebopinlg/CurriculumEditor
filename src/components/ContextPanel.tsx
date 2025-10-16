import { Curriculum } from '../types/curriculum'

interface ContextPanelProps {
  isInEditMode: boolean
  curriculum: Curriculum
}

export const ContextPanel = ({ isInEditMode, curriculum }: ContextPanelProps) => {
  return (
    <div className="bg-[#ffffff] box-border content-stretch flex flex-col gap-5 h-screen sticky top-0 overflow-y-auto items-start justify-start p-[15px] relative shrink-0 w-[300px]" data-name="context-panel">
      <div aria-hidden="true" className="absolute border-[#bbbbbb] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none"></div>

      {isInEditMode && curriculum ? (
        <CurriculumOutliner curriculum={curriculum} />
      ) : (
        <>
          <OpenButton />
          <DetailField title="Name" value={curriculum?.name || 'N/A'} />
          <DetailField title="Organization" value={curriculum?.organization || 'N/A'} />
          <DetailField title="Author" value={curriculum?.author || 'N/A'} />
          <DetailField title="Upload Date" value={curriculum?.uploadDate || 'N/A'} />
          <DetailField title="Status" value={curriculum?.status || 'N/A'} />
        </>
      )}
    </div>
  )
}

const OpenButton = () => {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-center justify-start relative shrink-0 w-full" data-name="open-btn">
      {/* Large Icon */}
      <div className="overflow-clip relative shrink-0 size-[103px]" data-name="lessons-icon">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 103 103">
          <path d="M103 0H0V103H103V0Z" fill="#2D8EF3" opacity="0" />
          <rect x="20" y="30" width="63" height="8" fill="#2D8EF3" />
          <rect x="20" y="45" width="63" height="8" fill="#2D8EF3" />
          <rect x="20" y="60" width="43" height="8" fill="#2D8EF3" />
        </svg>
      </div>

      {/* Button */}
      <div className="bg-[#2d8ef3] box-border content-stretch flex gap-2.5 items-center justify-center px-0 py-2.5 relative rounded-md shrink-0 w-full cursor-pointer hover:bg-[#2563eb] transition-colors" data-name="open-btn">
        <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold h-full leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-center w-full">
          <p className="leading-[normal]">Open</p>
        </div>
      </div>
    </div>
  )
}

interface DetailFieldProps {
  title: string
  value: string
}

const DetailField = ({ title, value }: DetailFieldProps) => {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-start justify-start leading-[0] not-italic relative shrink-0 w-full" data-name={title.toLowerCase()}>
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold relative shrink-0 text-[#000000] text-[13px] w-full">
        <p className="leading-[normal]">{title}</p>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#707070] text-[14px] w-full">
        <p className="leading-[normal]">{value}</p>
      </div>
    </div>
  )
}

interface CurriculumOutlinerProps {
  curriculum: Curriculum
}

const CurriculumOutliner = ({ curriculum }: CurriculumOutlinerProps) => {
  return (
    <div className="h-full overflow-y-auto w-full">
      <h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[#000000] text-[13px] mb-4">
        Curriculum Outline
      </h3>

      {curriculum.name ? (
        <div className="space-y-2">
          {/* Curriculum Name */}
          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded border border-blue-200">
            {/* Book Icon */}
            <div className="overflow-clip relative shrink-0 size-6">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <path
                  d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14ZM6.5 15A4.5 4.5 0 0 0 2 19.5v-14A4.5 4.5 0 0 1 6.5 1H22v18H6.5A2.5 2.5 0 0 0 4 21.5A2.5 2.5 0 0 1 6.5 19Z"
                  fill="#2D8EF3"
                />
              </svg>
            </div>
            <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[#000000] text-[13px]">
              {curriculum.name}
            </span>
          </div>

          {/* Modules */}
          {curriculum.modules.map((module) => (
            <div key={module.id} className="ml-4 space-y-1">
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200 text-sm">
                {/* Folder Icon */}
                <div className="w-4 h-4 text-yellow-600">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
                  </svg>
                </div>
                <span className="font-['Inter:Regular',_sans-serif] font-normal text-[#707070] text-[14px]">
                  {module.name || 'Untitled Module'}
                </span>
                <div className="ml-auto bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">
                  {module.lessons.length + module.mediaFiles.length}
                </div>
              </div>

              {/* Module Items (if expanded) */}
              {module.isExpanded && (
                <div className="ml-4 space-y-1">
                  {[...module.lessons, ...module.mediaFiles]
                    .sort((a, b) => a.orderNumber - b.orderNumber)
                    .map((item) => (
                      <div key={item.id} className="flex items-center gap-2 p-1 text-xs text-gray-600">
                        <div className="w-3 h-3 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-medium">
                          {item.orderNumber}
                        </div>
                        <span className="truncate font-['Inter:Regular',_sans-serif] font-normal text-[12px]">
                          {item.name}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px]">
            Enter a curriculum name to see the outline
          </p>
        </div>
      )}
    </div>
  )
}
