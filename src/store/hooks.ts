import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from ".";

// Custom hook for dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook for selecting state
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
