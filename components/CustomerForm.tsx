import { useState, useEffect } from "react";
import { Save, Eye, FileText, Upload, X } from "lucide-react";
import { CustomerData } from "../App";

interface CustomerFormProps {
  onSave: (data: CustomerData) => void;
  onNavigate: (page: string) => void;
  initialData: CustomerData | null;
}

export default function CustomerForm({
  onSave,
  onNavigate,
  initialData,
}: CustomerFormProps) {
  const [formData, setFormData] = useState<CustomerData>({
    fullName: "",
    phone: "",
    idCard: "",
    address: "",
    province: "",
    district: "",
    subDistrict: "",
    postCode: "",
    email: "",
    nationality: "",
    dateOfBirth: "",
    occupation: "",
    registrationDate: new Date().toISOString().split("T")[0],
    additionalDetails: "",
    businessName: "",
    companyAddress: "",
    sameAsCurrentAddress: false,
    representativeName: "",
    representativeNationality: "",
    representativeIdCard: "",
    representativeDateOfBirth: "",
    corporateName: "",
    registeredIn: "",
    registeredInOther: "",
    corporateLocation: "",
    corporateSubDistrict: "",
    corporateDistrict: "",
    corporateProvince: "",
    corporatePostCode: "",
    corporatePhone: "",
    corporateEmail: "",
    beneficiaryName: "",
    beneficiaryIdCard: "",
    beneficiaryAddress: "",
    destinationCountry: "",
    beneficiaryPhone: "",
    beneficiaryAccountName: "",
    beneficiaryAccountNo: "",
    beneficiaryBank: "",
    beneficiaryBranch: "",
    beneficiaryBankAddress: "",
    beneficiarySwift: "",
    beneficiaryEmail: "",
    beneficiaryRemark: "",
    relationshipWithBeneficiary: "",
    currency: "",
    amount: "",
    exchangeRate: "",
    amountBaht: "",
    transferFee: "200",
    totalAmount: "",
    purpose: "",
    purposeOther: "",
    transactionDate: new Date().toISOString().split("T")[0],
    transactionNo: "",
    runNo: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Auto-calculate amounts
      if (
        name === "amount" ||
        name === "exchangeRate" ||
        name === "transferFee"
      ) {
        const amount =
          parseFloat(
            name === "amount" ? value : newData.amount,
          ) || 0;
        const rate =
          parseFloat(
            name === "exchangeRate"
              ? value
              : newData.exchangeRate,
          ) || 0;
        const baht = amount * rate;
        const fee =
          parseFloat(
            name === "transferFee"
              ? value
              : newData.transferFee,
          ) || 0;
        newData.amountBaht = baht.toFixed(2);
        newData.totalAmount = (baht + fee).toFixed(2);
      }

      return newData;
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        alert("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("ไฟล์มีขนาดใหญ่เกินไป (สูงสุด 5MB)");
        return;
      }

      // Read file as base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setFormData((prev) => ({
          ...prev,
          idCardImage: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      idCardImage: undefined,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    alert("บันทึกข้อมูลเรียบร้อยแล้ว");
  };

  const handlePreviewReceipt = () => {
    onSave(formData);
    onNavigate("receipt-preview");
  };

  const handlePreviewRegistration = () => {
    onSave(formData);
    onNavigate("registration-preview");
  };

  const handlePreviewAgreement = () => {
    onSave(formData);
    onNavigate("agreement-preview");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-gray-800 mb-2">
          บันทึกข้อมูลลูกค้า
        </h1>
        <p className="text-gray-600">
          กรอกข้อมูลลูกค้าและรายละเอียดการทำธุรกรรม
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* หัวเอกสาร */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 mb-6">
          <h2 className="text-gray-800 mb-6 pb-4 border-b border-gray-200">
            หัวเอกสาร
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">
                Run No
              </label>
              <input
                type="text"
                name="runNo"
                value={formData.runNo}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="เช่น RUN001"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                วันที่ (Date) *
              </label>
              <input
                type="date"
                name="transactionDate"
                value={formData.transactionDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Transaction no
              </label>
              <input
                type="text"
                name="transactionNo"
                value={formData.transactionNo}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="เช่น TXN202412140001"
              />
            </div>
          </div>
        </div>

        {/* รายละเอียดของผู้ใช้บริการโอนเงิน */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 mb-6">
          <h2 className="text-gray-800 mb-6 pb-4 border-b border-gray-200">
            รายละเอียดของผู้ใช้บริการโอนเงิน (DETAILS OF
            APPLICANT)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">
                ชื่อ-นามสกุลผู้โอน (นาย/นาง/นางสาว) *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                สัญชาติ
              </label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                เลขบัตรประชาชน/พาสปอร์ต *
              </label>
              <input
                type="text"
                name="idCard"
                value={formData.idCard}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                วัน/เดือน/ปีเกิด
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                ที่อยู่ปัจจุบัน
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                แขวง
              </label>
              <input
                type="text"
                name="subDistrict"
                value={formData.subDistrict}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                เขต
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                จังหวัด
              </label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                รหัสไปรษณีย์
              </label>
              <input
                type="text"
                name="postCode"
                value={formData.postCode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                เบอร์โทรศัพท์ *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                อีเมล
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                อาชีพ
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                วันที่ลงทะเบียน
              </label>
              <input
                type="date"
                name="registrationDate"
                value={formData.registrationDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                ชื่อบริษัท
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                ที่อยู่บริษัท
              </label>
              <input
                type="text"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Upload ID Card Image */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">
                สำเนาบัตรประชาชน / Copy of ID Card
              </label>

              {!formData.idCardImage ? (
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-5 h-5" />
                    <span>เลือกไฟล์รูปภาพ</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <span className="text-gray-500 text-sm">
                    รองรับไฟล์: JPG, PNG, GIF (สูงสุด 5MB)
                  </span>
                </div>
              ) : (
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <img
                        src={formData.idCardImage}
                        alt="ID Card Preview"
                        className="h-50 w-auto max-w-md rounded-lg border border-gray-200"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      ลบรูปภาพ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="sameAsCurrentAddress"
                checked={formData.sameAsCurrentAddress}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-gray-700">
                ที่อยู่เดียวกับที่อยู่ปัจจุบัน / SAME ADDRESS AS
                CURRENT ADDRESS
              </span>
            </label>
          </div>
        </div>

        {/* ผู้เบิกจ่ายแทนนิติบุคคล */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 mb-6">
          <h2 className="text-gray-800 mb-6 pb-4 border-b border-gray-200">
            ผู้โอนแทนนิติบุคคล (APPLICANT ON BEHALF)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">
                ชื่อ-นามสกุลผู้โอน แทนนิติบุคคล (นาย/นาง/นางสาว)
              </label>
              <input
                type="text"
                name="representativeName"
                value={formData.representativeName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                สัญชาติ
              </label>
              <input
                type="text"
                name="representativeNationality"
                value={formData.representativeNationality}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                เลขบัตรประชาชน/พาสปอร์ต
              </label>
              <input
                type="text"
                name="representativeIdCard"
                value={formData.representativeIdCard}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                วัน/เดือน/ปีเกิด
              </label>
              <input
                type="date"
                name="representativeDateOfBirth"
                value={formData.representativeDateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* ข้อมลนิติบุคคล */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 mb-6">
          <h2 className="text-gray-800 mb-6 pb-4 border-b border-gray-200">
            ข้อมูลนิติบุคคล (CORPORATE INFORMATION)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">
                ชื่อนิติบุคคล
              </label>
              <input
                type="text"
                name="corporateName"
                value={formData.corporateName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-3">
                จดทะเบียนจดตั้ง
              </label>
              <div className="flex gap-6 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="registeredIn"
                    value="ในประเทศไทย"
                    checked={
                      formData.registeredIn === "ในประเทศไทย"
                    }
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">
                    ในประเทศไทย / THAILAND
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="registeredIn"
                    value="อื่นๆ"
                    checked={formData.registeredIn === "อื่นๆ"}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">
                    อื่นๆ / OTHER
                  </span>
                </label>
              </div>

              {formData.registeredIn === "อื่นๆ" && (
                <input
                  type="text"
                  name="registeredInOther"
                  value={formData.registeredInOther || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ระบุประเทศ"
                />
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                สถานที่ตั้งของบริษัท
              </label>
              <input
                type="text"
                name="corporateLocation"
                value={formData.corporateLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                ตำบล
              </label>
              <input
                type="text"
                name="corporateSubDistrict"
                value={formData.corporateSubDistrict}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                อำเภอ
              </label>
              <input
                type="text"
                name="corporateDistrict"
                value={formData.corporateDistrict}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                จังหวัด
              </label>
              <input
                type="text"
                name="corporateProvince"
                value={formData.corporateProvince}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                รหัสไปรษณีย์
              </label>
              <input
                type="text"
                name="corporatePostCode"
                value={formData.corporatePostCode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                name="corporatePhone"
                value={formData.corporatePhone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                อีเมล
              </label>
              <input
                type="email"
                name="corporateEmail"
                value={formData.corporateEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* ข้อมูลผู้รับเงิน */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 mb-6">
          <h2 className="text-gray-800 mb-6 pb-4 border-b border-gray-200">
            รายละเอียดของบัญชีผู้รับเงิน (DETAILS OF
            BENEFICIARY)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">
                ชื่อ-นามสกุลผู้รับเงิน
              </label>
              <input
                type="text"
                name="beneficiaryName"
                value={formData.beneficiaryName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                เลขที่บัตรประชาชน/หนังสือเดินทางเลขที่
              </label>
              <input
                type="text"
                name="beneficiaryIdCard"
                value={formData.beneficiaryIdCard}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                ที่อยู่ผู้รับเงิน
              </label>
              <input
                type="text"
                name="beneficiaryAddress"
                value={formData.beneficiaryAddress}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                ประเทศปลายทาง
              </label>
              <input
                type="text"
                name="destinationCountry"
                value={formData.destinationCountry}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                เบอร์โทรศัพท์ผู้รับเงิน
              </label>
              <input
                type="tel"
                name="beneficiaryPhone"
                value={formData.beneficiaryPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                ชื่อบัญชี
              </label>
              <input
                type="text"
                name="beneficiaryAccountName"
                value={formData.beneficiaryAccountName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                เลขที่บัญชี
              </label>
              <input
                type="text"
                name="beneficiaryAccountNo"
                value={formData.beneficiaryAccountNo}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                ชื่อธนาคาร
              </label>
              <input
                type="text"
                name="beneficiaryBank"
                value={formData.beneficiaryBank}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                สาขาธนาคาร
              </label>
              <input
                type="text"
                name="beneficiaryBranch"
                value={formData.beneficiaryBranch}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                ที่อยู่ธนาคาร
              </label>
              <input
                type="text"
                name="beneficiaryBankAddress"
                value={formData.beneficiaryBankAddress}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                รหัสธนาคาร (SWIFT Code/BSB)
              </label>
              <input
                type="text"
                name="beneficiarySwift"
                value={formData.beneficiarySwift}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                อีเมล
              </label>
              <input
                type="email"
                name="beneficiaryEmail"
                value={formData.beneficiaryEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">
                รายละเอียดเพิ่มเติม
              </label>
              <textarea
                name="beneficiaryRemark"
                value={formData.beneficiaryRemark}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* รายละเอียดการทำธุรกรรม */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 mb-6">
          <h2 className="text-gray-800 mb-6 pb-4 border-b border-gray-200">
            วัตถุประสงค์สำหรับการโอนเงินไปต่างประเทศ (PURPOSE OF
            FUNDS TRANSFER)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">
                วัตถุประสงค์
              </label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              >
                <option
                  value=""
                  className="bg-white text-gray-900"
                >
                  -- เลือกวัตถุประสงค์ --
                </option>
                <option
                  value="ค่าใช้จ่ายทั่วไป"
                  className="bg-white text-gray-900"
                >
                  ค่าใช้จ่ายทั่วไป / COMMON EXPENSES
                </option>
                <option
                  value="สินค้าและบริการ"
                  className="bg-white text-gray-900"
                >
                  สินค้าและบริการ / PAYMENT OF GOODS / SERVICES
                </option>
                <option
                  value="เพื่อการศึกษา"
                  className="bg-white text-gray-900"
                >
                  เพื่อการศึกษา / EDUCATION EXPENSES
                </option>
                <option
                  value="ค่าเดินทาง"
                  className="bg-white text-gray-900"
                >
                  ค่าเดินทาง / TRAVEL EXPENSES
                </option>
                <option
                  value="อื่นๆ"
                  className="bg-white text-gray-900"
                >
                  อื่นๆ โปรดระบุ / OTHER EXPENSES, PLEASE
                  SPECIFY
                </option>
              </select>
            </div>

            {formData.purpose === "อื่นๆ" && (
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">
                  ระบุวัตถุประสงค์อื่นๆ
                </label>
                <input
                  type="text"
                  name="purposeOther"
                  value={formData.purposeOther || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">
                ความสัมพันธ์ระหว่างผู้ส่งกับผู้รับเงิน
              </label>
              <input
                type="text"
                name="relationshipWithBeneficiary"
                value={formData.relationshipWithBeneficiary}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                สกุลเงินที่โอน
              </label>
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                จำนวนเงินที่โอน
              </label>
              <input
                type="number"
                step="0.01"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                อัตราแลกเปลี่ยน
              </label>
              <input
                type="number"
                step="0.01"
                name="exchangeRate"
                value={formData.exchangeRate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                จำนวนเงินบาท
              </label>
              <input
                type="text"
                name="amountBaht"
                value={formData.amountBaht}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                ค่าธรรมเนียม
              </label>
              <input
                type="number"
                step="0.01"
                name="transferFee"
                value={formData.transferFee}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                รวมเป็นเงินทั้งสิ้น
              </label>
              <input
                type="text"
                name="totalAmount"
                value={formData.totalAmount}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* รายละเอียดเพิ่มเติม */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 mb-6">
          <h2 className="text-gray-800 mb-6 pb-4 border-b border-gray-200">
            รายละเอียดเพิ่มเติม
          </h2>

          <div>
            <label className="block text-gray-700 mb-2">
              หมายเหตุ
            </label>
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกรายละเอียดเพิ่มเติม..."
            />
          </div>
        </div>

        <div className="flex gap-4">
          {/* <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Save className="w-5 h-5" />
            บันทึกข้อมูล
          </button> */}

          <button
            type="button"
            onClick={handlePreviewReceipt}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Eye className="w-5 h-5" />
            Preview ใบเสร็จ
          </button>

          <button
            type="button"
            onClick={handlePreviewRegistration}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <FileText className="w-5 h-5" />
            Preview แบบฟอร์มลงทะเบียน
          </button>

          <button
            type="button"
            onClick={handlePreviewAgreement}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <FileText className="w-5 h-5" />
            Preview แบบฟอร์มสัญญา
          </button>
        </div>
      </form>
    </div>
  );
}