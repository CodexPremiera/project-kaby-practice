"use client";

import React, { useState, useEffect } from "react";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextField from "@/components/ui/form/TextField";
import SelectField from "@/components/ui/form/SelectField";
import DateField from "@/components/ui/form/DateField";
import TextAreaField from "@/components/ui/form/TextAreaField";
import EmailField from "@/components/ui/form/EmailField";
import UploadProfilePic from "@/services/UploadProfilePic"
import CitizenService from "@/services/CitizenService";
import BarangayService from "@/services/BarangayService";
import { createClient } from "@/utils/supabase/client";
// import { useUser } from "@/app/context/UserContext";
import { useBarangayContext } from "@/app/context/BarangayContext";
import { useCitizenContext } from "@/app/context/CitizenContext";


interface EditProfileProps {
  role:string |null;
  profile : any;
}
interface BarangayProfile {
    barangayProfilePic :string,
    barangayName: string,
    barangayAddress: string,
    about: string ,
    website: string 
};
interface CitizenProfile {
    profile_pic:string,
    first_name: string,
    last_name: string,
    middle_name:string,
    address:string,
    about: string ,
    website: string 
};
function EditProfile({role,profile} : EditProfileProps) {
  const barangayCtx = useBarangayContext();
  const citizenCtx = useCitizenContext();

  const barangayId = barangayCtx?.barangayId || null;
  const citizenId = citizenCtx?.citizenId || null;

  // Mock original values

  console.log("role is", role," profile is", profile);
  if(role === "barangay"){

  }
  const [barangayData, setBarangayData] = useState<BarangayProfile>();
  const [citizenData, setCitizenData] = useState<CitizenProfile>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  // Form state
  const [barangayFormData, setBarangayFormData] = useState<BarangayProfile | null>(null);
  const [citizenDataForm, setCitizenDataForm] = useState<CitizenProfile | null>(null);

  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (role === "barangay") {
      setBarangayData(profile);
      setBarangayFormData(profile);
    }
    else if (role === "citizen"){
      setCitizenDataForm(profile);
      setCitizenDataForm(profile);
    } 


  }, [role,profile]);

  // Detect changes
  useEffect(() => {
    if (role === "barangay" && barangayFormData && profile) {
      const hasChanged = Object.entries(barangayFormData).some(
        ([key, value]) => value !== profile[key as keyof typeof profile]
      );
      setIsDisabled(!hasChanged);
    } else if (role === "citizen" && citizenDataForm && profile) {
      const hasChanged = Object.entries(citizenDataForm).some(
        ([key, value]) => value !== profile[key as keyof typeof profile]
      );
      setIsDisabled(!hasChanged);
    } else {
      setIsDisabled(true);
    }
  }, [barangayFormData, citizenDataForm, role, profile]);



  // handlers
  const handleReset = () => {
    if (role === "barangay" && profile) {
      setBarangayFormData(profile);
    } else if (role === "citizen" && profile) {
      setCitizenDataForm(profile);
    }
  };

