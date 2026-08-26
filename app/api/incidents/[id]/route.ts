import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { incidentSchema } from "@/app/validationSchemas";
import { Prisma } from "@/app/generated/prisma/client";
import { toast } from "sonner";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const incidentId = Number(id);

    if (!Number.isInteger(incidentId)) {
        return NextResponse.json(
            { error: "Invalid incident ID." },
            { status: 400 }
        );
    }

    const data = await req.json();

    const result = incidentSchema.safeParse(data);

    if (!result.success) {
        return NextResponse.json(
            { errors: result.error.issues },
            { status: 400 }
        );
    }

    try {
        const updatedIncident = await prisma.incident.update({
            where: {
                id: incidentId,
            },
            data: result.data,
            
        });

        return NextResponse.json(updatedIncident);
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            return NextResponse.json(
                { error: "Incident not found." },
                { status: 404 }
            );
        }

        console.error(error);

        return NextResponse.json(
            { error: "Failed to update incident." },
            { status: 500 }
        );
    }
}