import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Product() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const apiUrl = "http://localhost:8000/Products";
        fetch(apiUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                return res.json();
            })
            .then(res => {
                setData(res);
                setLoading(false); // Stop loading when data is received
            })
            .catch(err => {
                console.error("Failed to fetch products:", err);
                setError('Error fetching product data');
                setLoading(false); // Stop loading on error
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const formattedProduct = data.map((pro) => (
        <tr key={pro.ProductID}>  {/* Ensure a unique key */}
            <td>{pro.ProductID || "N/A"}</td>
            <td>{pro.ProductName || "No Name Available"}</td>
            <td>
                <Link className="btn btn-info" to={`/Products/${pro.ProductID}`}>Read More</Link>
            </td>
        </tr>
    ));

    return (
        <>
            <div className="mb-3">
                <Link to="/AddProducts/add" className="btn btn-primary">Add Product</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        {/* <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        formattedProduct// Render products if available
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No Products Available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default Product;
