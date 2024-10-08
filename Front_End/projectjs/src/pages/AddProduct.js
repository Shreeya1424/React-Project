import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const [data, setData] = useState({
        ProductID: '',
        ProductName: '',
        ProductImg: '',
        ProductPrice: ''
    });
    const [error, setError] = useState(null); // To handle errors
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        setData(prevData => ({ ...prevData, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission

        const apiUrl = `http://localhost:8000/Products`;

        fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to add product");
                }
                return res.json();
            })
            .then(() => {
                navigate('/Products'); // Navigate to the products page after successful addition
            })
            .catch(err => {
                setError(err.message); // Set the error message in case of failure
                console.error("Error:", err);
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="text2" className="col-4 col-form-label">Product ID</label>
                    <div className="col-8">
                        <input
                            onChange={(e) => handleChange("ProductID", e.target.value)}
                            type="text"
                            className="form-control"
                            value={data.ProductID}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="text1" className="col-4 col-form-label">Product Name</label>
                    <div className="col-8">
                        <input
                            onChange={(e) => handleChange("ProductName", e.target.value)}
                            type="text"
                            className="form-control"
                            value={data.ProductName}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="text4" className="col-4 col-form-label">Image Path</label>
                    <div className="col-8">
                        <input
                            onChange={(e) => handleChange("ProductImg", e.target.value)}
                            type="text"
                            className="form-control"
                            value={data.ProductImg}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="text3" className="col-4 col-form-label">Enter Price</label>
                    <div className="col-8">
                        <input
                            onChange={(e) => handleChange("ProductPrice", e.target.value)}
                            type="number" // Change to number for price
                            className="form-control"
                            value={data.ProductPrice}
                        />
                    </div>
                </div>
                
                <div className="form-group row">
                    <div className="offset-4 col-8">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>} {/* Display error message if any */}
            </form>
        </>
    );
}

export default AddProduct;
