export default function GraphBar({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="18"
      viewBox="0 0 18 18"
      width="18"
    >
      <defs></defs>
      <title>S GraphBarVertical 18 N</title>
      <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" />
      <path
        className="fill"
        d="M13,1.5V15h3V1.5a.5.5,0,0,0-.5-.5h-2A.5.5,0,0,0,13,1.5Z"
      />
      <path
        className="fill"
        d="M9,6.5V15h3V6.5a.5.5,0,0,0-.5-.5h-2A.5.5,0,0,0,9,6.5Z"
      />
      <path
        className="fill"
        d="M5,10.5V15H8V10.5a.5.5,0,0,0-.5-.5h-2A.5.5,0,0,0,5,10.5Z"
      />
      <path
        className="fill"
        d="M1,12.5V15H4V12.5a.5.5,0,0,0-.5-.5h-2A.5.5,0,0,0,1,12.5Z"
      />
      <rect className="fill" height="1" rx="0.25" width="17" y="16" />
    </svg>
  );
}
