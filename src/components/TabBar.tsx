import React from 'react';
import { Tabs } from 'react-bootstrap';

interface TabBarProps {
  children: React.ReactNode;
}

/**
 * Renders a Tab Bar component with the provided children inside Tabs component.
 *
 * @param {TabBarProps} children - The children elements to be rendered inside the Tab Bar.
 * @return {ReactElement} The Tab Bar component.
 */
const TabBar: React.FC<TabBarProps> = ({ children }): React.ReactElement => {
  return <Tabs defaultActiveKey="token" className="mb-3">{children}</Tabs>;
};

export default TabBar;