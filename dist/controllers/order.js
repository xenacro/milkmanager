"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCapacity = exports.deleteOrder = exports.updateOrderStatus = exports.updateOrder = exports.createOrder = exports.getOrder = void 0;
const client_1 = require("@prisma/client");
const genericFunctions_1 = require("../utils/genericFunctions");
const prisma = new client_1.PrismaClient();
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield prisma.order.findUnique({
            where: {
                id: req.params.id
            }
        });
        if (!order) {
            return res.status(404).json({ status: 0, message: "Order not found", data: null });
        }
        return res.status(200).json({ status: 1, message: "Order found", data: order });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: 0, message: "Something went wrong", data: err });
    }
});
exports.getOrder = getOrder;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, date } = req.body;
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var givenDate = new Date(date);
        givenDate.setHours(0, 0, 0, 0);
        if (givenDate < today) {
            return res.status(400).json({ status: 0, message: "No Time Travellers Available", data: null });
        }
        const capacity = Number(req.body.amount);
        if (capacity < 0.5)
            return res.status(400).json({ status: 0, message: "Amount must be atleast 0.5", data: null });
        const maxv = Number(500);
        const remCapacity = yield prisma.dateCapacity.findUnique({
            where: {
                date: (0, genericFunctions_1.formatDate)(new Date(date)),
            }
        });
        if (!remCapacity) {
            if (capacity > BigInt(500))
                return res.status(400).json({ status: 0, message: "Capacity is too high", data: null });
            const newDateCapacity = yield prisma.dateCapacity.create({
                data: {
                    date: (0, genericFunctions_1.formatDate)(new Date(date)),
                    capacity: maxv - capacity
                }
            });
        }
        if ((remCapacity === null || remCapacity === void 0 ? void 0 : remCapacity.capacity) < capacity)
            return res.status(400).json({ status: 0, message: `Capacity is too high only ${remCapacity === null || remCapacity === void 0 ? void 0 : remCapacity.capacity} remaning`, data: null });
        const existingUser = yield prisma.customer.findUnique({
            where: {
                email: email
            }
        });
        if (!existingUser) {
            const newUser = yield prisma.customer.create({
                data: {
                    name: name,
                    email: email
                }
            });
            const newOrder = yield prisma.order.create({
                data: {
                    date: (0, genericFunctions_1.formatDate)(new Date(date)),
                    amount: capacity,
                    customerId: newUser.id
                }
            });
            return res.status(200).json({ status: 1, message: "Order created", data: newOrder });
        }
        const updateCap = yield prisma.dateCapacity.update({
            where: {
                date: (0, genericFunctions_1.formatDate)(new Date(date)),
            },
            data: {
                capacity: remCapacity.capacity - capacity
            }
        });
        const newOrder = yield prisma.order.create({
            data: {
                date: (0, genericFunctions_1.formatDate)(new Date(date)),
                amount: capacity,
                customerId: existingUser.id
            }
        });
        return res.status(201).json({ status: 1, message: "Order created", data: newOrder });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: 0, message: "Something went wrong", data: err });
    }
});
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield prisma.order.findUnique({
            where: {
                id: req.params.id
            }
        });
        if (!order) {
            return res.status(404).json({ status: 0, message: "Order not found", data: null });
        }
        const { name, email, date } = req.body;
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var givenDate = new Date(date);
        givenDate.setHours(0, 0, 0, 0);
        if (givenDate < today) {
            return res.status(400).json({ status: 0, message: "No Time Travellers Available", data: null });
        }
        const capacity = Number(req.body.amount);
        if (capacity < 0.5)
            return res.status(400).json({ status: 0, message: "Amount must be atleast 0.5", data: null });
        const maxv = Number(500);
        const remCapacity = yield prisma.dateCapacity.findUnique({
            where: {
                date: (0, genericFunctions_1.formatDate)(new Date(date)),
            }
        });
        if (!remCapacity) {
            if (capacity > BigInt(500))
                return res.status(400).json({ status: 0, message: "Capacity is too high", data: null });
            const newDateCapacity = yield prisma.dateCapacity.create({
                data: {
                    date: (0, genericFunctions_1.formatDate)(new Date(date)),
                    capacity: maxv - capacity
                }
            });
        }
        else if ((remCapacity === null || remCapacity === void 0 ? void 0 : remCapacity.capacity) < capacity)
            return res.status(400).json({ status: 0, message: `Capacity is too high only ${remCapacity === null || remCapacity === void 0 ? void 0 : remCapacity.capacity} remaning`, data: null });
        else {
            const updateCap = yield prisma.dateCapacity.update({
                where: {
                    date: (0, genericFunctions_1.formatDate)(new Date(date)),
                },
                data: {
                    capacity: remCapacity.capacity - capacity
                }
            });
        }
        const existingUser = yield prisma.customer.findUnique({
            where: {
                email: email
            }
        });
        if (!existingUser) {
            const newUser = yield prisma.customer.create({
                data: {
                    name: name,
                    email: email
                }
            });
            const oldCap = yield prisma.dateCapacity.findUnique({
                where: {
                    date: order.date,
                }
            });
            if (oldCap) {
                const updateOldCap = yield prisma.dateCapacity.update({
                    where: {
                        date: order.date,
                    },
                    data: {
                        capacity: oldCap.capacity + capacity
                    }
                });
            }
            const newOrder = yield prisma.order.update({
                where: {
                    id: req.params.id
                },
                data: {
                    date: (0, genericFunctions_1.formatDate)(new Date(date)),
                    amount: capacity,
                    customerId: newUser.id
                }
            });
            return res.status(200).json({ status: 1, message: "Order updated", data: newOrder });
        }
        const oldCap = yield prisma.dateCapacity.findUnique({
            where: {
                date: order.date,
            }
        });
        if (oldCap) {
            const updateOldCap = yield prisma.dateCapacity.update({
                where: {
                    date: order.date,
                },
                data: {
                    capacity: oldCap.capacity + capacity
                }
            });
        }
        const newOrder = yield prisma.order.update({
            where: {
                id: req.params.id
            },
            data: {
                date: (0, genericFunctions_1.formatDate)(new Date(date)),
                amount: capacity,
                customerId: existingUser.id
            }
        });
        return res.status(200).json({ status: 1, message: "Order updated", data: newOrder });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: 0, message: "Something went wrong", data: err });
    }
});
exports.updateOrder = updateOrder;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield prisma.order.findUnique({
            where: {
                id: req.params.id
            }
        });
        if (!order) {
            return res.status(404).json({ status: 0, message: "Order not found", data: null });
        }
        const newOrder = yield prisma.order.update({
            where: {
                id: req.params.id
            },
            data: {
                status: req.body.status
            }
        });
        return res.status(200).json({ status: 1, message: "Order updated", data: newOrder });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: 0, message: "Something went wrong", data: err });
    }
});
exports.updateOrderStatus = updateOrderStatus;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield prisma.order.findUnique({
            where: {
                id: req.params.id
            }
        });
        if (!order) {
            return res.status(404).json({ status: 0, message: "Order not found", data: null });
        }
        const oldCap = yield prisma.dateCapacity.findUnique({
            where: {
                date: order.date,
            }
        });
        const updateOldCap = yield prisma.dateCapacity.update({
            where: {
                date: order.date,
            },
            data: {
                capacity: oldCap.capacity + order.amount
            }
        });
        const deleteOrder = yield prisma.order.delete({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({ status: 1, message: "Order deleted", data: deleteOrder });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: 0, message: "Something went wrong", data: err });
    }
});
exports.deleteOrder = deleteOrder;
const checkCapacity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = req.params.date;
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var givenDate = new Date(date);
        givenDate.setHours(0, 0, 0, 0);
        if (givenDate < today)
            return res.status(400).json({ status: 0, message: "Get Over The Past", data: null });
        const capacity = yield prisma.dateCapacity.findUnique({
            where: {
                date: (0, genericFunctions_1.formatDate)(givenDate),
            }
        });
        if (!capacity) {
            return res.status(404).json({ status: 0, message: "Capacity not found", data: null });
        }
        return res.status(200).json({ status: 1, message: "Capacity found", data: capacity });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: 0, message: "Something went wrong", data: err });
    }
});
exports.checkCapacity = checkCapacity;
