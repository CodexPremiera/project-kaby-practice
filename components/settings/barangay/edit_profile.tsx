"use client";

import React, { useState, useEffect } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextField from "@/components/ui/form/TextField";
import TextAreaField from "@/components/ui/form/TextAreaField";
import UploadProfilePic from "@/services/UploadProfilePic";
import BarangayService from "@/services/BarangayService";
import { createClient } from "@/utils/supabase/client";
import { useBarangayContext } from "@/app/context/BarangayContext";

import SuccessModal from "@/components/modal/SuccessModal";

interface BarangayProfile {
  profile_pic: string;
  barangayName: string;
  address: string;
  about: string;
  website: string;
}

const EditProfile = () => {
  const { barangayId } = useBarangayContext();
  const [formData, setFormData] = useState<BarangayProfile | null>(null);
  const [originalData, setOriginalData] = useState<BarangayProfile | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [modalType, setModalType] = useState<null | "success" | "error">(null);
  const [successMessage, setSuccessMessage] = useState("");

  const supabase = createClient();
  const handleCloseModal = () => {
    setModalType(null);
    // onClose();
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const barangayService = new BarangayService(supabase);
      const data = await barangayService.getBarangayFieldsById(barangayId);
      setFormData(data);
      setOriginalData(data);
      console.log("this is dataaa",data);
    };
    fetchProfile();
  }, [barangayId]);

  useEffect(() => {
    if (!formData || !originalData) {
      setIsDisabled(true);
      return;
    }
    const hasChanged = Object.entries(formData).some(
      ([key, value]) => value !== originalData[key as keyof BarangayProfile]
    );
    setIsDisabled(!hasChanged);
  }, [formData, originalData]);

  const handleReset = () => {
    if (originalData) setFormData(originalData);
  };

  const handleSave = async () => {
    if (!formData) return;

    const uploadService = new UploadProfilePic(supabase);
    const barangayService = new BarangayService(supabase);

    let profilePicPath = formData.profile_pic;

    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;
      await uploadService.uploadProfilePic(filePath, selectedFile);
      profilePicPath = filePath;
      setSelectedFile(null);
    }

    const updatedData = {
      barangayName: formData.barangayName,
      address: formData.address,
      profile_pic: profilePicPath,
      about: formData.about,
      website: formData.website,
    };

    await barangayService.updateBarangayProfile(barangayId, updatedData);
    setSuccessMessage("Profile updated successfully");
      
    setModalType("success");

    const updatedProfile = await barangayService.getBarangayFieldsById(barangayId);
    setFormData(updatedProfile);
    setOriginalData(updatedProfile);
  };

  if (!formData) return <p>Loading...</p>;

  return (
    
    <div className="flex flex-col gap-8 w-full mt-6">
      {modalType === "success" && (
        <SuccessModal
          title="Success"
          content={successMessage}
          onClose={handleCloseModal}
        />
      )}
      <div className="flex justify-center items-center mb-6">
        <div className="relative w-32 h-32">
          <img
            src={getPublicImageUrl(formData.profile_pic)}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border border-gray-300 shadow-sm"
          />
          <label
            htmlFor="profile-pic-upload"
            className="absolute bottom-0 right-0 bg-[#FFDAB9] text-white rounded-full p-1 cursor-pointer hover:bg-primary/90"
          >
            <span className="text-xs font-bold text-black">+</span>
            <input
              id="profile-pic-upload"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setFormData((prev) => ({ ...prev!, profile_pic: imageUrl }));
                  setSelectedFile(file);
                }
              }}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="flex max-md:flex-col gap-4">
        <TextField
          field_name="Barangay Name"
          placeholder="Enter your barangay name"
          value={formData.barangayName}
          onChange={(e) => setFormData({ ...formData, barangayName: e.target.value })}
        />
        <TextField
          field_name="Address"
          placeholder="Enter your barangay address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>

      <TextAreaField
        field_name="About"
        placeholder="Tell us about your barangay"
        value={formData.about}
        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
      />

      <TextField
        field_name="Website"
        placeholder="Enter your barangay website"
        value={formData.website}
        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
      />

      <div className="flex items-center gap-2 py-4">
        <ButtonSecondary disabled={isDisabled} onClick={handleReset}>
          Reset
        </ButtonSecondary>
        <ButtonPrimary disabled={isDisabled} onClick={handleSave}>
          Save
        </ButtonPrimary>
      </div>
    </div>
  );
};

const getPublicImageUrl = (path: string | null | undefined) => {
  if (!path) return "/default-avatar.png";
  if (path.startsWith("blob:")) return path;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-pictures/${path}`;
};

export default EditProfile;
