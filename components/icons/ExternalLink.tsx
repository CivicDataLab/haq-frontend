export default function ExternalLink({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="#F65940"
      {...props}
      viewBox="0 0 18 18"
    >
      <path d="M6 3a1 1 0 0 1 0 2H2v11h11v-4a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5Zm11-3a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V3.413L8.914 10.5A1 1 0 0 1 7.5 9.086L14.585 2H11a1 1 0 1 1 0-2h6Z" />
    </svg>
  );
}
