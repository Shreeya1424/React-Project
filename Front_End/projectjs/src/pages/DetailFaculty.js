import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function DetailFaculty() {
    const [data, setData] = useState(null); // Start with null
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate();
    const { FacultyID } = useParams();

    useEffect(() => {
        const apiUrl = `http://localhost:7100/faculty/${FacultyID}`;
        fetch(apiUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch faculty details');
                }
                return res.json();
            })
            .then(res => {
                setData(res);
                setLoading(false); // Data fetched, stop loading
            })
            .catch(err => {
                console.error("Failed to fetch faculty data:", err);
                setError('Error fetching faculty data');
                setLoading(false); // Stop loading on error
            });
    }, [FacultyID]);


    
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
        return <div>faculty not found.</div>;
    }

    return (
        <>
            <Link to="/faculty" className="btn btn-info m-2">Back</Link>
            <Link to={`/edit/${FacultyID}`} className="btn btn-secondary m-2">Edit</Link>  {/* Link to EditProduct component */}

            <button className="btn btn-danger" onClick={() => {
                const apiUrl = `http://localhost:7100/faculty/${FacultyID}`;
                
                fetch(apiUrl, { method: "DELETE" })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Failed to delete faculty');
                        }
                        return res.json();
                    })
                    .then(() => {
                        navigate('/faculty'); // Redirect to product list
                    })
                    .catch(err => {
                        console.error("Failed to delete faculty:", err);
                        alert("Error deleting the faculty");
                    });
            }}>Delete</button>

            <h1>Name of the faculty is: {data.FacultyName || "No Name Available"}</h1>
                    </>
    );
}

export default DetailFaculty;
