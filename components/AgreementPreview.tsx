import { useEffect } from "react";
import { Printer, ArrowLeft } from "lucide-react";
import { CustomerData } from "../App";

interface AgreementPreviewProps {
  customerData: CustomerData | null;
  onNavigate: (page: string) => void;
}

export default function AgreementPreview({
  customerData,
  onNavigate,
}: AgreementPreviewProps) {
  useEffect(() => {
    // Add print-specific styles when component mounts
    const style = document.createElement("style");
    style.id = "agreement-print-styles";
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #agreement-content, #agreement-content * {
          visibility: visible;
        }
        #agreement-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .no-print {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const styleElement = document.getElementById(
        "agreement-print-styles",
      );
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!customerData) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800">
            ไม่พบข้อมูลลูกค้า กรุณากรอกข้อมูลก่อน
          </p>
          <button
            onClick={() => onNavigate("customer-form")}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            กลับไปกรอกข้อมูล
          </button>
        </div>
      </div>
    );
  }

  // Get purpose checkboxes
  const purposeCommon =
    customerData.purpose === "ค่าใช้จ่ายทั่วไป";
  const purposeEducation =
    customerData.purpose === "เพื่อการศึกษา";
  const purposeGoods =
    customerData.purpose === "สินค้าและบริการ";
  const purposeTravel = customerData.purpose === "ค่าเดินทาง";
  const purposeOther = customerData.purpose === "อื่นๆ";

  return (
    <div className="max-w-7xl mx-auto">
      {/* Action Buttons - Hidden when printing */}
      <div className="no-print mb-6 flex gap-4">
        <button
          onClick={() => onNavigate("customer-form")}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          กลับไปแก้ไข
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Printer className="w-5 h-5" />
          Print
        </button>
      </div>

      {/* Agreement Content */}
      <div
        id="agreement-content"
        className="bg-white rounded-xl"
        style={{ padding: "0.2rem 2.5rem" }}
      >
        {/* Header with Logo and Date/Order No */}
        <div className="flex justify-between items-start mb-1 pb-1 border-b-2 border-gray-300">
          {/* Logo Section */}
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoq6cNxB4Kmc2Can8ZQwKLkb6dP415mZHFhQ&s"
              alt="OH! RICH Logo"
              className="h-15 w-auto"
            />
          </div>

          {/* Date and Order No Section */}
          <div className="text-right space-y-1 text-[14px]">
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Date :</span>
              <span className="font-semibold">
                {customerData.transactionDate || "-"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Order No :</span>
              <span className="font-semibold">
                {customerData.runNo || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Beneficiary Information */}
        <table className="w-full mb-3 text-[14px]">
          <tbody>
            <tr style={{ marginBottom: "0.25rem" }}>
              <td
                className="text-gray-600 py-1 pr-4 align-top"
                style={{ width: "220px" }}
              >
                Beneficiary Account :
              </td>
              <td className="font-semibold py-1">
                {customerData.beneficiaryName || "-"}
              </td>
            </tr>
            <tr style={{ marginBottom: "0.25rem" }}>
              <td className="text-gray-600 py-1 pr-4 align-top">
                Beneficiary Address :
              </td>
              <td className="font-semibold py-1">
                {customerData.beneficiaryAddress &&
                customerData.destinationCountry
                  ? `${customerData.beneficiaryAddress}, ${customerData.destinationCountry}`
                  : customerData.beneficiaryAddress ||
                    customerData.destinationCountry ||
                    "-"}
              </td>
            </tr>
            <tr>
              <td className="text-gray-600 py-1 pr-4 align-top">
                Bank Name :
              </td>
              <td className="font-semibold py-1">
                {customerData.beneficiaryBank || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-gray-600 py-1 pr-4 align-top">
                Bank Address :
              </td>
              <td className="font-semibold py-1">
                {customerData.beneficiaryBankAddress || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-gray-600 py-1 pr-4 align-top">
                Swift/BIC :
              </td>
              <td className="font-semibold py-1">
                {customerData.beneficiarySwift || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-gray-600 py-1 pr-4 align-top">
                ACCOUNT NUMBER :
              </td>
              <td className="font-semibold py-1">
                {customerData.beneficiaryAccountNo || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-gray-600 py-1 pr-4 align-top">
                Transfer Amount :
              </td>
              <td className="font-semibold py-1">
                {customerData.amount && customerData.currency
                  ? `${customerData.amount} ${customerData.currency}`
                  : customerData.amount || "-"}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Purpose */}
        <div className="mb-3 text-[14px]">
          <table className="w-full">
            <tbody>
              <tr>
                <td
                  className="text-gray-600 py-1 pr-4 align-top"
                  style={{ width: "220px" }}
                >
                  Purpose :
                </td>
                <td className="py-1">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={purposeCommon}
                        readOnly
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">
                        Common expenses
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={purposeEducation}
                        readOnly
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">
                        Education expenses
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={purposeGoods}
                        readOnly
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">
                        Payment of goods / service
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={purposeTravel}
                        readOnly
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">
                        Travel expenses
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={purposeOther}
                        readOnly
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">
                        Other
                      </span>
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ID Card Image */}
        {customerData.idCardImage && (
          <div className="mb-3">
            <img
              src={customerData.idCardImage}
              alt="ID Card"
              className="h-50 w-auto max-w-md border border-gray-300 rounded"
            />
          </div>
        )}

        {/* Applicant Information */}
        <table className="w-full mb-3 text-[14px]">
          <tbody>
            <tr>
              <td
                className="text-gray-600 py-1 pr-4 align-top"
                style={{ width: "220px" }}
              >
                Applicant Name:
              </td>
              <td className="font-semibold py-1">
                {customerData.fullName || "-"}
              </td>
            </tr>
            <tr>
              <td className="text-gray-600 py-1 pr-4 align-top">
                Applicant Address :
              </td>
              <td className="font-semibold py-1">
                {customerData.address
                  ? `${customerData.address}, ${customerData.subDistrict}, ${customerData.district}, ${customerData.province}`
                  : "-"}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Agreement Text */}
        <div className="mb-12 space-y-4 text-center text-[14px]">
          <p className="text-gray-700 leading-relaxed">
            ข้าพเจ้าขอรับรองว่าข้อมูลและรายละเอียดที่ได้ให้ข้อมูลกับท่านข้างต้นนั้นเป็นความจริงทุกประการและละเอียดที่ได้ให้ข้อมูลกับทางบริษัทข้างต้นนั้นเป็นความจริงทุกประการ
            และละเอียดทุกเหตุผลบิผลผิดต้องห้ามองค์ต้องห้ามรู้องค์ต้องห้ามโอนเงินไปประเทศหรือขจิตปิ่นสำหรับผลกำเนินการเงินนี่
          </p>
          <p className="text-gray-700 leading-relaxed">
            I/We represent that all information and details
            given above are true and correct in all respects.
            Also,
          </p>
          <p className="text-gray-700 leading-relaxed">
            I/we acknowledge and agree to comply with terms and
            conditions for funds transfer
          </p>
        </div>

        {/* Signature */}
        <div className="flex justify-end text-[14px]">
          <div className="text-center">
            <div className="mt-8">
              <div className="w-64 border-b-2 border-dotted border-gray-400 mb-2"></div>
            </div>
            <div className="text-gray-700">
              <div className="mb-1">
                ลายมือชื่อของผู้ยื่นคำขอแปลน
              </div>
              <div>APPLICANT'S SIGNATURE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}