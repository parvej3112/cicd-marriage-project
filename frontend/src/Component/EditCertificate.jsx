import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getCertificateById, updateCertificateById } from "../api/certificateApi";

const EditCertificate = () => {
  const { id } = useParams();
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    groomName: "",
    groomFathersName: "",
    groomAge: "",
    groomOccupation: "",
    groomAddress: "",
    groomReligion: "Islam",
    brideName: "",
    brideFathersName: "",
    brideAge: "",
    brideOccupation: "",
    brideAddress: "",
    brideReligion: "Islam",
    marriageDate: "",
    maherAmount: "",
    maherWord: "",
    Vakil: "",
    witness1: "",
    witness2: "",
    marriagePerformer: "",
  });

  useEffect(() => {
    async function fetchCertificate() {
      try {
        const data = await getCertificateById(id);
        setFormData(data);
      } catch (error) {
        console.error("Error loading certificate:", error);
        alert("Failed to load certificate data.");
      }
    }
    fetchCertificate();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return Object.values(formData).every((val) => val !== "");
  };

  const handleUpdateAndPrint = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await updateCertificateById(id, formData);
      containerRef.current.classList.add("print-container");

      setTimeout(() => {
        window.print();
        setTimeout(() => {
          containerRef.current.classList.remove("print-container");
        }, 1000);
      }, 200);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update certificate.");
    }
  };

 const getInputStyle = (value) => ({
  fontSize: (value?.length || 0) > 50 ? "12px" : "12pt",
});


  const containerStyle = {
    position: "relative",
    width: "21.5cm",
    height: "34.9cm",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    fontSize: "12pt",
    overflow: "hidden",
  };

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: -1cm;
            width: 100%;
            background: white;
          }
          button {
            display: none !important;
          }
          .print-container {
            background-image: none !important;
          }
        }
      `}</style>

      <div className="flex items-center justify-center min-h-screen mb-2 h-[30cm]">
        <div style={containerStyle} ref={containerRef} className="print-container">
          <div className="marriageForm absolute w-[21.5cm] h-[7.5cm]">
            <div className="info-header mt-[9cm] absolute w-[21.5cm] border">
             
<form
  onSubmit={handleUpdateAndPrint}
  className="print-area flex justify-center h-[30cm] w-[21.5cm] relative"
>
  {/* Groom Section */}
  <section className="flex flex-col w-[19.5cm] mt-[5mm] h-[5.1cm] absolute" id="groom-section">
    <input
      type="text"
      name="groomName"
      value={formData.groomName}
      onChange={handleChange}
      style={getInputStyle(formData.groomName)}
      className="ml-[3.2cm] absolute  w-[15.5cm] text-center outline-none"
      placeholder="Groom Name"
    />
    <input
      type="text"
      name="groomFathersName"
      value={formData.groomFathersName}
      onChange={handleChange}
      style={getInputStyle(formData.groomFathersName)}
      className="ml-[3.2cm] mt-[1cm] absolute w-[15.5cm] text-center outline-none"
      placeholder="Groom Father Name"
    />
    <input
      type="text"
      name="groomAge"
      value={formData.groomAge}
      onChange={handleChange}
      style={getInputStyle(formData.groomAge)}
      className="ml-[4mm] mt-[2.1cm] absolute w-[1.5cm] text-center outline-none"
      placeholder="Age"
    />
    <input
      type="text"
      name="groomOccupation"
      value={formData.groomOccupation}
      onChange={handleChange}
      style={getInputStyle(formData.groomOccupation)}
      className="ml-[8.8cm] mt-[2.1cm] absolute w-[4.2cm] text-center outline-none"
      placeholder="Groom Occupation"
    />
    <input
      type="text"
      name="groomAddress"
      value={formData.groomAddress}
      onChange={handleChange}
      style={getInputStyle(formData.groomAddress)}
      className="mt-[3.5cm] ml-[2cm] w-[15.9cm] outline-none text-center"
      placeholder="Groom Resident"
    />
  </section>

  {/* Bride Section */}
  <section className="flex flex-col w-[19.5cm] mt-[6cm] h-[5cm] absolute" id="bride-section">
    <input type="hidden" name="groomReligion" value={formData.groomReligion} />
    <input type="hidden" name="brideReligion" value={formData.brideReligion} />

    <input
      type="text"
      name="brideName"
      value={formData.brideName}
      onChange={handleChange}
      style={getInputStyle(formData.brideName)}
      className="ml-[2.7cm] absolute w-[16cm] text-center outline-none mt-[1mm]"
      placeholder="Bride Name"
    />
    <input
      type="text"
      name="brideFathersName"
      value={formData.brideFathersName}
      onChange={handleChange}
      style={getInputStyle(formData.brideFathersName)}
      className="ml-[2.3cm] mt-[1cm] absolute w-[16.5cm] text-center outline-none"
      placeholder="Bride Father Name"
    />
    <input
      type="text"
      name="brideAge"
      value={formData.brideAge}
      onChange={handleChange}
      style={getInputStyle(formData.brideAge)}
      className="ml-[2mm] mt-[2.1cm] absolute w-[1.5cm] text-center outline-none"
      placeholder="Age"
    />
    <input
      type="text"
      name="brideOccupation"
      value={formData.brideOccupation}
      onChange={handleChange}
      style={getInputStyle(formData.brideOccupation)}
      className="ml-[9.2cm] mt-[2cm] absolute w-[4.2cm] text-center outline-none"
      placeholder="Bride Occupation"
    />
    <input
      type="text"
      name="brideAddress"
      value={formData.brideAddress}
      onChange={handleChange}
      style={getInputStyle(formData.brideAddress)}
      className="mt-[3.5cm] ml-[2.2cm] w-[16.8cm] outline-none text-center"
      placeholder="Bride Resident"
    />
  </section>

  {/* Maher Section */}
  <section className="flex flex-col w-[19.5cm] absolute top-[10.3cm] h-[2.8cm]" id="maher-section">
    <input
      type="text"
      name="maherWord"
      value={formData.maherWord}
      onChange={handleChange}
      style={getInputStyle(formData.maherWord)}
      className="ml-[4.3cm] absolute w-[15cm] text-center outline-none mt-[2mm]"
      placeholder="Maher in words"
    />
    <input
      type="text"
      name="maherAmount"
      value={formData.maherAmount}
      onChange={handleChange}
      style={getInputStyle(formData.maherAmount)}
      className="ml-[11.3cm] mt-[1.4cm] absolute w-[4.7cm] text-center outline-none"
      placeholder="Maher in Digit"
    />
    <input
      type="date"
      name="marriageDate"
      value={formData.marriageDate}
      onChange={handleChange}
      className="ml-[0.1cm] mt-[1.4cm] absolute w-[3cm] text-center outline-none"
    />
  </section>

  {/* Witness Section */}
  <section className="flex flex-col w-[19.5cm] mt-[12.9cm] h-[7cm] absolute" id="witness-section">
    <input
      type="text"
      name="groomFathersName"
      value={formData.groomFathersName}
      onChange={handleChange}
      className="ml-[3.9cm] absolute w-[10.5cm] mt-[2mm] text-center outline-none"
      placeholder="Groom Father Name"
    />
    <input
      type="text"
      name="brideFathersName"
      value={formData.brideFathersName}
      onChange={handleChange}
      className="ml-[3.2cm] mt-[1.6cm] absolute w-[11.3cm] text-center outline-none"
      placeholder="Bride Father Name"
    />
    <input
      type="text"
      name="Vakil"
      value={formData.Vakil}
      onChange={handleChange}
      className="ml-[1.6cm] mt-[3cm] absolute w-[13cm] text-center outline-none"
      placeholder="Vakil Name"
    />
    <input
      type="text"
      name="witness1"
      value={formData.witness1}
      onChange={handleChange}
      className="ml-[2.8cm] absolute w-[11.5cm] text-center outline-none mt-[4.2cm]"
      placeholder="Name Witness No.1"
    />
    <input
      type="text"
      name="witness2"
      value={formData.witness2}
      onChange={handleChange}
      className="ml-[3cm] mt-[5.5cm] absolute w-[11.5cm] text-center outline-none"
      placeholder="Name Witness No.2"
    />
    <input
      type="text"
      name="marriagePerformer"
      value={formData.marriagePerformer}
      onChange={handleChange}
      className="ml-[3.9cm] mt-[6.6cm] absolute w-[10.5cm] text-center outline-none"
      placeholder="Marriage Performer Name"
    />
  </section>

  <button
    type="submit"
    className="absolute top-[23cm] left-[7cm] bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
  >
    Update & Print
  </button>
</form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCertificate;
