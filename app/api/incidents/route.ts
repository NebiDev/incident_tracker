import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIncidentSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = createIncidentSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(
            {
                message: "Validation failed",
                errors: validation.error.issues,
            },
            { status: 400 }
        );
    }

    const newIncident = await prisma.incident.create({
        data: {
            title: validation.data.title,
            description: validation.data.description,
        },
    });

    return NextResponse.json(
        {
            message: "Incident created successfully",
            incident: newIncident,
        },
        { status: 201 }
    );
}