const handleSave = async () => {
  
  const supabase =  createClient();
  const uploadService = new UploadProfilePic(supabase);
  let profile_pic = null;
  if (role === "barangay" && barangayFormData) {
    const barangayService = new BarangayService(supabase);
    let profilePicPath = barangayFormData.barangayProfilePic;
    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      profile_pic = await uploadService.uploadProfilePic(filePath,selectedFile);

      profilePicPath = filePath; 

      setBarangayFormData(prev => ({
        ...prev!,
        barangayProfilePic: profilePicPath,
      }));

      setSelectedFile(null);
    }

    console.log("Saving barangay", {
      ...barangayFormData,
      barangayProfilePic: profilePicPath,
    });
    const updatedData = {
      barangayName : barangayFormData.barangayName,
      address : barangayFormData.barangayAddress,
      profile_pic : profilePicPath,
    }
    console.log(updatedData, "updated form data");
    const data = await barangayService.updateBarangayProfile(barangayId,updatedData);
    console.log("this is updated data", data);
    alert("successfully edited profile");

  }

  else if (role === "citizen" && citizenDataForm) {
    const citizenService = new CitizenService(supabase);

    let profilePicPath = citizenDataForm.profile_pic;

    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      profile_pic = await uploadService.uploadProfilePic(filePath,selectedFile);

      profilePicPath = filePath;

      setCitizenDataForm(prev => ({
        ...prev!,
        profile_pic: profilePicPath,
      }));

      setSelectedFile(null);
    }

    console.log("Saving citizen", {
      ...citizenDataForm,
      profile_pic: profilePicPath,
    });
    const updatedData = {
      first_name : citizenDataForm.first_name,
      last_name : citizenDataForm.last_name,
      address : citizenDataForm.address,
      profile_pic : profile_pic.path,
    }
    console.log(updatedData, "updated form data");
    const data = await citizenService.updateCitizenProfile(barangayId,updatedData);
    console.log("this is updated data", data);
  }
};




  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-start gap-2 lg:gap-4 w-full">
        <h1 className="text-[1.75rem] font-semibold hidden lg:block">Edit profile</h1>
        <p className="text-sm text-muted-foreground">
          Keep confidential details private. Information you add here is visible to anyone who can view your profile.
        </p>
      </div>
      



      {/* Form Fields */}
      <div className="flex flex-col gap-8 w-full mt-6">
        { role === "barangay" &&(
          <>
            <div className="w-full flex justify-center items-center mb-6">

              <div className="relative w-32 h-32 mb-6">
                <img
                  // src={`/${barangayData?.barangayProfilePic}`} 
                  src={getPublicImageUrl(barangayFormData?.barangayProfilePic)}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border border-gray-300 shadow-sm"
                />
                <label
                  htmlFor="profile-pic-upload"
                  className="absolute bottom-0 right-0 bg-[#FFDAB9] text-white rounded-full p-1 cursor-pointer hover:bg-primary/90"
                >
                  <span className=" text-xs font-bold text-black">+</span>
                  <input
                    id="profile-pic-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                          setBarangayFormData(prev => ({
                          ...prev!,
                          barangayProfilePic: imageUrl
                        }));
                        setSelectedFile(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>

            </div>
            <div className="flex max-md:flex-col gap-8 md:gap-4 w-full">
              <TextField
                field_name="Barangay Name"
                placeholder="Enter your barangay name"
                value={barangayFormData?.barangayName ?? ""}
                onChange={(e) => setBarangayFormData({ ...barangayFormData!, barangayName: e.target.value })}
              />
              <TextField
                field_name="Address"
                placeholder="Type new address to change"
                value={barangayFormData?.barangayAddress ?? ""}
                onChange={(e) => setBarangayFormData({ ...barangayFormData!, barangayAddress: e.target.value })}
              />
            </div>

            <TextAreaField
              field_name="About"
              placeholder="Tell us about your barangay"
              
              value={barangayFormData?.about ?? ""}
              onChange={(e) => setBarangayFormData({ ...barangayFormData!, about: e.target.value })}

            />

            <TextField
              field_name="Website"
              placeholder="Enter your barangay website"
              
              value={barangayFormData?.website ?? ""}
              onChange={(e) => setBarangayFormData({ ...barangayFormData!, website: e.target.value })}
  
            />

          </>
        )}

        { role === "citizen" &&(
          <>
            
            <div className="relative w-32 h-32 mb-6">
                <img
                  src={getPublicImageUrl(citizenDataForm?.profile_pic)}

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
                        setCitizenData(prev => ({
                          ...prev!,
                          profile_pic: imageUrl
                        }));
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>

          
            <div className="flex max-md:flex-col gap-8 md:gap-4 w-full">
              <TextField
                field_name="First Name"
                placeholder="Enter your First Name"
                
                value={citizenDataForm?.first_name ?? ""}
                onChange={(e) => setCitizenDataForm({ ...citizenDataForm!, first_name: e.target.value })}
              />
              <TextField
                field_name="Last Name"
                placeholder="Enter your Last Name"
                
                value={citizenDataForm?.last_name ?? ""}
                onChange={(e) => setCitizenDataForm({ ...citizenDataForm!, last_name: e.target.value })}
              />
              <TextField
                field_name="Enter address"
                placeholder="Type new address to change"
                
                value={citizenDataForm?.address ?? ""}
                onChange={(e) => setCitizenDataForm({ ...citizenDataForm!, address: e.target.value })}
              />
            </div>

            <TextAreaField
              field_name="About"
              placeholder="Tell us about your barangay"
              
                value={citizenDataForm?.about ?? ""}
                onChange={(e) => setCitizenDataForm({ ...citizenDataForm!, about: e.target.value })}
            />

            <TextField
              field_name="Website"
              placeholder="Enter your barangay website"
              
              value={citizenDataForm?.website ?? ""}
              onChange={(e) => setCitizenDataForm({ ...citizenDataForm!, website: e.target.value })}
            />

          </>
        )}
        
        <div className="flex items-center gap-2 py-4">
          <ButtonSecondary disabled={isDisabled} onClick={handleReset} className="max-md:grow">Reset</ButtonSecondary>
          <ButtonPrimary disabled={isDisabled} onClick={handleSave} className="max-md:grow">Save</ButtonPrimary>
        </div>
      </div>
    </>
  );
}
const getPublicImageUrl = (path: string | null | undefined) => {
  if (!path) return "/default-avatar.png"; 
  if (path.startsWith("blob:")) return path;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-pictures/${path}`;

};
export default EditProfile;