export default function IconDropdown({ ...props }) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={props.width ? props.width : '24px'}
        {...props}
      >
        <path d="M7 10L12 15L17 10H7Z" />
      </svg>
    );
  }