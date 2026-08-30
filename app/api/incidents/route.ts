import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { incidentSchema } from "../../validationSchemas";
import {getServerSession} from "next-auth/next";
import authOptions from "../auth/authOptions";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
    
    

    const body = await request.json();
    const validation = incidentSchema.safeParse(body);

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