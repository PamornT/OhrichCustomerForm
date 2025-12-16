import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DashboardHome from './components/DashboardHome';
import CustomerForm from './components/CustomerForm';
import ReceiptPreview from './components/ReceiptPreview';
import RegistrationFormPreview from './components/RegistrationFormPreview';
import AgreementPreview from './components/AgreementPreview';

export interface CustomerData {
  fullName: string;
  phone: string;
  idCard: string;
  address: string;
  province: string;
  district: string;
  subDistrict: string;
  postCode: string;
  email: string;
  nationality: string;
  dateOfBirth: string;
  occupation: string;
  registrationDate: string;
  additionalDetails: string;
  
  // Business info
  businessName: string;
  companyAddress: string;
  sameAsCurrentAddress: boolean;
  
  // Representative info (ผู้เบิกจ่ายแทนนิติบุคคล)
  representativeName: string;
  representativeNationality: string;
  representativeIdCard: string;
  representativeDateOfBirth: string;
  
  // Corporate info
  corporateName: string;
  registeredIn: string; // "ในประเทศไทย" or "อื่นๆ"
  registeredInOther?: string;
  corporateLocation: string;
  corporateSubDistrict: string;
  corporateDistrict: string;
  corporateProvince: string;
  corporatePostCode: string;
  corporatePhone: string;
  corporateEmail: string;
  
  // Beneficiary info
  beneficiaryName: string;
  beneficiaryIdCard: string;
  beneficiaryAddress: string;
  destinationCountry: string;
  beneficiaryPhone: string;
  beneficiaryAccountName: string;
  beneficiaryAccountNo: string;
  beneficiaryBank: string;
  beneficiaryBranch: string;
  beneficiaryBankAddress: string;
  beneficiarySwift: string;
  beneficiaryEmail: string;
  beneficiaryRemark: string;
  
  // Transaction info
  relationshipWithBeneficiary: string;
  currency: string;
  amount: string;
  exchangeRate: string;
  amountBaht: string;
  transferFee: string;
  totalAmount: string;
  purpose: string;
  purposeOther?: string; // For "อื่นๆ" option
  transactionDate: string; // วันที่ทำธุรกรรม
  transactionNo: string; // เลขที่ธุรกรรม
  runNo: string; // Run No
  
  // ID Card Image
  idCardImage?: string; // Base64 encoded image
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [currentPage, setCurrentPage] = useState('customer-form');
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    setCurrentPage('customer-form');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setCurrentPage('customer-form');
    setCustomerData(null);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleSaveCustomerData = (data: CustomerData) => {
    setCustomerData(data);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Dashboard 
      currentUser={currentUser} 
      onLogout={handleLogout}
      currentPage={currentPage}
      onNavigate={handleNavigate}
    >
      {currentPage === 'dashboard' && <DashboardHome />}
      {currentPage === 'customer-form' && (
        <CustomerForm 
          onSave={handleSaveCustomerData}
          onNavigate={handleNavigate}
          initialData={customerData}
        />
      )}
      {currentPage === 'receipt-preview' && (
        <ReceiptPreview 
          customerData={customerData}
          onBack={() => handleNavigate('customer-form')}
        />
      )}
      {currentPage === 'registration-preview' && (
        <RegistrationFormPreview 
          customerData={customerData}
          onBack={() => handleNavigate('customer-form')}
        />
      )}
      {currentPage === 'agreement-preview' && (
        <AgreementPreview 
          customerData={customerData}
          onNavigate={handleNavigate}
        />
      )}
    </Dashboard>
  );
}