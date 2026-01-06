import React, { useEffect, useState } from "react";
import { getAllCertificates, deleteCertificateById } from "../api/certificateApi";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";


function AllCertificate() {
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    fetchCertificates();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, certificates]);

  const fetchCertificates = async () => {
    try {
      const data = await getAllCertificates();
      setCertificates(data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this record?");
    if (!confirm) return;

    try {
      await deleteCertificateById(id);
      const updated = certificates.filter((cert) => cert.id !== id);
      setCertificates(updated);
    } catch (error) {
      console.error("Failed to delete certificate:", error);
    }
  };

  const handleSearch = () => {
    const filtered = certificates.filter((cert) =>
      cert.groomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.brideName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.groomFathersName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.brideFathersName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cert.marriageDate &&
        new Date(cert.marriageDate)
          .toLocaleDateString("en-CA")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
    );
    setFilteredCertificates(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCertificates = filteredCertificates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-lg text-gray-600 font-semibold">
        Loading...
      </div>
    );

  return (
    
    <div className="p-6 md:p-10 bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen">
 <div className="mb-6">
  <button
    onClick={() => navigate(-1)}
    className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold py-2 px-5 rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
  >
    <svg
      className="w-4 h-4 text-gray-500 "
      fill="none" 
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
    </svg>
    Back
  </button>
</div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          📜 All Marriage Certificates
        </h1>
        <input
          type="text"
          placeholder="🔍 Search by name or date..."
          className="w-full md:w-64 border border-gray-300 rounded-md px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

  <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-300">
  <table className="min-w-[1200px] w-full text-sm text-left text-gray-700">
    <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white sticky top-0 z-10 shadow-md">
      <tr>
        {[
          "Groom Name", "Groom Father's Name", "Groom Age", "Groom Occupation",
          "Groom Religion", "Groom Address", "Bride Name", "Bride Father's Name",
          "Bride Age", "Bride Occupation", "Bride Religion", "Bride Address",
          "Marriage Date", "Maher Amount", "Vakil", "Witness 1", "Witness 2", "Marriage Performer", "Actions"
        ].map((header, i) => (
          <th key={i} className="px-4 py-3 font-semibold tracking-wide whitespace-nowrap">
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {currentCertificates.map((cert) => (
        <tr key={cert.id} className="hover:bg-blue-50 transition-colors duration-200">
          <td className="px-4 py-2 font-semibold">{cert.groomName}</td>
          <td className="px-4 py-2">{cert.groomFathersName}</td>
          <td className="px-4 py-2">{cert.groomAge}</td>
          <td className="px-4 py-2">{cert.groomOccupation}</td>
          <td className="px-4 py-2">{cert.groomReligion}</td>
          <td className="px-4 py-2">{cert.groomAddress}</td>
          <td className="px-4 py-2">{cert.brideName}</td>
          <td className="px-4 py-2">{cert.brideFathersName}</td>
          <td className="px-4 py-2">{cert.brideAge}</td>
          <td className="px-4 py-2">{cert.brideOccupation}</td>
          <td className="px-4 py-2">{cert.brideReligion}</td>
          <td className="px-4 py-2">{cert.brideAddress}</td>
          <td className="px-4 py-2">
            {cert.marriageDate ? new Date(cert.marriageDate).toLocaleDateString() : ""}
          </td>
          <td className="px-4 py-2">{cert.maherAmount}</td>
          <td className="px-4 py-2">{cert.Vakil}</td>
          <td className="px-4 py-2">{cert.witness1}</td>
          <td className="px-4 py-2">{cert.witness2}</td>
          <td className="px-4 py-2">{cert.marriagePerformer}</td>
          <td className="px-4 py-2">
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(cert.id)}
                className="flex items-center gap-1 text-white bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-md shadow-sm transition cursor-pointer"
              >
                <FiEdit />
                Edit
              </button>
              <button
                onClick={() => handleDelete(cert.id)}
                className="flex items-center gap-1 text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md shadow-sm transition cursor-pointer"
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
      {filteredCertificates.length === 0 && (
        <tr>
          <td colSpan="19" className="text-center px-6 py-8 text-gray-400 italic">
            No records found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

      {filteredCertificates.length > itemsPerPage && (
        <div className="mt-6 flex justify-end items-center space-x-4 text-sm">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default AllCertificate;
