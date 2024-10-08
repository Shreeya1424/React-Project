import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditStudent(){

    const [data, setData] = useState({});  // Initialize as an empty object
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const navigate = useNavigate();
    const { StudentID } = useParams();

    useEffect(() => {
        const apiUrl = `http://localhost:9000/student/${StudentID}`;
        fetch(apiUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch student data');
                }
                return res.json();
            })
            .then(res => {
                setData(res);
                setLoading(false);  // Stop loading once data is fetched
            })
            .catch(err => {
                console.error("Failed to fetch student data:", err);
                setError('Error fetching student data');
                setLoading(false);  // Stop loading on error
            });
    }, [StudentID]);       

    const handleChange = (field, value) => {
        setData(prevData => ({ ...prevData, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const apiUrl = `http://localhost:9000/student/${StudentID}`;

        try {
            const res = await fetch(apiUrl, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error("Failed to update student");
            }
            navigate("/student");  // Redirect after successful update
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // You might want to add a spinner here
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group row">
                <label htmlFor="StudentID" className="col-4 col-form-label">Student ID</label>
                <div className="col-8">
                    <input
                        id="StudentID"
                        value={data.StudentID || ""}  // Use fallback for empty state
                        type="text"
                        className="form-control"
                        disabled // Keep this disabled if you don't want to edit it
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="StudentName" className="col-4 col-form-label">Student Name</label>
                <div className="col-8">
                    <input
                        id="StudentName"
                        value={data.StudentName || ""}  // Use fallback for empty state
                        type="text"
                        className="form-control"
                        disabled // Keep this disabled if you don't want to edit it
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="StudentEnrollmentNo" className="col-4 col-form-label">Student EnrollmentNo</label>
                <div className="col-8">
                    <input
                        id="StudentID"
                        value={data.StudentEnrollmentNo || ""}  // Use fallback for empty state
                        type="text"
                        className="form-control"
                        disabled // Keep this disabled if you don't want to edit it
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="StudentRollNo" className="col-4 col-form-label">Student RollNo</label>
                <div className="col-8">
                    <input
                        id="StudentID"
                        value={data.StudentRollNo || ""}  // Use fallback for empty state
                        type="text"
                        className="form-control"
                        disabled // Keep this disabled if you don't want to edit it
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="StudentCollageName" className="col-4 col-form-label">Student Collage Name</label>
                <div className="col-8">
                    <input
                        id="StudentID"
                        value={data.StudentCollageName || ""}  // Use fallback for empty state
                        type="text"
                        className="form-control"
                        disabled // Keep this disabled if you don't want to edit it
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
export default EditStudent;