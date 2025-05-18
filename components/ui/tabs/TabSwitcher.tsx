// components/ui/tabs/TabSwitcher.tsx

"use client";

import {JSX, useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import SwitchTab from "@/components/ui/tabs/SwitchTab";

type TabSwitcherProps<T extends string> = {
  tabComponents: Record<T, JSX.Element>;
  tabLabels: Record<T, string>;
  defaultTab: T;
  className?: string;
  switchTabClass?: string;
  activeTab?: T;
  setActiveTab?: (tab: T) => void;
};

function TabSwitcher<T extends string>({
                                         tabComponents,
                                         tabLabels,
                                         defaultTab,
                                         className = "",
                                         switchTabClass = "",
                                         activeTab: controlledTab,
                                         setActiveTab: setControlledTab,
                                       }: TabSwitcherProps<T>) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab") as T;
  const resolvedDefaultTab: T = tabParam && tabComponents[tabParam] ? tabParam : defaultTab;

  const [internalTab, setInternalTab] = useState<T>(resolvedDefaultTab);
  const isControlled = controlledTab !== undefined && setControlledTab !== undefined;

  const activeTab = isControlled ? controlledTab : internalTab;

  const changeTab = (tab: T) => {
    if (isControlled) {
      setControlledTab!(tab);
    } else {
      setInternalTab(tab);
    }
    router.push(`?tab=${tab}`);
  };

  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      changeTab(tabParam);
    }
  }, [tabParam]);

  return (
    <nav className={`${className}`}>
      {(Object.keys(tabComponents) as T[]).map((tab) => (
        <SwitchTab
          key={tab}
          onClick={() => changeTab(tab)}
          active={activeTab === tab}
          className={`${switchTabClass}`}
        >
          {tabLabels[tab]}
        </SwitchTab>
      ))}
    </nav>
  );
}

export default TabSwitcher;
