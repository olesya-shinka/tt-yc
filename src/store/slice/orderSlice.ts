import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../App";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("ordersState");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: Order[]) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("ordersState", serializedState);
    } catch {
        // Обработка ошибок сохранения состояния
    }
};

const initialState: Order[] = loadState() || [];

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        saveOrdersToLocalStorage(state) {
            saveState(state);
        },
        addOrder(state, action: PayloadAction<Order>) {
            state.push(action.payload);
            saveState(state); // Сохраняем состояние после каждого изменения
        },
        editOrder(state, action: PayloadAction<Order>) {
            const index = state.findIndex((order) => order.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
                saveState(state); // Сохраняем состояние после каждого изменения
            }
        },
        deleteOrder(state, action: PayloadAction<number>) {
            const index = state.findIndex((order) => order.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
                saveState(state); // Сохраняем состояние после каждого изменения
            }
        },
    },
});

export const { addOrder, editOrder, deleteOrder,saveOrdersToLocalStorage } = ordersSlice.actions;

export default ordersSlice.reducer;