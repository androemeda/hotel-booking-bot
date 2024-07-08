import React from 'react';

const Message = ({ role, content }) => {
  return (
    <div className={`message ${role}`}>
      <p>{content}</p>
    </div>
  );
};

export default Message;