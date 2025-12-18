import { Link } from "react-router-dom";
import { getFullPath } from "../../../helper/getFullPath";
import Img from "../../atoms/Image";


export default function CategoryCard({ category }) {
    return (
        <Link
            to={getFullPath("category/", category.slug)}
            className="
    category-card 
    flex flex-col items-center mx-auto
    transition-transform duration-300 hover:scale-105
    w-[110px] sm:w-[130px] md:w-[145px] lg:w-[153px]
  "
        >
            <div
                className="
      overflow-hidden bg-white 
      shadow-[0_0_8px_0_#00000026]
      rounded-[4px] sm:rounded-[5px]
      p-[4px] sm:p-[6px] md:p-[7px] lg:p-[8px]
      w-full
      h-[90px] sm:h-[105px] md:h-[118px] lg:h-[128px]
      border border-gray-200
    "
            >
                <Img
                    src={category.image_url}
                    alt={category.name}
                    className="
        w-full h-full object-cover 
        rounded-[3px] sm:rounded-[4px] md:rounded-[5px]
        transition-transform duration-500 group-hover:scale-110
      "
                />
            </div>

            <span
                className="
      title 
      mt-[12px] sm:mt-[16px] md:mt-[18px] lg:mt-[22px]
      text-[10px] sm:text-[12px] md:text-[14px] lg:text-[18px] xl:text-[20px]
      text-center text-gray-700
      group-hover:text-primary transition-colors duration-300
    "
            >
                {category.name}
            </span>
        </Link>

    );
}