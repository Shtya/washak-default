import { useMemo } from "react";
import { generatePagination } from "../../helper/Pagination";

export function Pagination({ currentPage, pageCount, setCurrentPage }) {

    const pages = useMemo(() => generatePagination(currentPage, pageCount), [currentPage, pageCount])

    if (pageCount <= 1) return null;

    return (
        <div
            className="
                bg-white flex items-center justify-center flex-wrap 
                py-[18px]
                md:py-[20px]
                lg:py-6
                gap-[6px] sm:gap-[8px] md:gap-[10px] lg:gap-2
            "
        >

            {/* FIRST PAGE */}
            <div
                onClick={() => setCurrentPage(Number(1))}
                className={`
                    ${currentPage == 1 && "disabled"}
                    flex-center bg-white border text-gray-700 cursor-pointer
                    w-[25px] h-[25px] sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px]
                    hover:scale-[1.1] hover:border-transparent duration-300 group
                    hover:bg-[var(--main)] hover:fill-white rounded-full
                `}
            >
                <svg
                    className="w-[7px] h-[7px] sm:w-[8px] sm:h-[8px] md:w-[9.5px] md:h-[9.5px]"
                    viewBox="3.8 4 9.4 8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M4.7735 4L3.8335 4.94L6.88683 8L3.8335 11.06L4.7735 12L8.7735 8L4.7735 4Z"
                        className="group-hover:!fill-white fill-black" />
                    <path d="M9.16656 4L8.22656 4.94L11.2799 8L8.22656 11.06L9.16656 12L13.1666 8L9.16656 4Z"
                        className="group-hover:!fill-white fill-black" />
                </svg>
            </div>

            {/* PREVIOUS */}
            <div
                onClick={() => setCurrentPage(currentPage > 1 ? --currentPage : 1)}
                className={`
                    ${currentPage == 1 && "disabled"}
                    flex-center bg-white border text-black cursor-pointer
                    w-[25px] h-[25px] sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px]
                    hover:scale-[1.1] hover:border-transparent duration-300 group
                    hover:bg-[var(--main)] hover:fill-white rounded-full
                `}
            >
                <svg
                    className="w-[7px] h-[7px] sm:w-[8px] sm:h-[8px] md:w-[9.5px] md:h-[9.5px]"
                    viewBox="3.8 4 5 8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M4.7735 4L3.8335 4.94L6.88683 8L3.8335 11.06L4.7735 12L8.7735 8L4.7735 4Z"
                        className="group-hover:!fill-white fill-black" />
                </svg>
            </div>

            {/* PAGE NUMBERS */}
            {pages.map((item, idx) =>
                item === "..." ? (
                    <span
                        key={idx}
                        className="
                            cursor-pointer flex-center border rounded-full
                            text-[10px] sm:text-[11px] md:text-[13px]
                            w-[25px] h-[25px] sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px]
                            hover:scale-[1.1] duration-300 text-black
                        "
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={idx}
                        onClick={() => setCurrentPage(Number(item))}
                        className={`
                            flex-center rounded-full
                            text-[10px] sm:text-[11px] md:text-[13px]
                            min-w-[25px] h-[25px] sm:min-w-[28px] sm:h-[28px] md:min-w-[32px] md:h-[32px]
                            hover:scale-[1.1] hover:border-transparent duration-300
                            hover:bg-[var(--main)] hover:text-white
                            ${currentPage === item
                                ? "bg-[var(--main)] text-white"
                                : "bg-white border text-black"
                            }
                        `}
                    >
                        {item}
                    </button>
                )
            )}

            {/* NEXT */}
            <div
                onClick={() => setCurrentPage(currentPage < pageCount ? ++currentPage : pageCount)}
                className={`
                    ${currentPage == pageCount && "disabled"}
                    flex-center rotate-[-180deg] bg-white border text-gray-700 cursor-pointer
                    w-[25px] h-[25px] sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px]
                    hover:scale-[1.1] hover:border-transparent duration-300 group
                    hover:bg-[var(--main)] hover:fill-white rounded-full
                `}
            >
                <svg
                    className="w-[7px] h-[7px] sm:w-[8px] sm:h-[8px] md:w-[9.5px] md:h-[9.5px]"
                    viewBox="8.2 4 5 8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.16656 4L8.22656 4.94L11.2799 8L8.22656 11.06L9.16656 12L13.1666 8L9.16656 4Z"
                        className="group-hover:!fill-white fill-black" />
                </svg>
            </div>

            {/* LAST PAGE */}
            <div
                onClick={() => setCurrentPage(Number(pageCount))}
                className={`
                    ${currentPage == pageCount && "disabled"}
                    flex-center rotate-[-180deg] bg-white border text-gray-700 cursor-pointer
                    w-[25px] h-[25px] sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px]
                    hover:scale-[1.1] hover:border-transparent duration-300 group
                    hover:bg-[var(--main)] hover:fill-white rounded-full
                `}
            >
                <svg
                    className="w-[7px] h-[7px] sm:w-[8px] sm:h-[8px] md:w-[9.5px] md:h-[9.5px]"
                    viewBox="3.8 4 9.4 8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M4.7735 4L3.8335 4.94L6.88683 8L3.8335 11.06L4.7735 12L8.7735 8L4.7735 4Z"
                        className="group-hover:!fill-white fill-black" />
                    <path d="M9.16656 4L8.22656 4.94L11.2799 8L8.22656 11.06L9.16656 12L13.1666 8L9.16656 4Z"
                        className="group-hover:!fill-white fill-black" />
                </svg>
            </div>

        </div>
    )
}