import { useContext } from "react";
import { SidebarContext } from "./Components/Contexts/SidebarContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./Store/store";

// Хук для удобного использования контекста
export const useSidebar = () => useContext(SidebarContext);

// Хуки для использования redux
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();