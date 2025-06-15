// components/ui/tabs/TabSwitcher.tsx

"use client";

import { JSX, ReactNode, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SwitchTab from "@/components/ui/tabs/SwitchTab";

type TabSwitcherProps<T extends string> = {
	tabComponents: Record<T, ReactNode>;
	tabLabels: Record<T, string>;
	tabCounts?: Record<T, number>;
	defaultTab: T;
	className?: string;
	switchTabClass?: string;
	activeTab?: T;
	setActiveTab?: (tab: T) => void;
};

function TabSwitcher<T extends string>({
	tabComponents,
	tabLabels,
	tabCounts,
	defaultTab,
	className = "",
	switchTabClass = "",
	activeTab: controlledTab,
	setActiveTab: setControlledTab,
}: TabSwitcherProps<T>) {
	const searchParams = useSearchParams();
	const router = useRouter();

	const tabParam = searchParams.get("tab") as T;
	const resolvedDefaultTab: T =
		tabParam && tabComponents[tabParam] ? tabParam : defaultTab;

	const [internalTab, setInternalTab] = useState<T>(resolvedDefaultTab);
	const isControlled =
		controlledTab !== undefined && setControlledTab !== undefined;

	const activeTab = isControlled ? controlledTab : internalTab;

	const changeTab = (tab: T) => {
		if (isControlled) {
			setControlledTab!(tab);
		} else {
			setInternalTab(tab);
		}
	};

	useEffect(() => {
		if (tabParam && tabParam !== activeTab) {
			if (isControlled) {
				setControlledTab!(tabParam);
			} else {
				setInternalTab(tabParam);
			}
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
					<div className="flex items-center gap-2">
						<span>{tabLabels[tab]}</span>
						{tabCounts && tabCounts[tab] > 0 && (
							<span className="inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs w-5 h-5">
								{tabCounts[tab]}
							</span>
						)}
					</div>
				</SwitchTab>
			))}
		</nav>
	);
}

export default TabSwitcher;
