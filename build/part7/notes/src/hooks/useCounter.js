"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCounter = void 0;
const react_1 = require("react");
const useCounter = () => {
    const [value, setValue] = (0, react_1.useState)(0);
    const increase = () => {
        setValue(value + 1);
    };
    const decrease = () => {
        setValue(value - 1);
    };
    const zero = () => {
        setValue(0);
    };
    return {
        value, increase, decrease, zero
    };
};
exports.useCounter = useCounter;
