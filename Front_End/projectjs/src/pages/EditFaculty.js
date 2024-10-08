import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditFaculty() {
    const [data, setData] = useState({});  // Initialize as an empty object
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const navigate = useNavigate();
    const { FacultyID } = useParams();

    useEffect(() => {
        const apiUrl = `http://localhost:7100/faculty/${FacultyID}`;
        fetch(apiUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch faculty data');
                }
                return res.json();
            })
            .then(res => {
                setData(res);
                setLoading(false);  // Stop loading once data is fetched
            })
            .catch(err => {
                console.error("Failed to fetch faculty data:", err);
                setError('Error fetching faculty data');
                setLoading(false);  // Stop loading on error
            });
    }, [FacultyID]);

    const handleChange = (field, value) => {
        setData(prevData => ({ ...prevData, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const apiUrl = `http://localhost:7100/faculty/${FacultyID}`;

        try {
            const res = await fetch(apiUrl, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error("Failed to update faculty");
            }
            navigate("/faculty");  // Redirect after successful update
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
                <label htmlFor="FacultyID" className="col-4 col-form-label">Faculty ID</label>
                <div className="col-8">
                    <input
                        id="FacultyID"
                        value={data.FacultyID || ""}  // Use fallback for empty state
                        type="text"
                        className="form-control"
                        disabled // Keep this disabled if you don't want to edit it
                    />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="FacultyName" className="col-4 col-form-label">Faculty Name</label>
                <div className="col-8">
                    <input
                        id="FacultyName"
                        value={data.FacultyName || ""}  // Use fallback for empty state
                        type="text"
                        className="form-control"
                        onChange={(e) => handleChange('FacultyName', e.target.value)} // Allow editing
                    />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="FacultyDesignation" className="col-4 col-form-label">Faculty Designation</label>
                <div className="col-8">
                    <input
                        id="FacultyDesignation"
                        value={data.FacultyDesignation || ""}  // Use fallback for empty state
                        type="text"
                        className="form-control"
                        onChange={(e) => handleChange('FacultyDesignation', e.target.value)} // Allow editing
                    />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="FacultyEducationQualification" className="col-4 col-form-label">Faculty Education Qualification</label>
                <div className="col-8">
                    <input
                        id="FacultyEducationQualification"
                        value={data.FacultyEducationQualification || ""}  // Use fallback for empty state
                        type="text"
                        className="form-control"
                        onChange={(e) => handleChange('FacultyEducationQualification', e.target.value)} // Allow editing
                    />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="FacultyExperience" className="col-4 col-form-label">Faculty Experience</label>
                <div className="col-8">
                    <input
                        id="FacultyExperience"
                        value={data.FacultyExperience || ""}  // Use fallback for empty state
                        type="text"
                        className="form-control"
                        onChange={(e) => handleChange('FacultyExperience', e.target.value)} // Allow editing
                    />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="FacultyWorkingSince" className="col-4 col-form-label">Faculty Working Since</label>
                <div className="col-8">
                    <input
                        id="FacultyWorkingSince"
                        value={data.FacultyWorkingSince || ""}  // Use fallback for empty state
                        type="date"  // Change to date input
                        className="form-control"
                        onChange={(e) => handleChange('FacultyWorkingSince', e.target.value)} // Allow editing
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

export default EditFaculty;
