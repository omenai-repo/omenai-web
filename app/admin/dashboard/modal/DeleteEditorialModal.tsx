"use client";

import { AnimatePresence, motion } from "framer-motion";
import UpdatePromotionalModalForm from "./UpdatePromotionalModalForm";
import { adminModals } from "@/store/admin/AdminModalsStore";
import { useState } from "react";
import { LoadSmall } from "@/components/loader/Load";
import { editorial_database } from "@/appwrite";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const DeleteEditorialModal = () => {
    const router = useRouter();
    const { setShowDeleteEditorialModal, showDeleteEditorialModal, showDeleteEditorialId } = adminModals();

    const [loading, setLoading] = useState<boolean>(false);

    const handleEditorialDelete = async () => {
        setLoading(true);

        const response = await editorial_database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_EDITORIAL_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_EDITORIAL_COLLECTION_ID!,
            showDeleteEditorialId
        );

        if(response){
            toast.success('Editorial deleted successfully')

            // router.refresh();
            setShowDeleteEditorialModal(false, '');
            setLoading(false);
            window.location.reload()
        }
    }

    return (
        <AnimatePresence key={30}>
            {showDeleteEditorialModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                        setShowDeleteEditorialModal(false, '');
                    }}
                    className="bg-slate-900/20 backdrop-blur py-8 px-2 fixed inset-0 z-50 grid place-items-center cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white text-dark p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative h-auto"
                    >
                        {/* Add modal form here */}
                        <div className="h-auto w-full">
                        <h1>Are you sure you want to delete editorial?</h1>
                            <div className="flex items-center gap-5 mt-10">
                                <button
                                    disabled={loading}
                                    onClick={handleEditorialDelete}
                                    className="h-[40px] px-4 w-full text-xs text-white disabled:cursor-not-allowed disabled:bg-[#E0E0E0] hover:bg-dark/80 bg-dark duration-300 grid place-items-center"
                                >
                                    {loading ? <LoadSmall /> : "Delete editorial"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
