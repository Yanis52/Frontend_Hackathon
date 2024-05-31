import React from 'react';

interface PaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        onPageChange(currentPage + 1);
    };

    return (
        <div>
            <button onClick={handlePrevious} disabled={currentPage === 0}>
                Previous
            </button>
            <span>
                Page {currentPage + 1}
            </span>
            <button onClick={handleNext}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
