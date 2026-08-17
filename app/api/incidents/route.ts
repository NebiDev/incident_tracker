import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createIncidentSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(10).max(255)
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIncidentSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const newIncident = await prisma.incident.create({
        data: {
            title: validation.data.title,
            description: validation.data.description
        }
    });

    return NextResponse.json(newIncident, { status: 201 });
}