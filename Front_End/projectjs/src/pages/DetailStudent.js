import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function DetailStudent(){

    const [data, setData] = useState(null); // Start with null
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate();
    const { StudentID } = useParams();

    useEffect(() => {
        const apiUrl = `http://localhost:9000/student/${StudentID}`;
        fetch(apiUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch student details');
                }
                return res.json();
            })
            .then(res => {
                setData(res);
                setLoading(false); // Data fetched, stop loading
            })
            .catch(err => {
                console.error("Failed to fetch student data:", err);
                setError('Error fetching student data');
                setLoading(false); // Stop loading on error
            });
    }, [StudentID]);

    
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
        return <div>student not found.</div>;
    }

    return (
        <>
            <Link to="/student" className="btn btn-info m-2">Back</Link>
            <Link to={`/edit/${StudentID}`} className="btn btn-secondary m-2">Edit</Link>  {/* Link to EditProduct component */}

            <button className="btn btn-danger" onClick={() => {
                const apiUrl = `http://localhost:9000/student/${StudentID}`;
                
                fetch(apiUrl, { method: "DELETE" })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Failed to delete student');
                        }
                        return res.json();
                    })
                    .then(() => {
                        navigate('/student'); // Redirect to product list
                    })
                    .catch(err => {
                        console.error("Failed to delete student:", err);
                        alert("Error deleting the student");
                    });
            }}>Delete</button>

            <h1>Name of the student is: {data.StudentName || "No Name Available"}</h1>
            <h1>EnrollmentNo of the student is: {data.StudentEnrollmentNo || "No EnrollmentNo Available"}</h1>
            <h1>Collage Name of the student is: {data.StudentCollage || "No Collage Name Available"}</h1>
         </>
    );


}
export default DetailStudent;