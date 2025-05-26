const SUPABASE_URL =
	`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;

export function getPublicUrl(path: string, folder: string) {
	return `${SUPABASE_URL}/${folder}/${path}`;
}
