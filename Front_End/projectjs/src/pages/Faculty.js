import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Faculty() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const apiUrl = "http://localhost:7100/faculty";
        fetch(apiUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Failed to fetch faculty: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        
            .then(res => {
                setData(res);
                setLoading(false); // Stop loading when data is received
            })
            .catch(err => {
                console.error("Failed to fetch faculty:", err);
                setError('Error fetching faculty data');
                setLoading(false); // Stop loading on error
            });
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const formattedFaculty = data.map((fac) => (
        <tr key={fac.FacultyID}>  {/* Ensure a unique key */}
            <td>{fac.FacultyID || "N/A"}</td>
            <td>{fac.FacultyName || "No Name Available"}</td>
            <td>
                <Link className="btn btn-info" to={`/faculty/${fac.Faculty}`}>Read More</Link>
            </td>
        </tr>
    ));

    
    return (
        <>
            <div className="mb-3">
                <Link to="/AddFaculty/add" className="btn btn-primary">Add Faculty</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Faculty ID</th>
                        <th>Faculty Name</th>
                        {/* <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        formattedFaculty// Render products if available
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No Faculty Available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default Faculty;
