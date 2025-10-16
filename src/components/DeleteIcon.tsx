export const DeleteIcon = () => {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="delete-icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <polyline
          points="3,6 5,6 21,6"
          stroke="white"
          strokeWidth="2"
        />
        <path
          d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        <line
          x1="10"
          y1="11"
          x2="10"
          y2="17"
          stroke="white"
          strokeWidth="2"
        />
        <line
          x1="14"
          y1="11"
          x2="14"
          y2="17"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}
