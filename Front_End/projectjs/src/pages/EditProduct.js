import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
    const [data, setData] = useState({});  // Initialize as an empty object
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const navigate = useNavigate();
    const { ProductID } = useParams();

    useEffect(() => {
        const apiUrl = `http://localhost:8000/Products/${ProductID}`;
        fetch(apiUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch product data');
                }
                return res.json();
            })
            .then(res => {
                setData(res);
                setLoading(false);  // Stop loading once data is fetched
            })
            .catch(err => {
                console.error("Failed to fetch product data:", err);
                setError('Error fetching product data');
                setLoading(false);  // Stop loading on error
            });
    }, [ProductID]);

    const handleChange = (field, value) => {
        setData(prevData => ({ ...prevData, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission
        const apiUrl = `http://localhost:8000/Products/${ProductID}`;

        try {
            const res = await fetch(apiUrl, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error("Failed to update product");
            }
            navigate("/Products");  // Redirect after successful update
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group row">
                <label htmlFor="text3" className="col-4 col-form-label">Product ID</label>
                <div className="col-8">
                    <input
                        value={data.ProductID || ""}  // Use fallback for empty state
                        type="text"
                        className="form-control"
                        disabled  // ProductID is disabled
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="text1" className="col-4 col-form-label">Enter Product Name</label>
                <div className="col-8">
                    <input
                        value={data.ProductName || ""}  // Use fallback for empty state
                        onChange={(e) => handleChange("ProductName", e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="text" className="col-4 col-form-label">Enter Product Image URL</label>
                <div className="col-8">
                    <input
                        value={data.ProductImg || ""}  // Use fallback for empty state
                        onChange={(e) => handleChange("ProductImg", e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="text2" className="col-4 col-form-label">Enter Product Price</label>
                <div className="col-8">
                    <input
                        value={data.ProductPrice || ""}  // Use fallback for empty state
                        onChange={(e) => handleChange("ProductPrice", e.target.value)}
                        type="number"  // Use number input type for price
                        className="form-control"
                    />
                </div>
            </div>
            
            <div className="form-group row">
                <div className="offset-4 col-8">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    );
}

export default EditProduct;
