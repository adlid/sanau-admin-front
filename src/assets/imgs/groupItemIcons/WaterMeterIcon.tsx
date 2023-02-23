import React from "react";

export const WaterMeterIcon = (props: any) => {
  return (
    <svg {...props} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.21 0.8C7.69 0.295 8 0 8 0C8.109 0.363 8.234 0.708 8.371 1.038C9.183 2.984 10.444 4.388 11.568 5.638C12.878 7.096 14 8.345 14 10C14 11.5913 13.3679 13.1174 12.2426 14.2426C11.1174 15.3679 9.5913 16 8 16C6.4087 16 4.88258 15.3679 3.75736 14.2426C2.63214 13.1174 2 11.5913 2 10C2 6.668 5.58 2.517 7.21 0.8ZM7.623 1.821C6.98081 2.51594 6.37051 3.23968 5.794 3.99C5.068 4.94 4.358 5.998 3.834 7.06C3.304 8.133 3 9.138 3 10C3 11.3261 3.52678 12.5979 4.46447 13.5355C5.40215 14.4732 6.67392 15 8 15C9.32608 15 10.5979 14.4732 11.5355 13.5355C12.4732 12.5979 13 11.3261 13 10C13 8.799 12.204 7.843 10.819 6.3L10.789 6.268C9.75 5.11 8.5 3.72 7.623 1.82V1.821Z"
        fill={props.current ? "#18A0FB" : "#8A93A2"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.55298 7.77648C5.37298 6.13548 6.26998 5.02348 6.64598 4.64648L7.35398 5.35448C7.06398 5.64448 6.22598 6.66548 5.44698 8.22448L4.55298 7.77648Z"
        fill={props.current ? "#18A0FB" : "#8A93A2"}
      />
    </svg>
  );
};
