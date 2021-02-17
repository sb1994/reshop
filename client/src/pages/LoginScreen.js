import { motion } from "framer-motion";
import React from "react";

const LoginScreen = () => {
  const loginVariants = {
    hidden: {
      opacity: 0,
      x: "-100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        duration: 0.3,
      },
    },
    exit: {
      x: "100vw",
      transition: {
        ease: "easeInOut",
        duration: 0.3,

        delay: 0.2,
      },
    },
  };
  return (
    <motion.div
      variants={loginVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1>LoginScreen</h1>
    </motion.div>
  );
};

export default LoginScreen;
