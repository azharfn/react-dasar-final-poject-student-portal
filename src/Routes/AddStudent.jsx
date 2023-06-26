// TODO: answer here
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
    // TODO: answer here
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        fullname: "",
        profilePicture: "",
        address: "",
        phoneNumber: "",
        birthDate: "",
        gender: "",
        programStudy: "",
    });

    useEffect(() => {
        fetch(`http://localhost:3001/student/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            fullname,
            profilePicture,
            address,
            phoneNumber,
            birthDate,
            gender,
            programStudy,
        } = formData;

        const faculty = getFacultyByProgramStudy(programStudy);

        const newStudent = {
            fullname,
            profilePicture,
            address,
            phoneNumber,
            birthDate,
            gender,
            faculty,
            programStudy,
        };

        fetch("http://localhost:3001/student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newStudent),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success", data);
                navigate("/student");
            })
            .catch((error) => {
                console.log(error);
            })


    };

    const getFacultyByProgramStudy = (programStudy) => {
        let faculty = "";
        switch (programStudy) {
            case "Ekonomi":
            case "Manajemen":
            case "Akuntansi":
                faculty = "Fakultas Ekonomi";
                break;
            case "Administrasi Publik":
            case "Administrasi Bisnis":
            case "Hubungan Internasional":
                faculty = "Fakultas Ilmu Sosial dan Politik";
                break;
            case "Teknik Sipil":
            case "Arsitektur":
                faculty = "Fakultas Teknik";
                break;
            case "Matematika":
            case "Fisika":
            case "Informatika":
                faculty = "Fakultas Teknologi Informasi dan Sains";
                break;
            default:
                faculty = "";
                break;
        }
        return faculty;
    };

    return (
        <>
            <div className="box">
                <div className="form-container">
                    <form id="form-student" onSubmit={handleSubmit}>
                        <h2>Add Student</h2>
                        <div className="box-group">
                            <div className="input-group">
                                <img src={formData.profilePicture}
                                    alt="Profile"
                                    data-testid="previousPicture"
                                />
                                <label className="form-label">
                                    Fullname:
                                    <input
                                        className="form-input"
                                        type="text"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        data-testid="name"
                                    />
                                </label>
                                <label className="form-label">
                                    Profile Picture:
                                    <input
                                        className="form-input"
                                        type="text"
                                        name="profilePicture"
                                        value={formData.profilePicture}
                                        onChange={handleChange}
                                        data-testid="profilePicture"
                                    />
                                </label>
                                <label className="form-label">
                                    Address:
                                    <input
                                        className="form-input"
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        data-testid="address"
                                    />
                                </label>
                                <label className="form-label">
                                    Phone Number:
                                    <input
                                        className="form-input"
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        data-testid="phoneNumber"
                                    />
                                </label>
                                <div className="birth-gender">
                                    <label className="form-label">
                                        Birth Date:
                                        <input
                                            className="form-input"
                                            type="date"
                                            name="birthDate"
                                            value={formData.birthDate}
                                            onChange={handleChange}
                                            data-testid="date"
                                        />
                                    </label>
                                    <label className="form-label">
                                        Gender:
                                        <select
                                            className="form-input"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            data-testid="gender"
                                        >
                                            <option value="">-- Select Gender --</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </label>
                                </div>
                                <label className="form-label">
                                    Program Study:
                                    <select
                                        className="form-select"
                                        name="programStudy"
                                        value={formData.programStudy}
                                        onChange={handleChange}
                                        data-testid="prody"
                                    >
                                        <option value="">-- Select Program Study --</option>
                                        <option value="Ekonomi">Ekonomi</option>
                                        <option value="Manajemen">Manajemen</option>
                                        <option value="Akuntansi">Akuntansi</option>
                                        <option value="Administrasi Publik">Administrasi Publik</option>
                                        <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                                        <option value="Hubungan Internasional">Hubungan Internasional</option>
                                        <option value="Teknik Sipil">Teknik Sipil</option>
                                        <option value="Arsitektur">Arsitektur</option>
                                        <option value="Matematika">Matematika</option>
                                        <option value="Fisika">Fisika</option>
                                        <option value="Informatika">Informatika</option>
                                    </select>
                                </label>
                            </div>
                            <button className="add-btn" type="submit" data-testid="add-btn">
                                Add Student
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
};

export default AddStudent;
