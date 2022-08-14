"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", (req, res) => {
    try {
        const { name, email } = req.body;
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 0, message: "Something went wrong", data: err });
    }
});
