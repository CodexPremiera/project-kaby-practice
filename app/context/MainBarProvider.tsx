"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; // client-side version

export type MainBarContextType = {
  barangay_id: string | null;
  barangay_name: string | null;
  barangay_address: string | null;
  badge_stock: number | null;
  officials_count: number | null;
  residents_count: number | null;
  profile_pic: string | null;
};

const MainBarContext = createContext<MainBarContextType | null>(null);

export const useMainBarContext = () => useContext(MainBarContext);

export const MainBarProvider = ({
  barangayId,
  children,
}: {
  barangayId: string;
  children: React.ReactNode;
}) => {
  const [mainbarData, setMainbarData] = useState<MainBarContextType | null>(
    null
  );
  console.log("This is barangay IDDDDDDDDDDD!!!", barangayId);

  useEffect(() => {
    const fetchMainbar = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("barangay_mainbar")
        .select("*")
        .eq("barangay_id", barangayId)
        .single();
      console.log("dataaaaaaaaaa",data);
      if (error) {
        console.error("Error fetching mainbar:", error);
        return;
      }

      setMainbarData(data);
    };

    fetchMainbar();
  }, [barangayId]);

  return (
    <MainBarContext.Provider value={mainbarData}>
      {children}
    </MainBarContext.Provider>
  );
};
