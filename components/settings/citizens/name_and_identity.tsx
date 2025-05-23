"use client";

import React, { useState, useEffect } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextField from "@/components/ui/form/TextField";
import SelectField from "@/components/ui/form/SelectField";
import DateField from "@/components/ui/form/DateField";
import { profile } from "console";
import UploadProfilePic from "@/services/UploadProfilePic";
import { createClient } from "@/utils/supabase/client";


interface NameIdentityProps {
  userId: string | null;
}

function NameAndIdentity({ userId }: NameIdentityProps) {
  const [originalData, setOriginalData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    suffix: "",
    sex: "",
    birthdate: "",
    birthplace: "",
    profile_pic:"",
  });

  const [formData, setFormData] = useState({ ...originalData });
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Fetch original data
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`/api/citizen_settings/name_identity/${userId}`, {
          method: "GET",
          cache: "no-store",
        });
        
        const data = await res.json();
        const userData = data?.data;
        console.log(userData, "this is userData");
        const parsed = {
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
          middle_name: userData.middle_name || "",
          suffix: userData.suffix || "",
          sex: userData.sex || "",
          birthdate: userData.birthdate || "",
          birthplace: userData.birthplace || "",
          profile_pic : userData.profile_pic || "",
        };

        setOriginalData(parsed);
        setFormData(parsed);
      } catch (error) {
        console.error("Error fetching citizen info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Detect changes
  useEffect(() => {
    const hasChanged = Object.entries(formData).some(
      ([key, value]) => value !== originalData[key as keyof typeof originalData]
    );
    setIsDisabled(!hasChanged);
  }, [formData, originalData]);

  const handleReset = () => setFormData({ ...originalData });
  const handleSave = async () => {
    setSubmitting(true);
    const supabase = createClient(); // instantiate Supabase client
    const uploadService = new UploadProfilePic(supabase);

    let profilePicPath = originalData.profile_pic;

    // If a new file is selected, upload it
    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      try {
        await uploadService.uploadProfilePic(filePath, selectedFile);
        profilePicPath = filePath;
        setSelectedFile(null);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }

    const dataToUpdate = {
      ...formData,
      profile_pic: profilePicPath,
    };

    try {
      const res = await fetch(`/api/citizen_settings/name_identity/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate),
      });

      if (!res.ok) throw new Error("Failed to update data");

      setOriginalData(dataToUpdate);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading identity data...</div>;

  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-start gap-2 lg:gap-4 w-full">
        <h1 className="text-[1.75rem] font-semibold hidden lg:block">Name and identity</h1>
        <p className="text-sm text-muted-foreground">
          Keep confidential details private. Information you add here is visible to anyone who can view your profile.
        </p>
      </div>

      {/* Form Fields */}
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
      <div className="flex flex-col gap-8 w-full mt-6">
        <div className="flex max-md:flex-col gap-4 w-full">
          <TextField
            field_name="Firstname"
            placeholder="Enter your firstname"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            hasChanged={formData.first_name !== originalData.first_name}
          />
          <TextField
            field_name="Lastname"
            placeholder="Enter your lastname"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            hasChanged={formData.last_name !== originalData.last_name}
          />
        </div>

        <div className="flex max-md:flex-col gap-4 w-full">
          <TextField
            field_name="Middle name"
            placeholder="Enter your middle name"
            value={formData.middle_name}
            onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
            hasChanged={formData.middle_name !== originalData.middle_name}
          />
          <TextField
            field_name="Suffix"
            placeholder="Enter your suffix"
            value={formData.suffix}
            onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
            hasChanged={formData.suffix !== originalData.suffix}
          />
        </div>

        <div className="flex max-md:flex-col gap-4 w-full">
          <SelectField
            field_name="Sex"
            value={formData.sex}
            onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
            options={["Male", "Female", "Non-binary", "Prefer not to say"]}
            hasChanged={formData.sex !== originalData.sex}
          />
          <DateField
            field_name="Birthdate"
            value={formData.birthdate}
            onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
            hasChanged={formData.birthdate !== originalData.birthdate}
          />
          <TextField
            field_name="Birthplace"
            placeholder="Enter your birthplace"
            value={formData.birthplace}
            onChange={(e) => setFormData({ ...formData, birthplace: e.target.value })}
            hasChanged={formData.birthplace !== originalData.birthplace}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 py-4">
        <ButtonSecondary disabled={isDisabled || submitting} onClick={handleReset} className="max-md:grow">
          Reset
        </ButtonSecondary>
        <ButtonPrimary disabled={isDisabled || submitting} onClick={handleSave} className="max-md:grow">
          {submitting ? "Saving..." : "Save"}
        </ButtonPrimary>
      </div>
    </>
  );
}
const getPublicImageUrl = (path: string | null | undefined) => {
  if (!path) return "/default-avatar.png";
  if (path.startsWith("blob:")) return path;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-pictures/${path}`;
};


export default NameAndIdentity;
