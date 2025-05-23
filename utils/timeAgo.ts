// Helper function to convert timestamp to "time ago" string
export function timeAgo(dateString: string) {
	const date = new Date(dateString);
	const now = new Date();
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (seconds < 60) return "just now";
	if (seconds < 3600) {
		const mins = Math.floor(seconds / 60);
		return mins === 1 ? "1 minute ago" : `${mins} minutes ago`;
	}
	if (seconds < 86400) {
		const hours = Math.floor(seconds / 3600);
		return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
	}
	if (seconds < 604800) {
		const days = Math.floor(seconds / 86400);
		return days === 1 ? "1 day ago" : `${days} days ago`;
	}
	return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
