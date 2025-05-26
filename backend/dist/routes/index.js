"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const linkShare_routes_1 = __importDefault(require("./linkShare.routes"));
const content_routes_1 = __importDefault(require("./content.routes"));
const task_routes_1 = __importDefault(require("./task.routes"));
const router = express_1.default.Router();
router.use("/auth", auth_routes_1.default); //✅
router.use("/share", linkShare_routes_1.default); //✅
router.use("/content", content_routes_1.default); //✅
router.use("/task", task_routes_1.default); //✅
exports.default = router;
