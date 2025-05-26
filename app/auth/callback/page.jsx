// After user clicks the magic link, the URL will have access_token in hash (#access_token=...)
// You need to call supabase.auth.getSession() to get the current session
// But first, call supabase.auth.getUrlParams() to parse tokens from URL

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function AuthCallback() {
  const router = useRouter();
  useEffect(() => {
    async function handleMagicLink() {
      const hash = window.location.hash;

      if (hash) {
        // Parse the hash params
        const params = new URLSearchParams(hash.substring(1)); // remove #

        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (error) {
            console.error("Error setting session:", error.message);
            router.push("/login");
            return;
          }

          router.push("/account");
          return;
        }
      }

      // No hash tokens found - redirect to login
      router.push("/login");
    }

    handleMagicLink();
  }, [router]);


  return <div className="p-4 text-center">Logging you in...</div>;
}
