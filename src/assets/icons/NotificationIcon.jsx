const NotificationIcon = ({ width, height, props }) => (
  <svg
    width={width || 24}
    height={height || 24}
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M7.7777 16.7424C8.36743 17.2135 9.14619 17.5 9.99992 17.5C10.8536 17.5 11.6324 17.2135 12.2221 16.7424M3.75628 14.3182C3.40494 14.3182 3.2087 13.7662 3.42123 13.4595C3.91439 12.7479 4.39038 11.7043 4.39038 10.4475L4.41072 8.62638C4.41072 5.24288 6.91309 2.5 9.99992 2.5C13.1322 2.5 15.6714 5.28328 15.6714 8.71662L15.6511 10.4475C15.6511 11.7129 16.1107 12.7623 16.5838 13.4742C16.7881 13.7816 16.5914 14.3182 16.2444 14.3182H3.75628Z'
      stroke={'currentColor'}
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default NotificationIcon;
