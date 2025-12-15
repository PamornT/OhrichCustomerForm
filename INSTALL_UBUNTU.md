# คู่มือติดตั้งและรันโปรเจกต์บน Ubuntu

## ขั้นตอนการติดตั้งแบบละเอียด

### 1. เตรียมระบบ Ubuntu

```bash
# อัพเดทระบบให้เป็นเวอร์ชันล่าสุด
sudo apt update && sudo apt upgrade -y

# ติดตั้ง tools พื้นฐาน
sudo apt install -y curl wget git build-essential
```

### 2. ติดตั้ง Node.js และ npm

#### วิธีที่ 1: ติดตั้งจาก NodeSource (แนะนำ)

```bash
# ติดตั้ง Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# ตรวจสอบเวอร์ชัน
node --version   # ควรได้ v18.x.x
npm --version    # ควรได้ 9.x.x หรือสูงกว่า
```

#### วิธีที่ 2: ติดตั้งจาก Node Version Manager (NVM)

```bash
# ติดตั้ง NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# โหลด NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# ติดตั้ง Node.js
nvm install 18
nvm use 18
nvm alias default 18

# ตรวจสอบเวอร์ชัน
node --version
npm --version
```

### 3. เตรียมโปรเจกต์

#### กรณีที่ 1: มี Git Repository

```bash
# Clone โปรเจกต์
git clone <your-repository-url>
cd admin-web-ui
```

#### กรณีที่ 2: มีไฟล์โปรเจกต์อยู่แล้ว

```bash
# สร้างโฟลเดอร์และเข้าไป
mkdir -p ~/projects/admin-web-ui
cd ~/projects/admin-web-ui

# Copy ไฟล์โปรเจกต์ทั้งหมดมาที่นี่
# (ใช้ scp, sftp, หรือวิธีอื่นๆ)
```

### 4. ติดตั้ง Dependencies

```bash
# ติดตั้ง packages ทั้งหมด
npm install

# กรณีเจอ error ให้ลอง
npm install --legacy-peer-deps

# หรือใช้ yarn (ถ้าต้องการ)
# npm install -g yarn
# yarn install
```

### 5. รันโปรเจกต์

```bash
# รันในโหมด Development
npm run dev

# โปรเจกต์จะรันที่ http://localhost:3000
```

### 6. เข้าถึงจากเครื่องอื่นในเครือข่ายเดียวกัน

ถ้าต้องการเข้าถึงจากเครื่องอื่นในเครือข่าย:

```bash
# หา IP address ของเครื่อง
ip addr show | grep "inet "
# หรือ
hostname -I

# แก้ไข vite.config.ts ให้มี server.host: true (มีอยู่แล้ว)
# จากนั้นเข้าถึงได้ที่ http://<your-ip>:3000
```

## การ Build และ Deploy

### Build โปรเจกต์

```bash
# Build สำหรับ Production
npm run build

# ไฟล์ที่ได้จะอยู่ในโฟลเดอร์ dist/
ls -la dist/
```

### Deploy ด้วย Nginx

```bash
# 1. ติดตั้ง Nginx
sudo apt install nginx -y

# 2. สร้างโฟลเดอร์สำหรับเว็บไซต์
sudo mkdir -p /var/www/admin-web-ui

# 3. Copy ไฟล์ที่ build แล้ว
sudo cp -r dist/* /var/www/admin-web-ui/

# 4. สร้าง Nginx config
sudo nano /etc/nginx/sites-available/admin-web-ui
```

ใส่ config นี้:

```nginx
server {
    listen 80;
    server_name localhost;  # หรือใช้ domain name ของคุณ

    root /var/www/admin-web-ui;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

```bash
# 5. Enable site
sudo ln -s /etc/nginx/sites-available/admin-web-ui /etc/nginx/sites-enabled/

# 6. ทดสอบ config
sudo nginx -t

# 7. Restart Nginx
sudo systemctl restart nginx

# 8. เปิด Firewall (ถ้ามี)
sudo ufw allow 'Nginx Full'
sudo ufw status

