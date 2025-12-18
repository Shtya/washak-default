'use client';

import { Link } from 'react-router-dom';

export default function Breadcrumb({ routes = [], cn }) {
    return (
        <div
            data-aos="zoom-in"
            className={`
                ${cn}
                text-[#666666]
                flex flex-wrap items-center
                gap-[6px] sm:gap-[8px] md:gap-[10px]
                mt-[12px] sm:mt-[16px] md:mt-[20px] lg:mt-[24px]
                mb-[12px] sm:mb-[16px] md:mb-[20px] lg:mb-[24px]
                
                text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px]
            `}
        >
            {/* HOME ICON */}
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="
                    shrink-0
                    w-[16px] h-[16px]
                    sm:w-[18px] sm:h-[18px]
                    md:w-[20px] md:h-[20px]
                    lg:w-[24px] lg:h-[24px]
                "
            >
                <g opacity="0.9">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.52 7.823C2 8.77 2 9.915 2 12.203V13.725C2 17.625 2 19.576 3.172 20.788C4.344 22 6.229 22 10 22H14C17.771 22 19.657 22 20.828 20.788C21.999 19.576 22 17.626 22 13.725V12.204C22 9.915 22 8.771 21.48 7.823C20.962 6.874 20.013 6.286 18.116 5.108L16.116 3.867C14.111 2.622 13.108 2 12 2C10.892 2 9.89 2.622 7.884 3.867L5.884 5.108C3.987 6.286 3.039 6.874 2.52 7.823ZM11.25 18C11.25 18.1989 11.329 18.3897 11.4697 18.5303C11.6103 18.671 11.8011 18.75 12 18.75C12.1989 18.75 12.3897 18.671 12.5303 18.5303C12.671 18.3897 12.75 18.1989 12.75 18V15C12.75 14.8011 12.671 14.6103 12.5303 14.4697C12.3897 14.329 12.1989 14.25 12 14.25C11.8011 14.25 11.6103 14.329 11.4697 14.4697C11.329 14.6103 11.25 14.8011 11.25 15V18Z"
                        fill="#123770"
                    />
                </g>
            </svg>

            {/* ROUTES */}
            {routes.map((route, idx) => (
                <div key={idx} className="flex items-center gap-[4px] sm:gap-[6px] md:gap-[8px]">
                    {route.href ? (
                        <Link
                            to={route.href}
                            className="
                                text-[var(--main)] cursor-pointer font-medium
                                text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px]
                            "
                        >
                            {route.label}
                        </Link>
                    ) : (
                        <span
                            className="
                                text-gray-600
                                text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px]
                            "
                        >
                            {route.label}
                        </span>
                    )}

                    {idx < routes.length - 1 && (
                        <span className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px]">/</span>
                    )}
                </div>
            ))}
        </div>
    );
}
