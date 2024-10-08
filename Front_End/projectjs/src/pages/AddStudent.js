import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddStudent(){

    const [data, setData] = useState({
        StudentID: '',
        StudentName: '',
        StudentEnrollmentNo: '',
        StudentRollNo: '',
        StudentCollageName: ''
    });

    const [error, setError] = useState(null); // To handle errors
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        setData(prevData => ({ ...prevData, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        const apiUrl = `http://localhost:9000/student`;

        fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to add student");
                }
                return res.json();
            })
            .then(() => {('/student'); // Navigate to the products page after successful addition
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
                    <label htmlFor="StudentID" className="col-4 col-form-label">Student ID</label>
                    <div className="col-8">
                        <input
                            onChange={(e) => handleChange("StudentID", e.target.value)}
                            type="text"
                            className="form-control"
                            value={data.StudentID}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="StudentName" className="col-4 col-form-label">Student Name</label>
                    <div className="col-8">
                        <input
                            onChange={(e) => handleChange("StudentName", e.target.value)}
                            type="text"
                            className="form-control"
                            value={data.StudentName}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="StudentEnrollmentNo" className="col-4 col-form-label">Student EnrollmentNo</label>
                    <div className="col-8">
                        <input
                            onChange={(e) => handleChange("StudentEnrollmentNo", e.target.value)}
                            type="text"
                            className="form-control"
                            value={data.StudentEnrollmentNo}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="StudentRollNo" className="col-4 col-form-label">Student RollNo</label>
                    <div className="col-8">
                        <input
                            onChange={(e) => handleChange("StudentRollNo", e.target.value)}
                            type="text"
                            className="form-control"
                            value={data.StudentRollNo}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="StudentCollageName" className="col-4 col-form-label">Student CollageName</label>
                    <div className="col-8">
                        <input
                            onChange={(e) => handleChange("StudentCollageName", e.target.value)}
                            type="text"
                            className="form-control"
                            value={data.StudentCollageName}
                            required
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
export default AddStudent;