// import { PrismaClient } from '@prisma/client'
// import { PrismaMariaDb } from '@prisma/adapter-mariadb'

// const prismaClientSingleton = () => {
//     // Converts mysql:// to mariadb:// for the mariadb driver compatibility
//     const connectionString = process.env.DATABASE_URL?.replace(/^mysql:/, 'mariadb:')

    

//     const adapter = new PrismaMariaDb(connectionString!)
//     return new PrismaClient({ adapter })
// }

// declare global {
//     var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined
// }

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// export default prisma

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma




import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma

