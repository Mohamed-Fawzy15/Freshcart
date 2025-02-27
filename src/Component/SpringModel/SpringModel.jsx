import { AnimatePresence, motion } from "framer-motion";
import ProductDetails from "../../Pages/ProductDetails/ProductDetails";

export default function SpringModel({ isOpen, setIsOpen, productId }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br bg-white text-black p-6 rounded-lg w-full max-w-4xl shadow-xl cursor-default relative overflow-hidden dark:bg-[#111827]"
          >
            <ProductDetails productId={productId} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
