import { ArrowLeft, Printer } from "lucide-react";
import { CustomerData } from "../App";

interface RegistrationFormPreviewProps {
  customerData: CustomerData | null;
  onBack: () => void;
}

export default function RegistrationFormPreview({
  customerData,
  onBack,
}: RegistrationFormPreviewProps) {
  const handlePrint = () => {
    window.print();
  };

  if (!customerData) {
    return (
      <div className="text-center" style={{ padding: '3rem 0' }}>
        <p className="text-gray-600" style={{ marginBottom: '1rem' }}>
          ไม่พบข้อมูล กรุณากรอกข้อมูลก่อน
        </p>
        <button
          onClick={onBack}
          className="text-blue-600 hover:underline"
        >
          กลับไปกรอกข้อมูล
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between print:hidden" style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800"
          style={{ gap: '0.5rem' }}
        >
          <ArrowLeft className="w-5 h-5" />
          กลับ
        </button>

        <div className="flex" style={{ gap: '0.75rem' }}>
          <button
            onClick={handlePrint}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            style={{ gap: '0.5rem', padding: '0.5rem 1rem' }}
          >
            <Printer className="w-5 h-5" />
            Print
          </button>
        </div>
      </div>

      {/* Registration Form */}
      <div className="print-area bg-white border border-gray-300 print:border-0" style={{ padding: '0.2rem 2.5rem' }}>
        {/* Header */}
        <div className="flex justify-between items-center" style={{ marginBottom: '0', marginTop: '0', paddingTop: '0', paddingBottom: '0' }}>
          <div className="flex items-center" style={{ gap: '1rem' }}>
            <img
              src="https://www.ohrich.com/_astro/logo.CMXTdngz_1RnVwL.webp"
              alt="OH! RICH Logo"
              className="h-8 w-auto object-contain"
            />
          </div>

          <div className="text-right flex-1">
            <h1 className="text-[12px]">
              ใบคำขอโอนงินไปต่างประเทศ / OUTWARD TRANSFER
              APPLICATION
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start justify-items-end" style={{ marginBottom: '0.1rem', paddingTop: '0rem', marginTop: '0rem' }}>
          <div>
            <div className="flex items-end">
              <span className="text-[10px]">วันที่</span>
              <span className="text-sm border-b border-black" style={{ padding: '0.1rem 2rem' }}>
                {customerData.transactionDate
                  ? new Date(customerData.transactionDate).toLocaleDateString(
                      "en-GB"
                    )
                  : customerData.registrationDate
                  ? new Date(customerData.registrationDate).toLocaleDateString(
                      "en-GB"
                    )
                  : new Date().toLocaleDateString("en-GB")}
              </span>
            </div>
            <div className="text-[10px] text-gray-600" style={{ marginTop: '0rem', marginRight: '0.5rem' }}>
              DATE
            </div>
          </div>
        </div>

        {/* Applicant Details */}
        <div style={{ marginBottom: '0.25rem' }}>
          <div className="bg-[#97d700] text-[10px] text-center text-black" style={{ padding: '0.25rem 1rem', marginBottom: '0.5rem' }}>
            รายละเอียดของผู้ใช้บริการโอนเงิน (DETAILS OF
            APPLICANT)
          </div>

          <div className="space-y-2 text-[10px]">{/* space-y-2 จะใช้งานได้จาก globals.css แล้ว */}
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    ชื่อ-นามสกุลผู้โอน (นาย/นาง/นางสาว)
                  </span>
                  <div className="text-[10px] border-b border-black pb-1 flex-1">
                    {customerData.fullName || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  NAME OF APPLICANT (MR./MRS./MISS)
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    สัญชาติ
                  </span>
                  <div className="text-[10px] border-b border-black pb-1 flex-1">
                    {customerData.nationality || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  NATIONALITY
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    เลขบัตรประชาชน/พาสปอร์ต
                  </span>
                  <div className="text-[10px] border-b border-black pb-1 flex-1">
                    {customerData.idCard || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  IDENTIFICATION NO./ PASSPORT NO.
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    วัน/เดือน/ปีเกิด
                  </span>
                  <div className="flex gap-2 flex-1">
                    <div className="text-[10px] border-b border-black text-center pb-1 flex-1">
                      {customerData.dateOfBirth
                        ? new Date(customerData.dateOfBirth)
                            .getDate()
                            .toString()
                            .padStart(2, "0")
                        : ""}
                    </div>
                    <div className="text-[10px] border-b border-black text-center pb-1 flex-1">
                      {customerData.dateOfBirth
                        ? new Date(
                            customerData.dateOfBirth,
                          ).toLocaleString("en", {
                            month: "short",
                          })
                        : ""}
                    </div>
                    <div className="text-[10px] border-b border-black text-center pb-1 flex-1">
                      {customerData.dateOfBirth
                        ? new Date(
                            customerData.dateOfBirth,
                          ).getFullYear()
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  DATE OF BIRTH
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-3 gap-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    ที่อยู่ปัจจุบัน
                  </span>
                  <div className="text-[10px] border-b border-black pb-1 flex-1">
                    {customerData.address || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  ADDRESS
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    แขวง
                  </span>
                  <div className="text-[10px] border-b border-black pb-1 flex-1">
                    {customerData.subDistrict || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  SUB DISTRICT
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    เขต
                  </span>
                  <div className="text-[10px] border-b border-black pb-1 flex-1">
                    {customerData.district || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  DISTRICT
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-3 gap-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    จังหวัด
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.province || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  PROVINCE
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    รหัสไปรษณีย์
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.postCode || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  POST CODE
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    เบอร์โทรศัพท์
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.phone || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  PHONE
                </div>
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-2 gap-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    อีเมล
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.email || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0"  style={{ marginBottom: '0rem', marginTop: '0rem' }}>
                  E-MAIL ADDRESS
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    อาชีพ
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.occupation || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0"  style={{ marginBottom: '0rem', marginTop: '0rem' }}>
                  OCCUPATION
                </div>
              </div>
            </div>

            {/* Row 6 */}
            <div className="grid grid-cols-2 gap-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    ชื่อบริษัท
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.businessName || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  NAME OF BUSINESS
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    ที่อยู่บริษัท
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.companyAddress || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  COMPANY ADDRESS
                </div>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2 pt-1"  style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <input
                type="checkbox"
                id="sameAddress"
                checked={customerData.sameAsCurrentAddress}
                readOnly
                className="w-4 h-4"
              />
              <label
                htmlFor="sameAddress"
                className="text-[10px] text-black"
              >
                ที่อยู่เดียวกับที่อยู่ปัจจุบัน / SAME ADDRESS AS
                CURRENT ADDRESS
              </label>
            </div>
          </div>
        </div>

        {/* Corporate Section */}
        <div className="mb-1">
          <div className="space-y-2 text-[10px]">
            {/* Representative Name */}
            <div className="grid grid-cols-2 gap-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
                  <span className="text-[10px] text-black whitespace-nowrap">
                    ชื่อ-นามสกุลผู้โอน แทนนิติบุคคล
                    (นาย/นาง/นางสาว)
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.representativeName || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  APPLICANT ON BEHALF (MR./MRS./MISS)
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
                  <span className="text-[10px] text-black whitespace-nowrap">
                    สัญชาติ
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.representativeNationality || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  NATIONALITY
                </div>
              </div>
            </div>

            {/* Representative ID and DOB */}
            <div className="grid grid-cols-2 gap-8 mt-1 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    เลขบัตรประชาชน/พาสปอร์ต
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.representativeIdCard || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  IDENTIFICATION NO./ PASSPORT NO.
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    วัน/เดือน/ปีเกิด
                  </span>
                  <div className="flex gap-2 flex-1">
                    <div className="border-b border-black text-center pb-1 flex-1">
                      {customerData.representativeDateOfBirth
                        ? new Date(
                            customerData.representativeDateOfBirth,
                          )
                            .getDate()
                            .toString()
                            .padStart(2, "0")
                        : ""}
                    </div>
                    <div className="border-b border-black text-center pb-1 flex-1">
                      {customerData.representativeDateOfBirth
                        ? new Date(
                            customerData.representativeDateOfBirth,
                          ).toLocaleString("en", {
                            month: "short",
                          })
                        : ""}
                    </div>
                    <div className="border-b border-black text-center pb-1 flex-1">
                      {customerData.representativeDateOfBirth
                        ? new Date(
                            customerData.representativeDateOfBirth,
                          ).getFullYear()
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  DATE OF BIRTH
                </div>
              </div>
            </div>

            {/* Row with Corporate Name and Registered In */}
            <div className="grid grid-cols-2 gap-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    ชื่อนิติบุคคล
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.corporateName || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  NAME OF CORPORATE
                </div>
              </div>
              <div>
                <div className="grid grid-cols-[25%_75%] gap-8">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] text-black whitespace-nowrap">
                        จดทะเบียนจัดตั้ง
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500 mb-2">
                      REGISTERED IN
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-1 gap-2 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
                      <div>
                        <div className="flex items-left gap-2">
                          <input
                            type="radio"
                            id="thailand"
                            name="country"
                            checked={
                              customerData.registeredIn ===
                              "ในประเทศไทย"
                            }
                            readOnly
                            className="w-4 h-4"
                          />
                          <label
                            htmlFor="thailand"
                            className="text-[10px] text-black"
                          >
                            ในประเทศไทย / THAILAND
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-left gap-2">
                          <input
                            type="radio"
                            id="otherCountry"
                            name="country"
                            checked={
                              customerData.registeredIn ===
                              "อื่นๆ"
                            }
                            readOnly
                            className="w-4 h-4"
                          />
                          <label
                            htmlFor="otherCountry"
                            className="text-[10px] text-black"
                          >
                            อื่นๆ โปรดระบุ / OTHER COUNTRY
                          </label>
                        </div>
                        {customerData.registeredIn ===
                          "อื่นๆ" && (
                          <div className="ml-6 mt-1">
                            <div className="border-b border-black pb-1">
                              {customerData.registeredInOther ||
                                ""}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    สถานที่ตั้งของบริษัท
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.corporateLocation || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  COMPANY ADDRESS
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    ตำบล
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.corporateSubDistrict || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  SUB DISTRICT
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    อำเภอ
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.corporateDistrict || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  DISTRICT
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    จังหวัด
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.corporateProvince || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  PROVINCE
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    รหัสไปรษณีย์
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.corporatePostCode || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  POST CODE
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    เบอร์โทรศัพท์
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.corporatePhone || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  PHONE
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    อีเมล
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.corporateEmail || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  E-MAIL ADDRESS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="mb-1">
          <div className="bg-[#97d700] text-[10px] text-black text-center px-4 py-1 mb-2">
            รายละเอียดของบัญชีผู้รับเงิน (DETAILS OF
            BENEFICIARY)
          </div>

          <div className="space-y-2 text-[10px]">
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    ชื่อ-นามสกุลผู้รับเงิน
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.beneficiaryName || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  NAME OF BENEFICIARY
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    เลขที่บัตรประชาชน/พาสปอร์ต
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.beneficiaryIdCard || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  IDENTIFICATION NO./ PASSPORT NO.
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-3 gap-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    ที่อยู่ผู้รับเงิน
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.beneficiaryAddress || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  ADDRESS
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    ประเทศปลายทาง
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.destinationCountry || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  DESTINATION COUNTRY
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    เบอร์โทรศัพท์
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.beneficiaryPhone || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  PHONE
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-3 gap-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    ชื่อบัญชี
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.beneficiaryName || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  ACCOUNT NAME
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    เลขที่บัญชี
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.beneficiaryAccountNo || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  BANK ACCOUNT NO
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    ชื่อธนาคาร
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.beneficiaryBank || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  BENEFICIARY BANK
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-3 gap-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    รหัสธนาคาร
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.beneficiarySwift || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  SWIFT CODE/SORT CODE/BSB
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    ที่อยู่ธนาคาร
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.beneficiaryBankAddress || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  BANK ADDRESS
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    อีเมล
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.beneficiaryEmail || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  E-MAIL ADDRESS
                </div>
              </div>
            </div>

            {/* Row 6 */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-black whitespace-nowrap">
                  รายละเอียดเพิ่มเติม
                </span>
                <div className="border-b border-black pb-1 flex-1">
                  {customerData.beneficiaryRemark || ""}
                </div>
              </div>
              <div className="text-[10px] text-gray-500 mt-0">
                REMARK
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className=""  style={{ marginBottom: '0rem', marginTop: '0rem' }}>
          <div className="bg-[#97d700] text-[10px] text-black text-center px-4 py-1 mb-2">
            วัตถุประสงค์สำหรับการโอนเงินไปต่างประเทศ (PURPOSE OF
            FUNDS TRANSFER)
          </div>

          <div className="space-y-2 text-[10px]">
            {/* Radio buttons in 2x2 grid */}
            <div className="grid grid-cols-3 gap-4"  style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="common"
                    checked={
                      customerData.purpose ===
                      "ค่าใช้จ่ายทั่วไป"
                    }
                    readOnly
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="common"
                    className="text-[10px] text-black"
                  >
                    ค่าใช้จ่ายทั่วไป
                  </label>
                </div>
                <div className="text-[10px] text-gray-500 ml-6">
                  COMMON EXPENSES
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="goods"
                    checked={
                      customerData.purpose === "สินค้าและบริการ"
                    }
                    readOnly
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="goods"
                    className="text-[10px] text-black"
                  >
                    สินค้าและบริการ
                  </label>
                </div>
                <div className="text-[10px] text-gray-500 ml-6">
                  PAYMENT OF GOODS / SERVICES
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="travel"
                    checked={
                      customerData.purpose === "ค่าเดินทาง"
                    }
                    readOnly
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="travel"
                    className="text-[10px] text-black"
                  >
                    ค่าเดินทาง
                  </label>
                </div>
                <div className="text-[10px] text-gray-500 ml-6">
                  TRAVEL EXPENSES
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-1">
              <div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="education"
                    checked={
                      customerData.purpose === "เพื่อการศึกษา"
                    }
                    readOnly
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="education"
                    className="text-[10px] text-black"
                  >
                    เพื่อการศึกษา
                  </label>
                </div>
                <div className="text-[10px] text-gray-500 ml-6">
                  EDUCATION EXPENSES
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="other"
                    checked={customerData.purpose === "อื่นๆ"}
                    readOnly
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="other"
                    className="text-[10px] text-black whitespace-nowrap"
                  >
                    อื่นๆ โปรดระบุ
                  </label>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.purposeOther || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 ml-6">
                  OTHER EXPENSES, PLEASE SPECIFY
                </div>
              </div>
            </div>

            {/* Relationship section */}
            <div className="mb-1">
              <div className="text-[10px]">
                RELATIONSHIP BETWEEN APPLICANT AND BENEFICIARY
              </div>
            </div>

            {/* Financial details in 3 columns */}
            <div className="grid grid-cols-3 gap-8 pt-2 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    สกุลเงินที่โอน
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.currency || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  CURRENCY
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    จำนวนเงินที่โอน
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.amount || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  TRANSFER AMOUNT
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    อัตราแลกเปลี่ยน
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.exchangeRate || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  EXCHANGE RATE
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    ค่าธรรมเนียม
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.transferFee || ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  FEE
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-black whitespace-nowrap">
                    รวมเป็นเงินทั้งสิ้น
                  </span>
                  <div className="border-b border-black pb-1 flex-1">
                    {customerData.totalAmount
                      ? `${customerData.totalAmount} THB`
                      : ""}
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 mt-0">
                  TOTAL AMOUNT
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="mt-1 pt-0">
          <p className="text-[9px] text-black mb-4">
            ข้าพเจ้าขอรับรองว่ารายละเอียดที่ให้ไว้ข้างต้นถูกต้องและเป็นความจริง
            และข้าพเจ้าได้ทราบและตกลงปฏิบัติตามเงื่อนไขและข้อตกลงในการโอนเงินไปต่างประเทศตามที่ระบุด้านล่างคําขอนี้
            <br />
            I/We represent that all information and details
            given above are true and correct in all respects.
            Also, I/we acknowledge and agree to comply with
            terms and conditions for funds transfer on the
            reverse of this application
          </p>

          <div className="grid grid-cols-1 justify-items-end gap-8 text-[10px] text-center mt-0 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
            <div>
              <div className="border-b border-gray-400 w-64 mx-auto mb-1"></div>
              <p className="text-black">
                ลายมือชื่อผู้ขอใช้บริการโอนเงิน
              </p>
              <p className="text-black mt-1">
                APPLICANT'S SIGNATURE
              </p>
            </div>
          </div>
        </div>

        {/* Terms and Conditions Section */}
        <div className="mt-8 pt-6">
          <div className="bg-[#97d700] text-[10px] text-black text-center px-4 py-1 mb-2">
            เงื่อนไขการใช้บริการโอนเงินไปต่างประเทศ
          </div>

          <div className="space-y-3 text-[10px] text-black leading-relaxed">
            <p className="mb-1">
              <span className="font-semibold">1.</span>{" "}
              ผู้ขอโอนเงินจะต้องลงทะเบียนสำหรับการโอนเงินด้วยตนเองครั้งแรก
              โดยแสดงบัตรประจำตัวประชาชน หนังสือเดินทาง
              หรือเอกสารแสดงตัวตนตามที่ผู้ให้บริการกำหนด
              และกรอกข้อมูลให้ครบถ้วน
            </p>

            <p className="mb-1">
              <span className="font-semibold">2.</span>{" "}
              ผู้ขอโอนตกลงยินยอมชำระค่าธรรมเนียมในการใช้บริการโอนเงินให้แก่ผู้ให้บริการ
              ตามอัตราค่าธรรมเนียมที่ผู้ให้บริการประกาศกำหนด
            </p>

            <p className="mb-1">
              <span className="font-semibold">3.</span>{" "}
              ในการทำธุรกรรมโอนเงินไปต่างประเทศ
              ผู้ขอโอนรับรองว่าเอกสารหลักฐานและข้อมูลที่กรอกเป็นข้อมูลจริงและถูกต้อง
              ผู้ขอโอนตกลงและรับทราบว่า จะปฏิบัติตามกฎหมาย
              หลักเกณฑ์ และเงื่อนไขของผู้ให้บริการ
            </p>

            <p className="mb-1">
              <span className="font-semibold">4.</span>{" "}
              ผู้ขอโอนต้องตรวจสอบรายละเอียดของคำขอโอนให้ถูกต้อง
              ในกรณีที่เกิดความผิดพลาดในการโอน
              หรือไม่สามารถทำการโอนเงินได้
              ผู้ให้บริการจะดำเนินการตรวจสอบและแจ้งกลับผู้ขอโอนภายใน
              3 วัน นับจากวันที่ได้รับแจ้ง
              และจะรีบดำเนินการแก้ไขต่อไป
            </p>

            <p className="mb-1">
              <span className="font-semibold">5.</span>{" "}
              ในกรณีที่ไม่สามารถโอนไปให้แก่ผู้รับโอนได้ไม่ว่าด้วยสาเหตุใดก็ตาม
              ผู้ให้บริการจะคืนเงินหลังหักค่าธรรมเนียมและค่าใช้จ่าย
              ที่เกี่ยวข้องให้แก่ผู้ขอโอน
              และผู้ขอโอนยินยอมให้ใช้อัตราแลกเปลี่ยนรับซื้อของผู้ให้บริการ
              ณ วันที่คืนเงิน
              โดยผู้ให้บริการจะโอนเงินเข้าบัญชีหรือ
              ติดต่อให้ผู้ขอโอนมารับเงินคืนที่สาขาให้บริการภายใน
              3–5 วันทำการ
              ผู้ขอโอนตกลงรับผิดชอบต่อค่าเสียหายทั้งหมดที่เกิดขึ้นให้แก่ผู้ให้บริการ
            </p>

            <p className="mb-1">
              <span className="font-semibold">6.</span>{" "}
              ผู้ให้บริการมีสิทธิ์ปฏิเสธการให้บริการได้
              หากมีข้อสงสัยว่า
              การทำธุรกรรมดังกล่าวเกี่ยวข้องกับการดำเนินการที่ผิดกฎหมาย
              เช่น การฟอกเงิน หรือ
              การสนับสนุนทางการเงินแก่ผู้กระทำความผิด
              หรือการก่อการร้าย เป็นต้น
            </p>

            <p className="mb-1">
              <span className="font-semibold">7.</span>{" "}
              ผู้ให้บริการขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขการให้บริการโอนเงินระหว่างประเทศ
              วิธีการเรียกชำระเงิน ค่าธรรมเนียมการโอน
              หรือรับโอนเงิน ตลอดจนค่าธรรมเนียมและค่าใช้จ่ายต่าง
              ๆ ตามที่ผู้ให้บริการเห็นสมควร
              โดยจะแจ้งให้ผู้ขอโอนทราบล่วงหน้าไม่น้อยกว่า 7 วัน
            </p>

            <p className="mb-1">
              <span className="font-semibold">8.</span>{" "}
              ผู้ให้บริการมีสิทธิยกเลิกการให้บริการของผู้ให้บริการแก่ผู้ขอโอน
              โดยไม่ต้องมีเหตุอธิบายใด ๆ หากตรวจพบว่า
              การให้บริการนั้นกระทำขึ้นเพื่อหลีกเลี่ยงข้อกำหนดของผู้ให้บริการ
            </p>

            <p className="mb-1">
              <span className="font-semibold">9.</span>{" "}
              ผู้ขอโอนจะชำระค่าโอนเงิน ค่าธรรมเนียม
              และค่าใช้จ่ายอื่น ๆ ทั้งหมดตามที่ผู้ให้บริการกำหนด
              และค่าใช้จ่ายที่เกี่ยวข้องกับการทำธุรกรรมทั้งหมด
              ผู้ขอโอนต้องชำระให้แก่ผู้ให้บริการอย่างครบถ้วน
            </p>

            <p className="mb-1">
              <span className="font-semibold">10.</span>{" "}
              ผู้ขอโอนยินยอมให้ผู้ให้บริการเปิดเผยข้อมูลที่เกี่ยวกับการใช้บริการของผู้ขอโอน
              ต่อเจ้าหน้าที่ของรัฐตามที่กฎหมายประกาศกำหนด
            </p>
          </div>
        </div>

        {/* Terms and Conditions Section - English */}
        <div className="mt-4 pt-2">
          <div className="bg-[#97d700] text-[10px] text-black text-center px-4 py-1 mb-2">
            TERMS AND CONDITIONS FOR THE USE OF INTERNATIONAL
            MONEY TRANSFER
          </div>

          <div className="space-y-3 text-[10px] text-black leading-relaxed">
            <p className="mb-1">
              <span className="font-semibold">1.</span> The
              customer must come to a branch to register by
              himself for the first time. National ID card,
              passport or other significant documents must be
              presented to the staff as required. The
              information should be filled clearly and
              completely.
            </p>

            <p className="mb-1">
              <span className="font-semibold">2.</span> The
              customer must agree to pay the international money
              transferring fee to the company according to the
              fee rate announced by the company.
            </p>

            <p className="mb-1">
              <span className="font-semibold">3.</span> The
              customer must approve that the documents and the
              written information are all true and correct. The
              customer must acknowledge and agree to act
              according to the laws, regulations, and conditions
              of the company.
            </p>

            <p className="mb-1">
              <span className="font-semibold">4.</span> The
              customer must thoroughly check that the details
              written in the money transferring request form are
              accurate. In case any errors or mistakes occur,
              the company will examine the transaction and
              inform the customer within three days after we
              received the information. We will further take
              action in solving the problem.
            </p>

            <p className="mb-1">
              <span className="font-semibold">5.</span> In case
              the money must be returned to the customer due to
              a failure in transaction, regardless of what the
              cause is, the company will return an amount of
              money to the customer after the deduction of the
              fee and other related expenses. The customer must
              agree to use the buying exchange rate of the
              company in the date of returning the money. The
              company will transfer the money to the account of
              the customer or contact the customer to get the
              money back at the branch within three to five
              working days. The customer must be responsible for
              paying any cost occurred due to transaction
              failure to the company.
            </p>

            <p className="mb-1">
              <span className="font-semibold">6.</span> The
              company has a right to reject service to any
              customer in case the transaction is suspected to
              be related to illegal activities, such as money
              laundering, funding criminals and terrorists, etc.
            </p>

            <p className="mb-1">
              <span className="font-semibold">7.</span> The
              company reserves the right to change the
              conditions of the international money transferring
              service, the methods of payment, the fees in
              transferring and receiving the money, and any
              other fees and expenses according to the
              consideration of the company. The company will
              inform the customer 7 days before any alterations
              will be made.
            </p>

            <p className="mb-1">
              <span className="font-semibold">8.</span> The
              company has a right to cancel any service without
              having to state the reasons of the cancellation.
              The company will inform the customer 7 days before
              any cancellations will be made.
            </p>

            <p className="mb-1">
              <span className="font-semibold">9.</span> The
              customer must make a full payment for the
              transferring fee, the service fee, the expenses
              occurred outside Thailand, and any other costs as
              required by the company.
            </p>

            <p className="mb-1">
              <span className="font-semibold">10.</span> The
              customer must agree to allow the company to reveal
              the information regarding the transferring
              transaction to the agents and any governmental
              organizations as stated in the laws.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 justify-items-end gap-8 text-center mt-8 pb-0" style={{ marginBottom: '0rem', marginTop: '0rem' }}>
          <div>SRT FOREX COMPANY LIMITED</div>
        </div>
      </div>
    </div>
  );
}