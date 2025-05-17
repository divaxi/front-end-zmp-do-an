import { Tabs, Box, Text } from "zmp-ui";
import { FC, useState, ReactNode, ReactElement } from "react";

export type TabsItemsProp = { label: string; content: React.ReactNode }[];

interface PaneProps {
  label: string;
  children?: ReactNode;
}

interface CustomTabBarProps {
  id: string;
  activeKey: string;
  onTabClick: (index: string, e: MouseEvent | KeyboardEvent) => void;
  panes: ReactNode;
}

const CustomTabBar: FC<CustomTabBarProps> = ({
  id,
  activeKey,
  onTabClick,
  panes,
}) => {
  if (Array.isArray(panes) && onTabClick) {
    return (
      <Box className="w-full overflow-auto flex items-center flex-row flex-nowrap whitespace-nowrap gap-8 pb-4 scroll-smooth scrollbar-hide">
        {panes.map((pane, i) => {
          const index = i.toString();

          // Chỉ xử lý nếu pane là ReactElement
          if (!pane || typeof pane !== "object" || !("props" in pane))
            return null;
          const element = pane as ReactElement<PaneProps>;
          const isActive = activeKey === index;

          return (
            <Text.Title
              key={index}
              id={id}
              size="small"
              className={`justify-center text-sm font-semibold pb-2 relative cursor-pointer
                ${isActive ? "text-primary" : "text-inactive"}
                transition-colors duration-300 ease-in-out`}
              onClick={(e) => onTabClick(index, e)}
            >
              {element.props.label}
              <div className="absolute left-0 bottom-0 w-full h-0.5 overflow-hidden">
                <span
                  className={`absolute left-0 bottom-0 h-full bg-primary transition-all duration-300 ease-in-out ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </div>
            </Text.Title>
          );
        })}
      </Box>
    );
  }

  return <>{panes}</>;
};

interface AppTabsProps {
  id: string;
  tabs: TabsItemsProp;
  ariaLabel?: string;
}

const AppTabs: FC<AppTabsProps> = ({ id, tabs, ariaLabel }) => {
  const [activeTab, setActiveTab] = useState(0);

  const a11yProps = (index: number) => ({
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  });

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Box className="max-w-full w-full">
      <Tabs
        id={id}
        aria-label={ariaLabel}
        scrollable
        renderTabBar={(props) => (
          <CustomTabBar
            {...props}
            activeKey={activeTab.toString()}
            onTabClick={(key) => handleTabChange(Number(key))}
          />
        )}
        activeKey={activeTab.toString()}
      >
        {tabs.map((TabItems, index) => (
          <Tabs.Tab key={index} label={TabItems.label} {...a11yProps(index)}>
            <div className={`relative h-full overflow-hidden`}>
              <div
                className={`transition-all duration-500 ease-in-out ${
                  activeTab === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 absolute translate-x-4"
                }`}
              >
                {TabItems.content}
              </div>
            </div>
          </Tabs.Tab>
        ))}
      </Tabs>
    </Box>
  );
};

export default AppTabs;
