// TODO: PWEDE RA GURO WAY REPO OY KAPOY
class UploadProfilePic{
	constructor(supabase) {
		this.supabase = supabase;
	}
	async uploadProfilePic(filePath,selectedFile) {
        console.log(filePath,selectedFile,"this is url");
      const { data, error } = await this.supabase.storage
        .from('profile-pictures')
        .upload(filePath, selectedFile);

      if (error) {
        console.log("error upload",error);
        console.error("Upload error:", error);
        return; 
      }
      console.log("data saved", data);
      return data;
	}
}
export default UploadProfilePic;