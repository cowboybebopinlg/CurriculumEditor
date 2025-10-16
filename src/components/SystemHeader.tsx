import { ColorHorizontalTag } from './ColorHorizontalTag'
import { HeaderButtons } from './HeaderButtons'

export const SystemHeader = () => {
  return (
    <div className="bg-[#ffffff] sticky top-0 z-30 shrink-0 w-full" data-name="system-header">
      <div aria-hidden="true" className="absolute border-[#bbbbbb] border-[0px_0px_1px] border-solid inset-0 pointer-events-none"></div>
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[15px] py-0 relative w-full">
          <ColorHorizontalTag />
          <HeaderButtons />
        </div>
      </div>
    </div>
  )
}
