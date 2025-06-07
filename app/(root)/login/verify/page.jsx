"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthWrapper from "@/components/auth/AuthWrapper";
import Link from "next/link";
import VerifyClientForm from "./VerifyClient";



export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return;
    
    // Call backend to validate token
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
        // Optionally: update session, redirect, etc.
        router.push("/home"); // Or wherever you want
      } else {
        alert(result.error || "Invalid or expired token.");
      }
    };

    verify();
  }, [token]);

  // return <div>Verifying your access…</div>;
    return (
      <AuthWrapper>
        <>
        <h1 className="font-semibold text-center">Verify</h1>
  			<VerifyClientForm/>


        </>
      </AuthWrapper>
    );
}
