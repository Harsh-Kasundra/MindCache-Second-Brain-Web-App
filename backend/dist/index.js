"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const sessionConfig_1 = __importDefault(require("./config/sessionConfig"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // ✅ must match your frontend
    credentials: true, // ✅ for cookies or Authorization headers
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(sessionConfig_1.default);
app.use("/api/v1", index_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
