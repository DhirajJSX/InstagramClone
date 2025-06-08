import React from "react";
import Err from "../img/Error404/404_Not.png";
import { motion } from "framer-motion";

function Error404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0e0e0e] to-[#1a1a1a] px-4 py-10">
      <motion.div
        className="bg-white/5 backdrop-blur-xl border border-white/10 text-white w-full max-w-sm p-8 rounded-2xl shadow-xl shadow-white/5 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.img
          src={Err}
          alt="404 Not Found"
          className="w-64 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        />
        <motion.h1
          className="text-4xl font-extrabold mb-4 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          Error 404
        </motion.h1>
        <motion.p
          className="text-gray-400 text-center text-lg max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        >
          Sorry, the page you're looking for does not exist or has been moved.
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Error404;
