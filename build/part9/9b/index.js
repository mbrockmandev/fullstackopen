"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calc_1 = require("./calc");
const app = (0, express_1.default)();
app.get("/ping", (_req, res) => {
    res.send("pong");
});
app.post("/calculate", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value1, value2, op } = req.body;
    if (!value1 || isNaN(Number(value1))) {
        return res.status(400).send({ error: "..." });
    }
    const result = (0, calc_1.calculator)(Number(value1), Number(value2), op);
    return res.send({ result });
});
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
