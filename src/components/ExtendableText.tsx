import { useState } from 'react';

interface ExtendableTextProps {
  children: string;
}

const ExtendableText = ({ children }: ExtendableTextProps) => {
  const [isexpanded, setExpanded] = useState(false);

  const txt = isexpanded ? (
    <p>{children}</p>
  ) : (
    <p>{children.substring(0, 25)} ...</p>
  );

  return (
    <>
      <p>{txt}</p>
      <button
        onClick={() => {
          setExpanded(!isexpanded);
        }}
      >
        {isexpanded ? 'Less' : 'More'}
      </button>
    </>
  );
};

export default ExtendableText;
