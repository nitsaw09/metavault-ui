import React from 'react';
import { Tabs } from 'react-bootstrap';

interface TabBarProps {
  children: React.ReactNode;
}

const TabBar: React.FC<TabBarProps> = ({ children }) => {
  return <Tabs defaultActiveKey="token" className="mb-3">{children}</Tabs>;
};

export default TabBar;