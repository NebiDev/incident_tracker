import Pagination from "./incidents/_components/Pagination";

interface HomeProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
    const resolvedSearchParams = await searchParams;
    const page = parseInt(resolvedSearchParams.page || '1') || 1;

    return (
        <main className="p-5">
            {/* Test Pagination */}
            <Pagination
                itemCount={100}
                pageSize={10}
                currentPage={page}
            />
        </main>
    );
}
