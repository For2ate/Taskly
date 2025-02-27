import React, { createContext, useState, useContext } from "react";

interface SidebarContextType {
  isOpen: boolean;
  toggleSideBar: () => void;
}

// Создаем контекст с начальными значениями
export const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  toggleSideBar: () => {},
});

// Создаем провайдер для контекста
export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // Функция для переключения состояния сайдбара
  const toggleSideBar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSideBar }}>
      {children}
    </SidebarContext.Provider>
  );
};
