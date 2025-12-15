import { ArrowLeft, Download, Printer } from "lucide-react";
import { CustomerData } from "../App";

interface ReceiptPreviewProps {
  customerData: CustomerData | null;
  onBack: () => void;
}

export default function ReceiptPreview({
  customerData,
  onBack,
}: ReceiptPreviewProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert("ฟังก์ชันดาวน์โหลด PDF จะพร้อมใช้งานเร็วๆ นี้");
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
          className="flex items-center text-gray-600 hover:text-black"
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

      {/* Receipt */}
      <div className="print-area bg-white border border-gray-300 print:border-0" style={{ padding: '1.5rem 3rem' }}>
        {/* Header */}
        <div className="flex justify-between items-start text-sm" style={{ marginBottom: '1rem' }}>
          <div>
            <h1 className="text-base" style={{ marginBottom: '1.5rem' }}>
              Receipt / ใบเสร็จรับเงิน
            </h1>
            <p className="text-gray-700" style={{ marginBottom: '0.5rem' }}>
              SRT Forex Company Limited
            </p>
            <p className="text-gray-600" style={{ marginBottom: '0.5rem' }}>
              183 Regent House Building 19th Fl. Rajdamri road,
            </p>
            <p className="text-gray-600" style={{ marginBottom: '0.5rem' }}>
              Lumpinee, Patumwan, Bangkok, Thailand 10330
            </p>
            <p className="text-gray-600" style={{ marginBottom: '0.5rem' }}>
              Tax ID 0105557138926
            </p>
            <p className="text-gray-600" style={{ marginBottom: '0.5rem' }}>
              License MT 125630003
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoq6cNxB4Kmc2Can8ZQwKLkb6dP415mZHFhQ&s"
              alt="OH! RICH Logo"
              className="h-20 w-auto"
            />
          </div>
        </div>

        <div style={{ paddingTop: '0.5rem', marginBottom: '4.5rem' }} className="text-sm">
          <div className="grid grid-cols-2" style={{ gap: '0.5rem 2rem', marginBottom: '2rem' }}>
            <div className="flex">
              <span className="text-gray-600 w-32">Date</span>
              <span className="text-black">
                {customerData.transactionDate 
                  ? new Date(customerData.transactionDate).toLocaleDateString("en-GB")
                  : new Date().toLocaleDateString("en-GB")}
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-600 whitespace-nowrap mr-2">
                Transaction no
              </span>
              <span className="text-black">
                {customerData.transactionNo || 'N/A'}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25px' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap mr-2">
                  Applicant ชื่อผู้โอน
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.fullName || ""}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25px' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap mr-2">
                  Applicant ID/Passport Number
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.idCard || ""}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap mr-2">
                  Applicant Address ที่อยู่ผู้โอน
                </span>
                <span className="text-black whitespace-nowrap">
                  {[
                    customerData.address,
                    customerData.subDistrict,
                    customerData.district,
                    customerData.province,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap mr-2">
                  Country ประเทศปลายทาง
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.nationality || ""}
                </span>
              </div>
            </div>
          

            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Beneficiary Bank ธนาคารผู้รับเงิน
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.beneficiaryBank || ""}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Branch สาขา
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.beneficiaryBranch || ""}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Bank Code/SWIFT/SORT CODE รหัสธนาคาร
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.beneficiarySwift || ""}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Beneficiary Account Number/IBAN No.
                  เลขบัญชีผู้รับเงิน
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.beneficiaryAccountNo || ""}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Beneficiary Name ชื่อบัญชีผู้รับเงิน
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.beneficiaryAccountName || ""}
                </span>
              </div>
            </div>
          

          
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Purpose of Transfer วัตถุประสงค์การโอน
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.purpose || ""}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Currency สกุลเงิน
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.currency || ""}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Amount จำนวนโอน
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.amount || ""}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Exchange Rate อัตราแลกเปลี่ยน
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.exchangeRate || ""}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Amount Baht จำนวนเงินบาท
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.amountBaht
                    ? `${customerData.amountBaht} THB`
                    : ""}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Transfer Fee ค่าโอน
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.transferFee || ""}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Charge OUR
                </span>
                <span className="text-black whitespace-nowrap">-</span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Payment Method ชำระโดย
                </span>
                <span className="text-black">Transfer</span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Credit Card Fee ค่าธรรมเนียมบัตรเครดิต
                </span>
                <span className="text-black">-</span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '0.25rem' }}>
              <div className="flex">
                <span className="whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Total รวม
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.totalAmount
                    ? `${customerData.totalAmount} THB`
                    : ""}
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Applicant's email
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.email || ""}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
              <div className="flex">
                <span className="text-gray-600 whitespace-nowrap" style={{ marginRight: '0.5rem' }}>
                  Beneficiary's email
                </span>
                <span className="text-black whitespace-nowrap">
                  {customerData.beneficiaryEmail || "-"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '3rem', marginTop: '4.5rem' }}>
            <div className="text-center">
              <div className="border-t border-gray-400" style={{ paddingTop: '0.25rem' }}>
                <p className="text-gray-600">
                  <span>(</span>
                  <span className="inline-block w-50">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>)</span>
                </p>
                <p className="text-gray-700" style={{ marginTop: '0.25rem' }}>
                  Client Service
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-400" style={{ paddingTop: '0.25rem' }}>
                <p className="text-gray-700" style={{ marginTop: '0.25rem' }}>
                  Customer / ลูกค้า
                </p>
              </div>
            </div>
          </div>

          <div className="text-center" style={{ marginTop: '3rem' }}>
            <div className="border-t border-gray-400 inline-block" style={{ paddingTop: '0.25rem', padding: '0.25rem 4rem 0 4rem' }}>
              <p className="text-gray-600">
                <span>(</span>
                <span className="inline-block w-50">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>)</span>
              </p>
              <p className="text-gray-700" style={{ marginTop: '0.25rem' }}>Authorize</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}