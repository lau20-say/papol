# 📹 StreamSphere

**StreamSphere** là nền tảng chia sẻ video và livestream **real-time**, mạnh mẽ, hiện đại, được xây dựng với **Next.js**, **WebRTC**, **PeerJS**, **Socket.IO**, và **TypeScript**. Giao diện tối giản, tốc độ mượt mà, hỗ trợ quay video trực tiếp và chia sẻ nội dung tức thì — tất cả trong trình duyệt.

## 🚀 Tính năng nổi bật

- 🎥 **Quay video** trực tiếp từ webcam/microphone
- 🔴 **Livestream real-time** với độ trễ thấp (dùng WebRTC + PeerJS)
- 📡 **Chia sẻ stream 1-1 hoặc nhiều người**
- 💬 **Gửi dữ liệu real-time** (chát, trạng thái mic/cam)
- 🌐 **Giao diện responsive**, hỗ trợ dark mode
- ♻️ **Tự động kết nối lại** khi mất mạng hoặc reload
- 🔒 **Bảo mật kết nối peer**, hỗ trợ ID định danh

## 🧠 Công nghệ sử dụng

- [Next.js 14+](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [WebRTC](https://webrtc.org/) & [PeerJS](https://peerjs.com/)
- [Socket.IO](https://socket.io/) - signaling layer
- [Tailwind CSS](https://tailwindcss.com/) - thiết kế nhanh, đẹp
- [Prisma ORM](https://www.prisma.io/) + PostgreSQL (hoặc SQLite) - lưu thông tin người dùng và video
- [React Context](https://reactjs.org/docs/context.html) - quản lý trạng thái toàn cục

## 📸 Demo ảnh chụp màn hình

| Quay video                          | Phòng gọi real-time             |
| ----------------------------------- | ------------------------------- |
| ![record](./screenshots/record.png) | ![call](./screenshots/call.png) |

## 🔧 Cài đặt & chạy local

```bash
# 1. Clone repo
git clone https://github.com/your-username/streamsphere.git
cd streamsphere

# 2. Cài đặt package
npm install

# 3. Cấu hình env
cp .env.example .env.local
# Thêm các thông tin như DATABASE_URL, NEXT_PUBLIC_PEERJS_SERVER, v.v.

# 4. Sync DB (nếu dùng Prisma)
npx prisma generate
npx prisma db push

# 5. Chạy dev
npm run dev
```
