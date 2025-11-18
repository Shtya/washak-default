import { useParams } from "react-router-dom";
import Product from "./Product";



export default function ProductPage() {
    const { id } = useParams();
    return <Product key={id} />;
}