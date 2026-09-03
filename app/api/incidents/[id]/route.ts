import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
// import { incidentSchema } from "@/app/validationSchemas";
import {patchIncidentSchema as incidentSchema} from "@/app/validationSchemas";
import { Prisma } from "@prisma/client";
import authOptions from "../../auth/authOptions";
import { getServerSession } from "next-auth";


export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
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

    // validate assignedToUserId
    const { assignedToUserId } = result.data;
    if(assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: { id: assignedToUserId },
        });
        if (!user) {
            return NextResponse.json(
                { error: "Assigned user not found." },
                { status: 400 }
            );
        }
    }

    try {
        const updatedIncident = await prisma.incident.update({
            where: {
                id: incidentId,
            },
            data: {
                title: result.data.title,
                description: result.data.description,
                status: result.data.status,
                assignedToUserId: result.data.assignedToUserId || null,
            }

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


export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
    const { id } = await params;

    const incidentId = Number(id);

    if (!Number.isInteger(incidentId)) {
        return NextResponse.json(
            { error: "Invalid incident ID." },
            { status: 400 }
        );
    }

    try {
        const deletedIncident = await prisma.incident.delete({
            where: {
                id: incidentId,
            },
        });

        return NextResponse.json(deletedIncident);
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
            { error: "Failed to delete incident." },
            { status: 500 }
        );
    }
}