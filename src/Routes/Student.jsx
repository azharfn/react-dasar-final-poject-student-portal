import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../style3.css"
const Student = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/student');
            const data = await response.json();
            setStudents(data);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3001/student/${id}`, {
                method: 'DELETE',
            });
            setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
        } catch (error) {
            console.log('Error deleting student:', error);
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredStudents =
        filter === 'All' ? students : students.filter((student) => student.faculty === filter);

    return (
        <>
            <div className="student-data">
                <div className="container">
                    <h1>Daftar Mahasiswa</h1>
                    <select value={filter} onChange={handleFilterChange} data-testid="filter">
                        <option value="All">Semua</option>
                        <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
                        <option value="Fakultas Ilmu Sosial dan Politik">Fakultas Ilmu Sosial Dan Politik</option>
                        <option value="Fakultas Teknik">Fakultas Teknik</option>
                        <option value="Fakultas Teknologi Informasi dan Sains">
                            Fakultas Teknologi Informasi dan Sains
                        </option>
                    </select>
                </div>
                {loading ? (
                    <p>Loading ...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Lengkap</th>
                                <th>Tanggal Lahir</th>
                                <th>Jenis Kelamin</th>
                                <th>Fakultas</th>
                                <th>Program Studi</th>
                                <th>Opsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, index) => (
                                <tr key={student.id} className="student-data-row">
                                    <td data-label="No">{index + 1}</td>
                                    <td data-label="Nama Lengkap">
                                        <Link to={`/student/${student.id}`}>
                                            {student.fullname}</Link>
                                    </td>
                                    <td data-label="Tanggal Lahir">{student.birthDate}</td>
                                    <td data-label="Jenis Kelamin">{student.gender}</td>
                                    <td data-label="Fakultas">{student.faculty}</td>
                                    <td data-label="Program Studi">{student.programStudy}</td>
                                    <td data-label="Opsi">
                                        <button
                                            onClick={() => handleDelete(student.id)}
                                            data-testid={`delete-${student.id}`}
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default Student;
