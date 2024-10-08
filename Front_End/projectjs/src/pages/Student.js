import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Student(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const apiUrl = "http://localhost:9000/student";
        fetch(apiUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch student');
                }
                return res.json();
            })
            .then(res => {
                setData(res);
                setLoading(false); // Stop loading when data is received
            })
            .catch(err => {
                console.error("Failed to fetch student:", err);
                setError('Error fetching student data');
                setLoading(false); // Stop loading on error
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const formattedStudent = data.map((stu) => (
        <tr key={stu.StudentID}>  {/* Ensure a unique key */}
            <td>{stu.StudentID || "N/A"}</td>
            <td>{stu.StudentName || "No Name Available"}</td>
            <td>
                <Link className="btn btn-info" to={`/student/${stu.Student}`}>Read More</Link>
            </td>
        </tr>
    ));

    return (
        <>
            <div className="mb-3">
                <Link to="/AddStudent/add" className="btn btn-primary">Add Student</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        {/* <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        formattedStudent// Render products if available
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No Student Available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}
export default Student;