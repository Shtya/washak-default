import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getFullPath } from "../../helper/getFullPath";
import { useIsActiveLink } from "../../hooks/useIsActiveLink";
import { Link } from 'react-router-dom';


export default function MenuItem({ item, isSub = false, slug = '', closeParent }) {
    const [open, setOpen] = useState(false);
    const fullPath = getFullPath(isSub ? slug : item.page_slug, item.href)
    const isActive = useIsActiveLink(fullPath)

    function handleCloseParent() {
        setOpen(false);
        closeParent?.();
    }
    return (
        <li
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            {item?.page_type === 'custom_page' ? (
                <a
                    href={item.href}
                    target={item.target || "_self"}
                    className={`navlink ${isSub ? "sub" : "main"} flex items-center whitespace-nowrap transition-all duration-200 ease-in-out`}
                >
                    <span className="px-2 py-1 font-semibold transition-all duration-200 "
                    >
                        {item.text || "Menu Item"}
                    </span>

                    {item.children?.length > 0 && (
                        <ChevronDown
                            className={`w-4 h-4 stroke-[3px] transition-all duration-200 !mt-[4px] hover:scale-110
                    ${isSub ? "-rotate-90" : ""}
                    ${open && !isSub ? "rotate-180" : ""}`}
                        />
                    )}
                </a>

            ) : (
                <Link
                    to={fullPath}
                    target={item.target || "_self"}
                    onClick={handleCloseParent}
                    className={
                        `navlink ${isSub ? "sub" : "main"} flex items-center whitespace-nowrap transition-all duration-200 ease-in-out 
                        ${isActive ? "active" : ""}`
                    }
                >
                    <span className="px-2 py-1 font-semibold transition-all duration-200 ">
                        {item.text || "Menu Item"}
                    </span>

                    {item.children?.length > 0 && (
                        <ChevronDown
                            className={`w-4 h-4 stroke-[3px] transition-all duration-200 !mt-[4px] hover:scale-110 
                    ${isSub ? "rotate-90" : ""}
                    ${open && !isSub ? "rotate-180" : ""}`}
                        />
                    )}
                </Link>
            )}

            {
                item.children?.length > 0 && (
                    <ul
                        className={`nav-drop-menu absolute bg-white shadow-lg transition-all duration-500 ease-in-out min-w-[180px] z-50  
                    ${open ? "max-h-[400px] opacity-100" : "overflow-hidden max-h-0 opacity-0 "}
                    ${isSub ? "right-full top-0 " : "right-0 top-full mt-2"}
                `}
                    >
                        {item.children.map((child, idx) => (
                            <MenuItem key={idx} item={child} isSub={true} slug={isSub ? slug : item.page_slug} closeParent={handleCloseParent} />
                        ))}
                    </ul>

                )
            }
        </li>
    );
}
