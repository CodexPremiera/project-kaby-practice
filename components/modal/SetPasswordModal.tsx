"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import PasswordField from "@/components/ui/form/PasswordField";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import SuccessModal from "@/components/modal/SuccessModal";
import ErrorModal from "@/components/modal/ErrorModal";
interface PassModalProps{
  onClose : () => void | null;
}
const SetPasswordModal = ({onClose} : PassModalProps) => {
    console.log("magpakita ka dapat",onClose);
    const [currentPassword, setCurrentPassword] = useState("");
      const [newPassword, setNewPassword] = useState("");
      const [submitting, setSubmitting] = useState(false);
    
      const [modalType, setModalType] = useState<null | "success" | "error">(null);
      const [successMessage, setSuccessMessage] = useState("");

        const handleCloseModal = () => {
          setModalType(null);
          // refresh();
          // onClose();
        };
      const handleChangePassword = async () => {
        if (!currentPassword || !newPassword) {
          setSuccessMessage("Please fill out both password fields.");
          setModalType("error");
          return;
        }
        
        if (currentPassword !== newPassword) {
          setSuccessMessage("Both passwords must be the same.");
          setModalType("error");
          return;
        }
    
        setSubmitting(true);
    
        try {
          const res = await fetch("/api/auth/set_password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              current_password: currentPassword,
              new_password: newPassword,
            }),
          });
    
          const result = await res.json();
    
          if (result.error || result.success === false) {
            setSuccessMessage(result.error || "Password change failed.");
            setModalType("error");
          } else {
            setSuccessMessage("Password changed successfully!");
            setModalType("success");
            setCurrentPassword("");
            setNewPassword("");
            console.log(newPassword)
            // window.location.reload();
            if (onClose) onClose();
          }
        } catch (error) {
          console.error("Password change error:", error);
          // alert("An error occurred while changing your password.");
        } finally {
          setSubmitting(false);
        }
      };
    
	return (
		<>
    {modalType === "success" && (
        <SuccessModal
          title="Success"
          content={successMessage}
          onClose={handleCloseModal}
        />
      )}
      {modalType === "error" && (
        <ErrorModal
          title="Error"
          content={successMessage}
          onClose={handleCloseModal}
        />
      )}
			<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
				<Link href="/login" passHref>
					<button className="absolute top-5 right-5 text-white hover:text-black text-3xl z-50 transition-transform duration-300">
						<RiCloseFill className="w-[25px] h-[25px]" />
					</button>
				</Link>
				<div className="relative flex flex-col h-auto w-md rounded-[20px] bg-primary p-8">
					<h2 className="text-xl font-semibold text-center  border-b border-gray/20 pb-1 h4">
						Set Your Password
					</h2>
					
					<form className="flex flex-col flex-grow">
						<div className="relative my-4">
							{/* <input
								className="floating-input mt-1 w-full text-black"
								type="email"
								id="email"
								name="email"
								placeholder=" "
								required
							/>
							<label htmlFor="email" className="floating-label">
								Email
							</label> */}
                            {/* <span className="font-semibold leading-[120%]">Current Password</span> */}

                            <PasswordField
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter your new password"
                            />
                            <PasswordField
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Confirm your password"
                            />
						</div>
						{/* <div className="mt-auto flex justify-center pt-6">
							<button
								type="submit"
								className="w-[300px] py-2 text-white bg-gray rounded-md hover:bg-black"
							>
								Set Password
							</button>
						</div> */}
                        <ButtonPrimary onClick={handleChangePassword} disabled={submitting}>
                          {submitting ? "Submitting..." : "Update Password"}
                        </ButtonPrimary>
					</form>
				</div>
			</div>
		</>
	);
};

export default SetPasswordModal;