# เข้าถึงได้ที่ http://your-server-ip
```

### Deploy ด้วย PM2 (สำหรับ Preview mode)

```bash
# ติดตั้ง PM2
sudo npm install -g pm2

# Build โปรเจกต์
npm run build

# รัน preview ด้วย PM2
pm2 start "npm run preview" --name admin-web-ui

# ดู status
pm2 status

# ดู logs
pm2 logs admin-web-ui

# Restart
pm2 restart admin-web-ui

# Stop
pm2 stop admin-web-ui

# ตั้งให้รันอัตโนมัติเมื่อ boot
pm2 startup
pm2 save
```

## การแก้ปัญหาทั่วไป

### 1. Port 3000 ถูกใช้งานอยู่

```bash
# หา process ที่ใช้ port
sudo lsof -i :3000

# หรือ
sudo netstat -tulpn | grep :3000

# Kill process
sudo kill -9 <PID>

# หรือเปลี่ยน port ใน vite.config.ts
```

### 2. Permission denied เมื่อติดตั้ง packages

```bash
# แก้ไข permission ของ npm directories
sudo chown -R $USER:$(id -gn $USER) ~/.config
sudo chown -R $USER:$(id -gn $USER) ~/.npm
sudo chown -R $USER:$(id -gn $USER) /usr/local/lib/node_modules
```

### 3. npm install ล้มเหลว

```bash
# ลบ cache และติดตั้งใหม่
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 4. Module not found errors

```bash
# ติดตั้ง dependencies ที่ขาดหาย
npm install
# หรือ
npm install --legacy-peer-deps
```

### 5. Memory issues ขณะ build

```bash
# เพิ่ม memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

## เครื่องมือเพิ่มเติมที่มีประโยชน์

### ติดตั้ง htop (Monitor resources)

```bash
sudo apt install htop -y
htop
```

### ติดตั้ง screen (Run process in background)

```bash
sudo apt install screen -y

# สร้าง session ใหม่
screen -S adminweb

# รันโปรเจกต์
npm run dev

# Detach: กด Ctrl+A แล้วกด D
# Reattach: screen -r adminweb
# List sessions: screen -ls
```

### ติดตั้ง tmux (Alternative to screen)

```bash
sudo apt install tmux -y

# สร้าง session
tmux new -s adminweb

# รันโปรเจกต์
npm run dev

# Detach: กด Ctrl+B แล้วกด D
# Reattach: tmux attach -t adminweb
```

## ตรวจสอบ Logs และ Debug

```bash
# ดู logs แบบ real-time
npm run dev | tee app.log

# ดู system logs
sudo journalctl -xe

# ดู Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Performance Tips

```bash
# 1. เพิ่ม swap memory (ถ้า RAM น้อย)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 2. ทำให้ swap ถาวร
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 3. Build ด้วย optimization
npm run build -- --mode production
```

## Security Tips (สำหรับ Production)

```bash
# 1. Setup Firewall
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw status

# 2. ติดตั้ง SSL (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com

# 3. ปรับแต่ง Nginx security headers
# เพิ่มใน nginx config:
# add_header X-Frame-Options "SAMEORIGIN" always;
# add_header X-Content-Type-Options "nosniff" always;
# add_header X-XSS-Protection "1; mode=block" always;
```

## Quick Reference

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run lint

# Update dependencies
npm update

# Check outdated packages
npm outdated
```

## สรุป Commands ที่ใช้บ่อย

```bash
# ติดตั้งครั้งแรก
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs git
git clone <repo-url>
cd admin-web-ui
npm install
npm run dev

# รันทุกครั้ง
cd admin-web-ui
npm run dev

# Build และ Deploy
npm run build
sudo cp -r dist/* /var/www/admin-web-ui/
sudo systemctl restart nginx
```

---

**หมายเหตุ:** คู่มือนี้เหมาะสำหรับ Ubuntu 20.04 LTS, 22.04 LTS และรุ่นที่ใหม่กว่า
