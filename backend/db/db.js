import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connectDB = async () => {
	try {
		console.log("postgres_uri:", process.env.POSTGRES_URL);
		await prisma.$connect();
		console.log("✅ PostgreSQL Connected Successfully!");
	} catch (error) {
		console.error("❌ Error connecting to PostgreSQL:", error.message);
		process.exit(1);
	}
};

export default prisma;
