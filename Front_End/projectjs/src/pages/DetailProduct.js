import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function DetailProduct() {
    const [data, setData] = useState(null); // Start with null
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate();
    const { ProductID } = useParams();

    useEffect(() => {
        const apiUrl = `http://localhost:8000/Products/${ProductID}`;
        fetch(apiUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch product details');
                }
                return res.json();
            })
            .then(res => {
                setData(res);
                setLoading(false); // Data fetched, stop loading
            })
            .catch(err => {
                console.error("Failed to fetch product data:", err);
                setError('Error fetching product data');
                setLoading(false); // Stop loading on error
            });
    }, [ProductID]);

    // Loading state handling
    if (loading) {
        return <div>Loading...</div>;
    }

    // Error state handling
    if (error) {
        return <div>{error}</div>;
    }

    // Null check to avoid accessing properties on `null`
    if (!data) {
        return <div>Product not found.</div>;
    }

    return (
        <>
            <Link to="/Products" className="btn btn-info m-2">Back</Link>
            <Link to={`/edit/${ProductID}`} className="btn btn-secondary m-2">Edit</Link>  {/* Link to EditProduct component */}

            <button className="btn btn-danger" onClick={() => {
                const apiUrl = `http://localhost:8000/Products/${ProductID}`;
                
                fetch(apiUrl, { method: "DELETE" })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Failed to delete product');
                        }
                        return res.json();
                    })
                    .then(() => {
                        navigate('/Products'); // Redirect to product list
                    })
                    .catch(err => {
                        console.error("Failed to delete product:", err);
                        alert("Error deleting the product");
                    });
            }}>Delete</button>

            <h1>Name of the product is: {data.ProductName || "No Name Available"}</h1>
            {data.ProductImg ? <img src={data.ProductImg} alt={data.ProductName} /> : <p>No Image Available</p>}
        </>
    );
}

export default DetailProduct;
