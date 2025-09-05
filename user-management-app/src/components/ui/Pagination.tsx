import React from 'react'
import { Images } from '../../assets'
import Button from './Button';

interface PaginationProps {
    totalData: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    totalData,
    itemsPerPage,
    currentPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalData / itemsPerPage);

    const prevBtnHandler = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const nextBtnHandler = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const renderPageNumbers = () => {
        return [...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
                <Button
                    key={page}
                    text={`${page}`}
                    onClick={() => onPageChange(page)}
                    bgColor={currentPage === page ? "bg-[#3d52a1]" : 'bg-[#eee8f6]'}
                    textColor={currentPage === page ? 'text-white' : 'text-[#5C59E8]'}
                    className="py-[10px] px-[14px] border-0"
                />
            );
        });
    };

    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(start + itemsPerPage - 1, totalData);

    return (
        <div className="pagination flex justify-between bg-[#FFFFFF]  items-center px-6 py-2 border-[#E0E2E7]  flex-wrap gap-5">
            <div>
                <p className="font-medium text-[#667085] text-sm">
                    Showing {start}-{end} from {totalData}
                </p>
            </div>
            <div className="flex gap-2 flex-wrap">

                {/* previos button  */}
                <Button
                    leftIcon={Images.left_arrow}
                    text=""
                    bgColor="bg-[#eee8f6]"
                    textColor="text-[#5C59E8]"
                    className={`py-[6px] px-[6px] rounded-md flex items-center justify-center ${currentPage > 1 ? 'cursor-pointer' : 'cursor-not-allowed'
                        }`}
                    onClick={currentPage > 1 ? prevBtnHandler : undefined}
                />

                {/* pagenumber button render */}
                {renderPageNumbers()}

                {/* next button  */}
                <Button
                    text=""
                    leftIcon={Images.right_arrow}
                    bgColor="bg-[#eee8f6]"
                    textColor="text-white"
                    className={`py-[6px] px-[6px] rounded-md flex items-center justify-center ${currentPage < totalPages ? 'cursor-pointer ' : 'cursor-not-allowed'
                        }`}
                    onClick={currentPage < totalPages ? nextBtnHandler : undefined}
                />
            </div>
        </div>
    );
};
