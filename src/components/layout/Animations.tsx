import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export const FadeDrop = (props: Props) => {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={props.className}>
      {props.children}
    </motion.div>
  );
};

export const FadeDelay = (props: Props) => {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.3 }} className={props.className}>
        {props.children}
      </motion.div>
    );
  };
