import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import { formatDate } from "../utils/genericFunctions";

const prisma = new PrismaClient()

export const getOrder = async (req: Request, res: Response) => {
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: req.params.id
            }
        });
        if (!order) {
            return res.status(404).json({status: 0, message: "Order not found", data: null});
        }
        return res.status(200).json({status: 1, message: "Order found", data: order});
    } catch (err) {
        console.log(err);
        return res.status(500).json({status: 0, message: "Something went wrong", data: err});
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { name, email, date } = req.body;
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var givenDate = new Date(date);
        givenDate.setHours(0, 0, 0, 0);
        if(givenDate < today) {
            return res.status(400).json({status: 0, message: "No Time Travellers Available", data: null});
        }
        const capacity : number = Number(req.body.amount);
        if(capacity < 0.5)
            return res.status(400).json({status: 0, message: "Amount must be atleast 0.5", data: null});
        const maxv : number = Number(500);
        const remCapacity = await prisma.dateCapacity.findUnique({
            where: {
                date: formatDate(new Date(date)),
            }
        });
        if (!remCapacity) {
            if(capacity>BigInt(500))
                return res.status(400).json({status: 0, message: "Capacity is too high", data: null});
            const newDateCapacity = await prisma.dateCapacity.create({
                data: {
                    date: formatDate(new Date(date)),
                    capacity: maxv-capacity
                }
            });
        }
        else if(remCapacity?.capacity<capacity)
            return res.status(400).json({status: 0, message: `Capacity is too high only ${remCapacity?.capacity} remaning`, data: null});
        else {
            const updateCap = await prisma.dateCapacity.update({
                where: {
                    date: formatDate(new Date(date)),
                },
                data: {
                    capacity: remCapacity.capacity-capacity
                }
            });
        }
        const existingUser = await prisma.customer.findUnique({
            where: {
                email: email
            }
        });
        if (!existingUser) {
            const newUser = await prisma.customer.create({
                data: {
                    name: name,
                    email: email
                }
            });
            const newOrder = await prisma.order.create({
                data: {
                    date: formatDate(new Date(date)),
                    amount: capacity,
                    customerId: newUser.id
                }
            });
            return res.status(200).json({status: 1, message: "Order created", data: newOrder});
        }
        const newOrder = await prisma.order.create({
            data: {
                date: formatDate(new Date(date)),
                amount: capacity,
                customerId: existingUser.id
            }
        });
        return res.status(201).json({status: 1, message: "Order created", data: newOrder});
    } catch (err) {
        console.log(err);
        return res.status(500).json({status: 0, message: "Something went wrong", data: err});
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: req.params.id
            }
        });
        if (!order) {
            return res.status(404).json({status: 0, message: "Order not found", data: null});
        }
        const { name, email, date } = req.body;
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var givenDate = new Date(date);
        givenDate.setHours(0, 0, 0, 0);
        if(givenDate < today) {
            return res.status(400).json({status: 0, message: "No Time Travellers Available", data: null});
        }
        const capacity : number = Number(req.body.amount);
        if(capacity < 0.5)
            return res.status(400).json({status: 0, message: "Amount must be atleast 0.5", data: null});
        const maxv : number = Number(500);
        const remCapacity = await prisma.dateCapacity.findUnique({
            where: {
                date: formatDate(new Date(date)),
            }
        });
        if (!remCapacity) {
            if(capacity>BigInt(500))
                return res.status(400).json({status: 0, message: "Capacity is too high", data: null});
            const newDateCapacity = await prisma.dateCapacity.create({
                data: {
                    date: formatDate(new Date(date)),
                    capacity: maxv-capacity
                }
            });
        }
        else if(remCapacity?.capacity<capacity)
            return res.status(400).json({status: 0, message: `Capacity is too high only ${remCapacity?.capacity} remaning`, data: null});
        else {
            const updateCap = await prisma.dateCapacity.update({
                where: {
                    date: formatDate(new Date(date)),
                },
                data: {
                    capacity: remCapacity.capacity-capacity
                }
            });
        }
        const existingUser = await prisma.customer.findUnique({
            where: {
                email: email
            }
        });
        if (!existingUser) {
            const newUser = await prisma.customer.create({
                data: {
                    name: name,
                    email: email
                }
            });
            const oldCap = await prisma.dateCapacity.findUnique({
                where: {
                    date: order.date,
                }
            });
            if(oldCap) {
                const updateOldCap = await prisma.dateCapacity.update({
                    where: {
                        date: order.date,
                    },
                    data: {
                        capacity: oldCap.capacity+capacity
                    }
                });
            }
            
            const newOrder = await prisma.order.update({
                where: {
                    id: req.params.id
                },
                data: {
                    date: formatDate(new Date(date)),
                    amount: capacity,
                    customerId: newUser.id
                }
            });
            return res.status(200).json({status: 1, message: "Order updated", data: newOrder});
        }
        const oldCap = await prisma.dateCapacity.findUnique({
            where: {
                date: order.date,
            }
        });
        if(oldCap) {
            const updateOldCap = await prisma.dateCapacity.update({
                where: {
                    date: order.date,
                },
                data: {
                    capacity: oldCap.capacity+capacity
                }
            });
        }
        const newOrder = await prisma.order.update({
            where: {
                id: req.params.id
            },
            data: {
                date: formatDate(new Date(date)),
                amount: capacity,
                customerId: existingUser.id
            }
        });
        return res.status(200).json({status: 1, message: "Order updated", data: newOrder});
    } catch (err) {
        console.log(err);
        return res.status(500).json({status: 0, message: "Something went wrong", data: err});
    }
}

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: req.params.id
            }
        });
        if (!order) {
            return res.status(404).json({status: 0, message: "Order not found", data: null});
        }
        const newOrder = await prisma.order.update({
            where: {
                id: req.params.id
            },
            data: {
                status: req.body.status
            }
        });
        return res.status(200).json({status: 1, message: "Order updated", data: newOrder});
    } catch (err) {
        console.log(err);
        return res.status(500).json({status: 0, message: "Something went wrong", data: err});
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: req.params.id
            }
        });
        if (!order) {
            return res.status(404).json({status: 0, message: "Order not found", data: null});
        }
        const oldCap = await prisma.dateCapacity.findUnique({
            where: {
                date: order.date,
            }
        });
        if(oldCap) {
            const updateOldCap = await prisma.dateCapacity.update({
                where: {
                    date: order.date,
                },
                data: {
                    capacity: oldCap.capacity+order.amount
                }
            });
        }
        const deleteOrder = await prisma.order.delete({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({status: 1, message: "Order deleted", data: deleteOrder});
    } catch (err) {
        console.log(err);
        return res.status(500).json({status: 0, message: "Something went wrong", data: err});
    }
}

export const checkCapacity = async (req: Request, res: Response) => {
    try {
        const date = req.params.date;
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var givenDate = new Date(date);
        givenDate.setHours(0, 0, 0, 0);
        if(givenDate < today)
            return res.status(400).json({status: 0, message: "Get Over The Past", data: null});
        const capacity = await prisma.dateCapacity.findUnique({
            where: {
                date: formatDate(givenDate),
            }
        });
        if (!capacity) {
            return res.status(404).json({status: 0, message: "Capacity not found", data: null});
        }
        return res.status(200).json({status: 1, message: "Capacity found", data: capacity});
    } catch (err) {
        console.log(err);
        return res.status(500).json({status: 0, message: "Something went wrong", data: err});
    }
}