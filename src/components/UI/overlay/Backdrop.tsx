import { motion } from 'framer-motion';
import { styled } from 'styled-components';

interface BackdropProps {
  onClose: () => void;
}

const BackdropArea = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--black);
`;

const Backdrop = ({ onClose }: BackdropProps) => {
  return (
    <BackdropArea
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      exit={{ opacity: 0 }}
    />
  );
};

export default Backdrop;
