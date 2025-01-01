import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

interface LikeProps {
  // We use this function to inform the consumer of the component that the like button has been clicked.
  onClick: () => void;
}

const Like = ({ onClick }: LikeProps) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    onClick();
  };
  return (
    <FaHeart
      size={60}
      color={liked ? 'red' : 'black'}
      onClick={toggleLike}
    ></FaHeart>
  );
};

export default Like;
