'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Flex, Text } from '@radix-ui/themes';
import { ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from 'lucide-react';

interface PaginationProps {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount <= 1) return null;

    const page = Number(currentPage) || 1;

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <Flex align="center" gap="2">
            <Text size="2">
                Page {page} of {pageCount}
            </Text>
            <Button
                color="gray"
                variant="soft"
                disabled={page === 1}
                onClick={() => changePage(1)}
            >
                <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={page === 1}
                onClick={() => changePage(page - 1)}
            >
                <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={page === pageCount}
                onClick={() => changePage(page + 1)}
            >
                <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={page === pageCount}
                onClick={() => changePage(pageCount)}
            >
                <ChevronsRight className="w-4 h-4" />
            </Button>
        </Flex>
    );
};

export default Pagination;