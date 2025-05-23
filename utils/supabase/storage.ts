const SUPABASE_URL =
	"https://jevvtrbqagijbkdjoveh.supabase.co/storage/v1/object/public";

export function getPublicUrl(path: string, folder: string) {
	return `${SUPABASE_URL}/${folder}/${path}`;
}
