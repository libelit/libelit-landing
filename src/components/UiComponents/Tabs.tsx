import { useState, ReactNode } from "react";

interface TabProps {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabProps[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="tabs gap-16">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            className={`tab ${index === activeTab ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            <span className="text-regular">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="tab-content mt-24">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
