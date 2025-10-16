interface ColorHorizontalTagProps {
  color?: string
  text?: string
}

export const ColorHorizontalTag = ({ 
  color = '#d4b8ff', 
  text 
}: ColorHorizontalTagProps) => {
  return (
    <div className="shrink-0 content-stretch flex items-center justify-start min-h-px min-w-px gap-[7.5px] relative">
      {/* Color indicator */}
      <div 
        className="shrink-0 size-[25px] rounded-[7.5px]"
        style={{ backgroundColor: color }}
      />
      
      {/* Text if provided */}
      {text && (
        <div className="text-[#030213] text-[14px] font-medium tracking-[0px]">
          {text}
        </div>
      )}
    </div>
  )
}
