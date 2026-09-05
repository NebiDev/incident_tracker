// import LatestIncidents from "./LatestIncidents"
import IncidentSummary from "./IncidentSummary"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function Home() {
    const open = await prisma.incident.count({
        where: { status: "OPEN" }
    });
    const inProgress = await prisma.incident.count({
        where: { status: "IN_PROGRESS" }
    });
    const closed = await prisma.incident.count({
        where: { status: "CLOSED" }
    });


    return (
        <main className="p-5">
            {/* <LatestIncidents /> */}
            <IncidentSummary open={open} inProgress={inProgress} closed={closed} />
           
        </main>
    );
}
