import { Users, Receipt, FileText, TrendingUp } from 'lucide-react';

export default function DashboardHome() {
  const stats = [
    { label: 'ลูกค้าทั้งหมด', value: '1,234', icon: Users, color: 'blue' },
    { label: 'ใบเสร็จวันนี้', value: '45', icon: Receipt, color: 'green' },
    { label: 'แบบฟอร์มทั้งหมด', value: '892', icon: FileText, color: 'purple' },
    { label: 'เติบโตเดือนนี้', value: '+12%', icon: TrendingUp, color: 'orange' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">ภาพรวมระบบจัดการข้อมูลลูกค้า</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            purple: 'bg-purple-50 text-purple-600',
            orange: 'bg-orange-50 text-orange-600',
          };
          
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-gray-800">{stat.value}</h3>
              <p className="text-gray-600 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-800 mb-4">รายการล่าสุด</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-gray-800">ลูกค้า #{1000 + i}</p>
                  <p className="text-sm text-gray-500">วันที่ {new Date().toLocaleDateString('th-TH')}</p>
                </div>
                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">สำเร็จ</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-800 mb-4">กิจกรรมล่าสุด</h3>
          <div className="space-y-4">
            {[
              'บันทึกข้อมูลลูกค้าใหม่',
              'พิมพ์ใบเสร็จ #MT001',
              'ดาวน์โหลดแบบฟอร์ม',
              'อัพเดทข้อมูลลูกค้า',
              'สร้างใบเสร็จใหม่'
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                <div>
                  <p className="text-gray-700">{activity}</p>
                  <p className="text-sm text-gray-500">{i + 1} นาทีที่แล้ว</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
