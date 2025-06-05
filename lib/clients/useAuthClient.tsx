export type CurrentUser = { user_id: string; role: string } | null;

export const getCurrentUser = async (): Promise<CurrentUser> => {
	try {
		const res = await fetch("/api/auth/login");
		if (!res.ok) throw new Error("Failed to fetch user");
		const data = await res.json();
		if (!data.user_id || !data.role) return null;
		return { user_id: data.user_id, role: data.role };
	} catch (err) {
		console.error("Error fetching current user:", err);
		return null;
	}
};
