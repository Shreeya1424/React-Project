import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFaculty() {
    const [data, setData] = useState({
        FacultyID: '',
        FacultyName: '',
        FacultyDesignation: '',
        FacultyEducationQualification: '',
        FacultyExperience: '',
        FacultyWorkingSince: ''
    });

    const [error, setError] = useState(null); // To handle errors
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        setData(prevData => ({ ...prevData, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        const apiUrl = `http://localhost:7100/faculty`;

        fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to add faculty");
                }
                return res.json();
            })
            .then(() => {
                navigate('/faculty'); // Navigate to the products page after successful addition
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
                    <label htmlFor="FacultyID" className="col-4 col-form-label">Faculty ID</label>
                    <div className="col-8">
                        <input
                            onChange={(e) => handleChange("FacultyID", e.target.value)}
                            type="text"
                            className="form-control"
                            value={data.FacultyID}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="FacultyName" className="col-4 col-form-label">Faculty Name</label>
                    <div className="col-8">
                        <input
                            onChange={(e) => handleChange("FacultyName", e.target.value)}
                            type="text"
                            className="form-control"
                            value={data.FacultyName}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="FacultyDesignation" className="col-4 col-form-label">Faculty Designation</label>
                    <div className="col-8">
                        <input
                            onChange={(e) => handleChange("FacultyDesignation", e.target.value)}
                            type="text"
                            className="form-control"
                            value={data.FacultyDesignation}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="FacultyEducationQualification" className="col-4 col-form-label">Faculty Education Qualification</label>
                    <div className="col-8">
                        <input
                            onChange={(e) => handleChange("FacultyEducationQualification", e.target.value)}
                            type="text"
                            className="form-control"
                            value={data.FacultyEducationQualification}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="FacultyExperience" className="col-4 col-form-label">Faculty Experience</label>
                    <div className="col-8">
                        <input
                            onChange={(e) => handleChange("FacultyExperience", e.target.value)}
                            type="text"
                            className="form-control"
                            value={data.FacultyExperience}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="FacultyWorkingSince" className="col-4 col-form-label">Faculty Working Since</label>
                    <div className="col-8">
                        <input
                            onChange={(e) => handleChange("FacultyWorkingSince", e.target.value)}
                            type="text"
                            className="form-control"
                            value={data.FacultyWorkingSince}
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

export default AddFaculty;
