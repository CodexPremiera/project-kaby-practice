"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerifyLinkPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      const res = await fetch("/api/verify-token", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (res.ok) {
        console.log("Verified!", result);
        await fetch("/api/set-acting-role", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                acting_as_barangay: result.barangay_user_id,
                access_role: result.access_role,
        }),
        });

        router.push("/home");

      } else {
        //alert(result.error || "Invalid or expired token.");
      }
    };

    verify();
  }, [token]);

  return <div>Verifying your access…</div>;
}
