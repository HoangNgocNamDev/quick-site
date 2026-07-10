
## 1. Thông tin tài liệu

| Hạng mục | Nội dung |
|---|---|
| Tên hệ thống | Website Builder SaaS MVP |
| Phiên bản | v1.0 |
| Mục tiêu | Xây dựng MVP cho nền tảng cho phép đơn vị nhỏ tạo và vận hành website đơn giản theo mô hình thuê bao |
| Đối tượng sử dụng | Product Owner, BA, UI/UX, Frontend Developer, Backend Developer, QA, DevOps, AI Coding Agent |
| Loại sản phẩm | Multi-tenant SaaS / Template Website as a Service |
| Ngôn ngữ chính | Tiếng Việt |
| Tech stack đề xuất | Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS |

---

## 2. Mục tiêu sản phẩm

### 2.1. Bối cảnh

Nhiều đơn vị nhỏ như spa, salon, trung tâm tiếng Anh, phòng khám nhỏ, dịch vụ sửa chữa, quán ăn hoặc công ty dịch vụ cần có website riêng nhưng không muốn:

- Thuê agency với chi phí cao.
- Tự học WordPress, Wix hoặc Webflow.
- Tự quản lý hosting, domain, SSL, backup.
- Tự thiết kế giao diện.
- Tự viết nội dung chuyên nghiệp.

Hệ thống này hướng tới việc giúp khách hàng có website nhanh, rẻ, dễ quản lý và không cần hiểu kỹ thuật.

### 2.2. Mục tiêu MVP

MVP cần đạt được các mục tiêu sau:

1. Platform Admin có thể tạo website cho khách hàng mới.
2. Khách hàng có thể đăng nhập CMS để chỉnh nội dung cơ bản.
3. Mỗi khách hàng có một website public riêng.
4. Website public hiển thị đẹp trên mobile và desktop.
5. Website có các block nội dung cơ bản: banner, giới thiệu, dịch vụ, bảng giá, hình ảnh, feedback, FAQ, liên hệ.
6. Khách truy cập website có thể gửi form liên hệ.
7. Chủ website có thể xem danh sách lead từ form liên hệ.
8. Hệ thống hỗ trợ subdomain dạng `tenant.yourdomain.vn`.
9. Hệ thống có thể publish/unpublish website.
10. MVP không cần kéo-thả tự do như Wix.

### 2.3. Định vị sản phẩm

Sản phẩm không định vị là:

> Công cụ thiết kế website kéo-thả.

Sản phẩm định vị là:

> Dịch vụ tạo website thuê bao cho đơn vị nhỏ. Chỉ cần nhập thông tin, chọn template và publish website.

---

## 3. Phạm vi MVP

### 3.1. In Scope

#### Nhóm Platform Admin

- Đăng nhập Platform Admin.
- Quản lý tenant/khách hàng.
- Tạo website cho tenant.
- Chọn template ban đầu.
- Gán subdomain.
- Publish/unpublish website.
- Xem danh sách website.
- Xem danh sách lead của từng website.
- Reset password cho khách hàng.
- Cập nhật trạng thái gói thuê bao thủ công.

#### Nhóm Customer CMS

- Đăng nhập tài khoản khách hàng.
- Xem dashboard website.
- Chỉnh thông tin thương hiệu.
- Chỉnh thông tin liên hệ.
- Chỉnh nội dung trang chủ.
- Quản lý danh sách dịch vụ.
- Quản lý bảng giá.
- Upload ảnh.
- Quản lý gallery.
- Quản lý FAQ.
- Xem danh sách lead.
- Chỉnh SEO cơ bản.
- Preview website.
- Publish thay đổi.

#### Nhóm Public Website

- Hiển thị website theo subdomain.
- Hiển thị trang chủ.
- Hiển thị trang dịch vụ.
- Hiển thị trang liên hệ.
- Hiển thị Google Map.
- Hiển thị nút gọi điện.
- Hiển thị nút Zalo/Facebook.
- Gửi form liên hệ.
- Responsive mobile/tablet/desktop.
- SEO cơ bản: title, description, Open Graph image.

#### Nhóm AI hỗ trợ nội dung

- Sinh đoạn giới thiệu doanh nghiệp.
- Sinh mô tả dịch vụ.
- Sinh FAQ.
- Sinh title/meta description SEO.
- Không bắt buộc AI phải tự tạo toàn bộ website trong MVP.

### 3.2. Out of Scope

Các chức năng sau không nằm trong MVP:

- Builder kéo-thả tự do giống Wix/Webflow.
- Marketplace template.
- Plugin system.
- E-commerce đầy đủ.
- Thanh toán online.
- Booking calendar phức tạp.
- Quản lý tồn kho.
- Multi-language nâng cao.
- Phân quyền nội bộ phức tạp cho khách hàng.
- App mobile native.
- Tự động mua domain.
- Tự động cấu hình DNS cho custom domain.
- Tích hợp CRM phức tạp.
- Tích hợp email marketing.
- A/B testing.
- Analytics nâng cao.
- Theme editor chỉnh CSS tự do.
- Export source code website.

---

## 4. Người dùng và vai trò

### 4.1. Platform Admin

Là người vận hành nền tảng.

Quyền chính:

- Tạo tenant.
- Tạo website cho tenant.
- Quản lý trạng thái website.
- Quản lý subdomain.
- Xem lead.
- Hỗ trợ khách hàng chỉnh sửa dữ liệu.
- Quản lý trạng thái gói thuê bao.

### 4.2. Customer Owner

Là chủ đơn vị nhỏ thuê website.

Quyền chính:

- Đăng nhập CMS.
- Chỉnh nội dung website của mình.
- Upload ảnh.
- Quản lý dịch vụ/bảng giá.
- Xem lead.
- Chỉnh SEO cơ bản.
- Preview/publish website.

### 4.3. Public Visitor

Là người dùng truy cập website public.

Quyền chính:

- Xem nội dung website.
- Bấm gọi điện.
- Bấm Zalo/Facebook.
- Gửi form liên hệ.
- Xem địa chỉ/Google Map.

### 4.4. AI Assistant

Không phải user trực tiếp, nhưng là module hỗ trợ Customer Owner tạo nội dung.

Nhiệm vụ:

- Sinh text gợi ý.
- Rewrite nội dung cho chuyên nghiệp.
- Sinh FAQ.
- Sinh mô tả SEO.

---

## 5. Giả định nghiệp vụ

1. Một tenant tương ứng với một khách hàng/doanh nghiệp.
2. Một tenant trong MVP chỉ có một website.
3. Một website có thể dùng subdomain miễn phí hoặc domain riêng cấu hình thủ công.
4. Subdomain là bắt buộc trong MVP.
5. Custom domain là optional, cấu hình thủ công bởi Platform Admin.
6. Website được tạo từ template cố định.
7. Khách hàng không được chỉnh layout tự do.
8. Khách hàng chỉ được chỉnh nội dung, ảnh, màu cơ bản, thông tin liên hệ.
9. Hệ thống chưa xử lý thanh toán tự động trong MVP.
10. Subscription status được Platform Admin cập nhật thủ công.
11. Website chỉ public nếu tenant còn active và site đang published.
12. Nếu tenant bị inactive/suspended, public website sẽ hiển thị trang thông báo tạm ngưng.

---

## 6. Luồng nghiệp vụ tổng quan

### 6.1. Luồng tạo website mới

1. Platform Admin đăng nhập.
2. Platform Admin tạo tenant mới.
3. Platform Admin nhập thông tin cơ bản:
   - Tên doanh nghiệp.
   - Ngành nghề.
   - Email chủ website.
   - Số điện thoại.
   - Subdomain mong muốn.
4. Hệ thống kiểm tra subdomain có hợp lệ và chưa tồn tại.
5. Platform Admin chọn template.
6. Hệ thống tạo website với dữ liệu mặc định.
7. Hệ thống tạo tài khoản Customer Owner.
8. Hệ thống gửi hoặc hiển thị thông tin đăng nhập cho khách hàng.
9. Customer Owner đăng nhập CMS.
10. Customer Owner chỉnh nội dung.
11. Customer Owner preview website.
12. Customer Owner publish website.
13. Website public tại subdomain.

### 6.2. Luồng chỉnh sửa website

1. Customer Owner đăng nhập CMS.
2. Customer Owner chọn mục cần chỉnh:
   - Thương hiệu.
   - Trang chủ.
   - Dịch vụ.
   - Bảng giá.
   - Gallery.
   - FAQ.
   - Liên hệ.
   - SEO.
3. Customer Owner cập nhật nội dung.
4. Hệ thống lưu bản draft.
5. Customer Owner preview.
6. Customer Owner publish.
7. Website public hiển thị nội dung mới.

### 6.3. Luồng khách truy cập gửi lead

1. Public Visitor truy cập website.
2. Public Visitor xem thông tin dịch vụ.
3. Public Visitor điền form liên hệ:
   - Họ tên.
   - Số điện thoại.
   - Email.
   - Nội dung nhu cầu.
4. Hệ thống validate dữ liệu.
5. Hệ thống lưu lead.
6. Hệ thống hiển thị thông báo gửi thành công.
7. Customer Owner xem lead trong CMS.
8. Platform Admin cũng có thể xem lead để hỗ trợ.

### 6.4. Luồng sinh nội dung bằng AI

1. Customer Owner vào màn hình chỉnh nội dung.
2. Customer Owner nhập thông tin ngắn về doanh nghiệp/dịch vụ.
3. Customer Owner bấm `Gợi ý bằng AI`.
4. Hệ thống gửi prompt đến AI provider.
5. AI trả về nội dung gợi ý.
6. Customer Owner có thể:
   - Áp dụng nội dung.
   - Chỉnh sửa lại.
   - Sinh lại.
   - Hủy bỏ.

---

## 7. Yêu cầu chức năng chi tiết

## 7.1. Authentication

### FR-AUTH-001 — Đăng nhập

#### Mô tả

Người dùng có thể đăng nhập vào hệ thống bằng email và mật khẩu.

#### Actor

- Platform Admin
- Customer Owner

#### Input

- Email
- Password

#### Xử lý

1. Hệ thống kiểm tra email có tồn tại không.
2. Hệ thống kiểm tra mật khẩu.
3. Hệ thống kiểm tra trạng thái user.
4. Nếu hợp lệ, hệ thống tạo session.
5. Hệ thống redirect user theo role:
   - Platform Admin → `/admin`
   - Customer Owner → `/cms`

#### Validation

- Email bắt buộc.
- Email phải đúng format.
- Password bắt buộc.
- User inactive không được đăng nhập.
- Tenant inactive thì Customer Owner không được truy cập CMS.

#### Acceptance Criteria

- User nhập đúng email/password thì đăng nhập thành công.
- User nhập sai password thì hiển thị lỗi.
- User inactive không đăng nhập được.
- Customer Owner không thể truy cập admin platform.
- Platform Admin không bị giới hạn tenant.

---

### FR-AUTH-002 — Đăng xuất

#### Mô tả

Người dùng có thể đăng xuất khỏi hệ thống.

#### Actor

- Platform Admin
- Customer Owner

#### Xử lý

1. User bấm logout.
2. Hệ thống xóa session.
3. Redirect về trang login.

#### Acceptance Criteria

- Sau khi logout, user không truy cập được trang protected.
- Session bị xóa khỏi browser.

---

### FR-AUTH-003 — Reset password thủ công

#### Mô tả

Platform Admin có thể reset password cho Customer Owner.

#### Actor

- Platform Admin

#### Xử lý

1. Platform Admin chọn user.
2. Platform Admin nhập password mới hoặc bấm generate password.
3. Hệ thống hash password.
4. Hệ thống lưu password mới.
5. Hệ thống hiển thị password tạm thời một lần.

#### Acceptance Criteria

- Password mới được lưu dạng hash.
- Customer Owner có thể đăng nhập bằng password mới.
- Password tạm thời không được lưu plain text.

---

## 7.2. Tenant Management

### FR-TENANT-001 — Danh sách tenant

#### Mô tả

Platform Admin có thể xem danh sách khách hàng/tenant.

#### Actor

- Platform Admin

#### Dữ liệu hiển thị

- Tenant name
- Slug
- Industry
- Owner email
- Subscription plan
- Subscription status
- Website status
- Created at
- Updated at

#### Filter/Search

- Tìm theo tên tenant.
- Tìm theo email owner.
- Filter theo status:
  - active
  - trial
  - suspended
  - cancelled

#### Acceptance Criteria

- Admin xem được danh sách tenant.
- Có phân trang.
- Có search theo tên/email.
- Click tenant để vào detail.

---

### FR-TENANT-002 — Tạo tenant

#### Mô tả

Platform Admin tạo tenant mới.

#### Actor

- Platform Admin

#### Input

- Tenant name
- Industry
- Owner full name
- Owner email
- Owner phone
- Slug/subdomain
- Subscription plan
- Template

#### Validation

- Tenant name bắt buộc.
- Owner email bắt buộc và đúng format.
- Slug bắt buộc.
- Slug chỉ chứa chữ thường, số và dấu gạch ngang.
- Slug không được trùng.
- Template bắt buộc.
- Owner email không được trùng trong cùng tenant.
- Plan bắt buộc.

#### Xử lý

1. Validate input.
2. Tạo tenant.
3. Tạo owner user.
4. Tạo site.
5. Tạo default pages.
6. Tạo default blocks từ template.
7. Gán subdomain.
8. Set trạng thái site là draft.
9. Set subscription status là trial hoặc active.

#### Acceptance Criteria

- Tạo tenant thành công.
- Tạo user owner thành công.
- Tạo site mặc định thành công.
- Subdomain không bị trùng.
- Tenant mới xuất hiện trong danh sách.

---

### FR-TENANT-003 — Cập nhật tenant

#### Mô tả

Platform Admin cập nhật thông tin tenant.

#### Actor

- Platform Admin

#### Input

- Tenant name
- Industry
- Owner phone
- Subscription plan
- Subscription status
- Note nội bộ

#### Acceptance Criteria

- Thay đổi được lưu.
- Không ảnh hưởng dữ liệu website hiện có.
- Tenant suspended thì website public bị tạm ngưng.

---

### FR-TENANT-004 — Suspend tenant

#### Mô tả

Platform Admin có thể tạm ngưng tenant.

#### Actor

- Platform Admin

#### Xử lý

1. Admin đổi status tenant sang suspended.
2. Customer Owner không thể publish website.
3. Public website hiển thị trang tạm ngưng.
4. Lead form không hoạt động.

#### Acceptance Criteria

- Tenant suspended không hiển thị website bình thường.
- Customer Owner vẫn có thể đăng nhập CMS nhưng không publish được.
- Public Visitor thấy thông báo website tạm ngưng.

---

## 7.3. Site Management

### FR-SITE-001 — Xem thông tin site

#### Mô tả

Platform Admin và Customer Owner có thể xem thông tin website.

#### Actor

- Platform Admin
- Customer Owner

#### Dữ liệu hiển thị

- Site name
- Site slug
- Template
- Status:
  - draft
  - published
  - unpublished
- Primary domain
- Subdomain
- Last published at
- Created at
- Updated at

#### Acceptance Criteria

- Customer Owner chỉ xem được site thuộc tenant của mình.
- Platform Admin xem được tất cả site.

---

### FR-SITE-002 — Cập nhật thông tin site

#### Mô tả

Customer Owner có thể cập nhật thông tin cơ bản của site.

#### Actor

- Customer Owner
- Platform Admin

#### Input

- Site name
- Business name
- Short description
- Logo
- Primary color
- Secondary color
- Font style preset

#### Validation

- Business name bắt buộc.
- Logo chỉ nhận jpg, png, webp, svg.
- Primary color phải là mã màu hợp lệ.
- Font style chỉ được chọn từ preset.

#### Acceptance Criteria

- Lưu được thông tin site.
- Public website dùng màu/logo mới sau khi publish.
- Preview hiển thị ngay dữ liệu draft.

---

### FR-SITE-003 — Preview website

#### Mô tả

Customer Owner có thể preview website trước khi publish.

#### Actor

- Customer Owner
- Platform Admin

#### Xử lý

1. User bấm Preview.
2. Hệ thống mở preview URL.
3. Preview sử dụng draft data mới nhất.
4. Preview không index bởi search engine.

#### Acceptance Criteria

- Preview hiển thị đúng nội dung draft.
- Preview URL chỉ user đã đăng nhập mới xem được.
- Public Visitor không truy cập được preview nếu không có quyền.

---

### FR-SITE-004 — Publish website

#### Mô tả

Customer Owner publish nội dung website.

#### Actor

- Customer Owner
- Platform Admin

#### Điều kiện

- Tenant phải active hoặc trial.
- Site phải có tối thiểu:
  - Business name
  - Contact phone
  - Ít nhất 1 service
  - Ít nhất 1 hero block
  - SEO title

#### Xử lý

1. Validate điều kiện publish.
2. Copy draft content sang published content.
3. Set site status = published.
4. Ghi nhận last_published_at.
5. Public website hiển thị nội dung mới.

#### Acceptance Criteria

- Website public hiển thị sau khi publish.
- Nếu thiếu thông tin bắt buộc, hệ thống báo lỗi rõ ràng.
- Publish không làm mất dữ liệu draft.

---

### FR-SITE-005 — Unpublish website

#### Mô tả

Customer Owner hoặc Platform Admin có thể tắt public website.

#### Actor

- Customer Owner
- Platform Admin

#### Xử lý

1. User bấm Unpublish.
2. Hệ thống set status = unpublished.
3. Public website hiển thị trang `Website đang tạm ngưng`.

#### Acceptance Criteria

- Website không hiển thị nội dung public sau khi unpublish.
- Dữ liệu website không bị xóa.

---

## 7.4. Template Management

### FR-TEMPLATE-001 — Template cố định

#### Mô tả

MVP cung cấp danh sách template cố định.

#### Template MVP

- Spa / Salon
- Education / Training Center
- Service Company

#### Dữ liệu template

Mỗi template gồm:

- Template name
- Industry
- Thumbnail
- Default color palette
- Default page structure
- Default block structure
- Default sample content

#### Acceptance Criteria

- Khi tạo site, admin chọn được template.
- Website được tạo với block mặc định từ template.
- Customer Owner có thể chỉnh nội dung nhưng không chỉnh cấu trúc layout quá sâu.

---

### FR-TEMPLATE-002 — Chọn template khi tạo site

#### Mô tả

Platform Admin chọn template ban đầu cho website.

#### Actor

- Platform Admin

#### Acceptance Criteria

- Template được áp dụng vào site mới.
- Các block mặc định được tạo đầy đủ.
- Template không thể đổi tự do trong MVP sau khi site đã tạo, trừ khi Platform Admin reset site.

---

## 7.5. Page Management

### FR-PAGE-001 — Danh sách page

#### Mô tả

Customer Owner xem danh sách page trong CMS.

#### Page mặc định MVP

- Home
- Services
- Gallery
- Contact

#### Dữ liệu hiển thị

- Page title
- Slug
- Status
- SEO title
- Updated at

#### Acceptance Criteria

- Customer Owner xem được page thuộc site của mình.
- Không tạo page mới trong MVP, chỉ chỉnh page có sẵn.
- Platform Admin có thể xem tất cả page của site.

---

### FR-PAGE-002 — Chỉnh SEO page

#### Mô tả

Customer Owner có thể chỉnh SEO cơ bản cho từng page.

#### Input

- SEO title
- SEO description
- OG image
- Noindex flag

#### Validation

- SEO title tối đa 70 ký tự.
- SEO description tối đa 160 ký tự.
- OG image phải là ảnh hợp lệ.
- Nếu để trống, hệ thống dùng default từ site.

#### Acceptance Criteria

- SEO metadata được lưu.
- Public page render đúng meta title/description.
- OG image hiển thị trong metadata.

---

## 7.6. Block Management

### FR-BLOCK-001 — Quản lý block trang chủ

#### Mô tả

Customer Owner có thể chỉnh các block cố định của trang chủ.

#### Block MVP

1. Hero
2. About
3. Services Highlight
4. Price Highlight
5. Gallery Preview
6. Testimonials
7. FAQ
8. Contact CTA
9. Map
10. Footer

#### Chức năng

- Bật/tắt block.
- Chỉnh nội dung block.
- Upload ảnh cho block.
- Sắp xếp thứ tự block ở mức giới hạn.
- Preview block.

#### Acceptance Criteria

- Block có thể bật/tắt.
- Block bị tắt không hiển thị trên public website.
- Nội dung block lưu dạng draft.
- Sau publish, public website hiển thị block mới.

---

### FR-BLOCK-002 — Hero Block

#### Mô tả

Hero block là banner đầu trang.

#### Fields

- Title
- Subtitle
- Background image
- Primary button text
- Primary button action:
  - Call phone
  - Open Zalo
  - Scroll to contact form
  - Open Facebook
- Secondary button text
- Secondary button action
- Badge text
- Overlay style

#### Validation

- Title bắt buộc.
- Title tối đa 120 ký tự.
- Subtitle tối đa 300 ký tự.
- Background image optional.
- Button action phải hợp lệ.

#### Acceptance Criteria

- Hero hiển thị đẹp trên mobile.
- Button hoạt động đúng action.
- Nếu không có ảnh, dùng background màu theo template.

---

### FR-BLOCK-003 — About Block

#### Mô tả

Block giới thiệu doanh nghiệp.

#### Fields

- Section title
- Description
- Image
- Highlight items

#### Highlight item

- Icon preset
- Title
- Description

#### Acceptance Criteria

- Hiển thị section giới thiệu.
- Có thể thêm tối đa 4 highlight item.
- Có thể dùng AI để sinh description.

---

### FR-BLOCK-004 — Services Highlight Block

#### Mô tả

Block hiển thị một số dịch vụ nổi bật.

#### Fields

- Section title
- Section description
- Selected services
- Button text
- Button action

#### Acceptance Criteria

- Hiển thị tối đa 6 dịch vụ nổi bật.
- Dịch vụ lấy từ Service Management.
- Nếu không có dịch vụ, block không hiển thị hoặc hiển thị empty state trong preview.

---

### FR-BLOCK-005 — Price Highlight Block

#### Mô tả

Block hiển thị bảng giá nổi bật.

#### Fields

- Section title
- Section description
- Selected price items

#### Acceptance Criteria

- Hiển thị giá theo format tiền Việt Nam.
- Cho phép hiển thị `Liên hệ` nếu không nhập giá.
- Dữ liệu lấy từ Price Management.

---

### FR-BLOCK-006 — Gallery Preview Block

#### Mô tả

Block hiển thị ảnh nổi bật.

#### Fields

- Section title
- Selected images

#### Acceptance Criteria

- Hiển thị ảnh dạng grid.
- Tối đa 8 ảnh trên homepage.
- Click ảnh có thể mở modal xem ảnh lớn.

---

### FR-BLOCK-007 — Testimonials Block

#### Mô tả

Block hiển thị feedback khách hàng.

#### Fields

- Section title
- List testimonial:
  - Customer name
  - Rating
  - Comment
  - Avatar optional

#### Acceptance Criteria

- Rating từ 1 đến 5.
- Có thể thêm tối đa 10 testimonial.
- Hiển thị tối đa 3–6 testimonial trên homepage tùy template.

---

### FR-BLOCK-008 — FAQ Block

#### Mô tả

Block hiển thị câu hỏi thường gặp.

#### Fields

- Section title
- FAQ list:
  - Question
  - Answer

#### Acceptance Criteria

- Có thể thêm/sửa/xóa FAQ.
- FAQ hiển thị dạng accordion.
- Có thể dùng AI để sinh FAQ.

---

### FR-BLOCK-009 — Contact CTA Block

#### Mô tả

Block kêu gọi người dùng liên hệ.

#### Fields

- Title
- Description
- Button text
- Button action
- Show contact form flag

#### Acceptance Criteria

- Nếu show contact form = true, form liên hệ hiển thị trong block.
- Button call/Zalo/Facebook hoạt động đúng.

---

### FR-BLOCK-010 — Map Block

#### Mô tả

Block hiển thị địa chỉ và Google Map.

#### Fields

- Address text
- Google Map embed URL
- Opening hours
- Parking note optional

#### Acceptance Criteria

- Google Map embed hiển thị đúng.
- Nếu không có embed URL, hiển thị địa chỉ dạng text.
- Opening hours hiển thị rõ ràng.

---

## 7.7. Brand & Contact Settings

### FR-BRAND-001 — Cập nhật thương hiệu

#### Mô tả

Customer Owner cập nhật thông tin thương hiệu.

#### Fields

- Business name
- Logo
- Favicon
- Primary color
- Secondary color
- Brand slogan
- Industry
- Short description

#### Acceptance Criteria

- Logo hiển thị trên website.
- Favicon hiển thị trên browser tab.
- Màu thương hiệu áp dụng cho button/link/highlight.
- Không cho nhập CSS tùy ý trong MVP.

---

### FR-CONTACT-001 — Cập nhật thông tin liên hệ

#### Mô tả

Customer Owner cập nhật thông tin liên hệ.

#### Fields

- Phone number
- Email
- Zalo URL hoặc Zalo phone
- Facebook URL
- TikTok URL optional
- Instagram URL optional
- Address
- Google Map embed URL
- Opening hours

#### Validation

- Phone bắt buộc.
- Email optional nhưng nếu nhập phải đúng format.
- URL social phải đúng format URL.
- Google Map embed URL optional.

#### Acceptance Criteria

- Public website hiển thị thông tin liên hệ.
- Nút gọi điện dùng `tel:`.
- Nút email dùng `mailto:`.
- Nút Zalo/Facebook mở đúng link.

---

## 7.8. Service Management

### FR-SERVICE-001 — Danh sách dịch vụ

#### Mô tả

Customer Owner quản lý danh sách dịch vụ của doanh nghiệp.

#### Actor

- Customer Owner
- Platform Admin

#### Dữ liệu hiển thị

- Service name
- Short description
- Price display
- Image
- Status
- Sort order

#### Acceptance Criteria

- Customer Owner xem được danh sách dịch vụ của site mình.
- Có phân trang hoặc list đơn giản.
- Có thể sắp xếp thứ tự.

---

### FR-SERVICE-002 — Tạo dịch vụ

#### Mô tả

Customer Owner tạo dịch vụ mới.

#### Fields

- Service name
- Short description
- Long description
- Image
- Price type:
  - fixed
  - from
  - range
  - contact
- Price min
- Price max
- Duration optional
- Is featured
- Status

#### Validation

- Service name bắt buộc.
- Service name tối đa 120 ký tự.
- Short description tối đa 300 ký tự.
- Nếu price type = fixed thì price min bắt buộc.
- Nếu price type = range thì price min và price max bắt buộc.
- Price max phải lớn hơn hoặc bằng price min.
- Status gồm active/inactive.

#### Acceptance Criteria

- Tạo dịch vụ thành công.
- Dịch vụ active hiển thị trên website.
- Dịch vụ inactive không hiển thị public.
- Có thể dùng AI để gợi ý mô tả dịch vụ.

---

### FR-SERVICE-003 — Cập nhật dịch vụ

#### Mô tả

Customer Owner cập nhật dịch vụ.

#### Acceptance Criteria

- Cập nhật được thông tin.
- Public website chỉ thay đổi sau khi publish.
- Không ảnh hưởng lead cũ.

---

### FR-SERVICE-004 — Xóa dịch vụ

#### Mô tả

Customer Owner có thể xóa hoặc archive dịch vụ.

#### Quy tắc MVP

Nên dùng soft delete/archive thay vì hard delete.

#### Acceptance Criteria

- Dịch vụ đã archive không hiển thị public.
- Dữ liệu vẫn còn trong database.
- Có thể restore bởi Platform Admin nếu cần.

---

## 7.9. Price Management

### FR-PRICE-001 — Quản lý bảng giá

#### Mô tả

Customer Owner quản lý bảng giá dịch vụ/sản phẩm.

#### Fields

- Item name
- Description
- Price type
- Price min
- Price max
- Unit
- Note
- Is featured
- Sort order
- Status

#### Acceptance Criteria

- Hiển thị bảng giá trên website.
- Format tiền Việt Nam rõ ràng.
- Có thể hiển thị `Từ 500.000đ`, `500.000đ - 1.000.000đ`, hoặc `Liên hệ`.
- Có thể bật/tắt từng item.

---

## 7.10. Gallery Management

### FR-GALLERY-001 — Upload ảnh

#### Mô tả

Customer Owner upload ảnh cho website.

#### Actor

- Customer Owner
- Platform Admin

#### File hỗ trợ

- jpg
- jpeg
- png
- webp

#### Giới hạn MVP

- Dung lượng tối đa mỗi ảnh: 5 MB.
- Mỗi site tối đa 100 ảnh trong MVP.
- Không upload video trong MVP.

#### Xử lý

1. User chọn file.
2. Hệ thống validate file type.
3. Hệ thống validate file size.
4. Hệ thống upload file lên object storage.
5. Hệ thống lưu metadata vào database.

#### Metadata

- Original filename
- Storage URL/path
- Mime type
- Size
- Width
- Height
- Alt text
- Created at

#### Acceptance Criteria

- Upload ảnh thành công.
- Ảnh hiển thị trong CMS.
- Ảnh có thể dùng trong block/service/gallery.
- File không hợp lệ bị từ chối.

---

### FR-GALLERY-002 — Quản lý gallery

#### Mô tả

Customer Owner quản lý danh sách ảnh hiển thị trên public website.

#### Chức năng

- Chọn ảnh từ media library.
- Sắp xếp thứ tự ảnh.
- Nhập caption.
- Nhập alt text.
- Bật/tắt ảnh.

#### Acceptance Criteria

- Gallery public hiển thị đúng thứ tự.
- Ảnh inactive không hiển thị.
- Alt text render trong thẻ image.

---

## 7.11. Lead Management

### FR-LEAD-001 — Public Visitor gửi form liên hệ

#### Mô tả

Public Visitor gửi thông tin liên hệ qua website.

#### Fields

- Full name
- Phone
- Email optional
- Message
- Interested service optional

#### Validation

- Full name bắt buộc.
- Phone bắt buộc.
- Phone phải hợp lệ ở mức cơ bản.
- Email optional nhưng nếu nhập phải đúng format.
- Message tối đa 1000 ký tự.
- Chặn spam cơ bản.

#### Chống spam MVP

- Honeypot field.
- Rate limit theo IP.
- Không cho submit quá nhanh dưới 2 giây sau khi page load.
- Optional: Turnstile/Captcha nếu cần.

#### Xử lý

1. Validate input.
2. Kiểm tra site có published không.
3. Kiểm tra tenant có active không.
4. Lưu lead.
5. Hiển thị thông báo thành công.

#### Acceptance Criteria

- Lead hợp lệ được lưu.
- Lead spam cơ bản bị chặn.
- Customer Owner xem được lead trong CMS.
- Public Visitor nhận thông báo gửi thành công.

---

### FR-LEAD-002 — Danh sách lead trong CMS

#### Mô tả

Customer Owner xem danh sách lead.

#### Dữ liệu hiển thị

- Full name
- Phone
- Email
- Message preview
- Interested service
- Status
- Created at

#### Status lead

- new
- contacted
- won
- lost
- spam

#### Filter/Search

- Search theo tên/số điện thoại.
- Filter theo status.
- Filter theo ngày.

#### Acceptance Criteria

- Customer Owner chỉ thấy lead của site mình.
- Có thể đổi trạng thái lead.
- Có thể xem chi tiết lead.
- Có phân trang.

---

### FR-LEAD-003 — Chi tiết lead

#### Mô tả

Customer Owner xem chi tiết lead.

#### Dữ liệu hiển thị

- Full name
- Phone
- Email
- Message
- Interested service
- Source page
- IP address masked
- User agent optional
- Status
- Internal note
- Created at
- Updated at

#### Acceptance Criteria

- Xem được đầy đủ thông tin lead.
- Có thể cập nhật status.
- Có thể thêm internal note.

---

## 7.12. Domain & Subdomain

### FR-DOMAIN-001 — Subdomain mặc định

#### Mô tả

Mỗi website có subdomain mặc định.

#### Format

```text
{slug}.yourdomain.vn
```

#### Validation slug

- Chỉ chữ thường `a-z`.
- Chỉ số `0-9`.
- Cho phép dấu gạch ngang `-`.
- Không bắt đầu hoặc kết thúc bằng `-`.
- Độ dài 3–50 ký tự.
- Không trùng với slug đã tồn tại.
- Không dùng reserved words.

#### Reserved words ví dụ

- admin
- api
- app
- cms
- www
- static
- assets
- support
- billing
- login
- logout
- root

#### Acceptance Criteria

- Subdomain route được đúng tenant.
- Slug trùng bị từ chối.
- Slug không hợp lệ bị từ chối.

---

### FR-DOMAIN-002 — Custom domain thủ công

#### Mô tả

Platform Admin có thể gán custom domain cho website.

#### MVP approach

Custom domain được cấu hình thủ công bởi Platform Admin. Hệ thống chỉ lưu domain và trạng thái verify.

#### Fields

- Domain
- Tenant
- Site
- Status:
  - pending
  - active
  - failed
- Is primary

#### Acceptance Criteria

- Platform Admin thêm được custom domain.
- Public website route đúng domain nếu domain active.
- Customer Owner không tự cấu hình DNS trong MVP.
- Custom domain chưa active không được dùng làm primary.

---

## 7.13. AI Content Assistant

### FR-AI-001 — Sinh mô tả doanh nghiệp

#### Mô tả

Customer Owner có thể dùng AI để sinh mô tả doanh nghiệp.

#### Input

- Business name
- Industry
- Location
- Services
- Tone:
  - professional
  - friendly
  - premium
  - simple

#### Output

- Short introduction
- Long introduction
- Hero title suggestion
- Hero subtitle suggestion

#### Acceptance Criteria

- AI trả về nội dung tiếng Việt.
- User có thể áp dụng nội dung vào field.
- User có thể chỉnh sửa trước khi lưu.
- AI output không tự động publish.

---

### FR-AI-002 — Sinh mô tả dịch vụ

#### Mô tả

Customer Owner có thể dùng AI để sinh mô tả dịch vụ.

#### Input

- Service name
- Short notes
- Target customer
- Tone

#### Output

- Short description
- Long description
- Benefit bullets

#### Acceptance Criteria

- Output phù hợp dịch vụ.
- User có thể áp dụng vào form tạo/sửa service.
- Có log số lần sử dụng AI.

---

### FR-AI-003 — Sinh FAQ

#### Mô tả

Customer Owner có thể dùng AI để sinh FAQ cho website.

#### Input

- Industry
- Service list
- Business location
- Special notes

#### Output

- 5–10 FAQ items.

#### Acceptance Criteria

- FAQ gồm question và answer.
- User có thể chọn FAQ nào muốn áp dụng.
- Không ghi đè FAQ cũ nếu user chưa xác nhận.

---

### FR-AI-004 — Sinh SEO metadata

#### Mô tả

Customer Owner có thể dùng AI để gợi ý SEO title/description.

#### Input

- Page type
- Business name
- Industry
- Location
- Main services

#### Output

- SEO title
- SEO description
- Suggested keywords

#### Acceptance Criteria

- SEO title không quá 70 ký tự.
- SEO description không quá 160 ký tự.
- User có thể áp dụng hoặc bỏ qua.

---

## 7.14. Subscription Management

### FR-SUB-001 — Quản lý gói thủ công

#### Mô tả

Platform Admin quản lý gói thuê bao của tenant thủ công.

#### Fields

- Plan:
  - basic
  - standard
  - pro
- Status:
  - trial
  - active
  - past_due
  - suspended
  - cancelled
- Start date
- End date
- Internal note

#### Acceptance Criteria

- Platform Admin cập nhật được plan/status.
- Tenant suspended thì website public bị tạm ngưng.
- Không tích hợp thanh toán tự động trong MVP.

---

### FR-SUB-002 — Giới hạn theo gói

#### Mô tả

Hệ thống áp dụng một số giới hạn đơn giản theo gói.

#### Basic

- 1 website
- 4 page cố định
- Tối đa 20 ảnh
- Tối đa 10 dịch vụ
- Subdomain mặc định
- Không custom domain

#### Standard

- 1 website
- 4 page cố định
- Tối đa 100 ảnh
- Tối đa 50 dịch vụ
- Custom domain thủ công
- SEO cơ bản

#### Pro

- 1 website
- 4 page cố định
- Tối đa 300 ảnh
- Tối đa 100 dịch vụ
- Custom domain
- Lead management đầy đủ
- AI quota cao hơn

#### Acceptance Criteria

- Hệ thống kiểm tra giới hạn khi upload ảnh/tạo dịch vụ.
- Nếu vượt giới hạn, hiển thị thông báo nâng cấp gói.
- Platform Admin có thể override giới hạn nếu cần.

---

## 7.15. Public Website Rendering

### FR-PUBLIC-001 — Route public website theo subdomain

#### Mô tả

Hệ thống xác định tenant/site dựa trên hostname.

#### Ví dụ

- `abc.yourdomain.vn` → tenant abc
- `spa-demo.yourdomain.vn` → tenant spa-demo

#### Xử lý

1. Lấy hostname từ request.
2. Tìm domain/subdomain tương ứng.
3. Kiểm tra tenant status.
4. Kiểm tra site status.
5. Render website nếu hợp lệ.
6. Nếu không hợp lệ, render error page phù hợp.

#### Error case

- Domain không tồn tại → 404.
- Tenant suspended → suspended page.
- Site unpublished → unpublished page.
- Site draft → 404 hoặc coming soon page.

#### Acceptance Criteria

- Hostname route đúng site.
- Không leak dữ liệu tenant khác.
- Public page chỉ dùng published content.

---

### FR-PUBLIC-002 — Responsive website

#### Mô tả

Website public phải hiển thị tốt trên mobile, tablet và desktop.

#### Breakpoints gợi ý

- Mobile: `< 640px`
- Tablet: `640px–1024px`
- Desktop: `> 1024px`

#### Acceptance Criteria

- Không vỡ layout trên mobile.
- Button dễ bấm trên mobile.
- Ảnh tự co giãn.
- Font dễ đọc.
- Form liên hệ dễ nhập.

---

### FR-PUBLIC-003 — SEO cơ bản

#### Mô tả

Public website render metadata cơ bản.

#### Metadata

- Page title
- Meta description
- Canonical URL
- Open Graph title
- Open Graph description
- Open Graph image
- Robots meta
- Sitemap basic
- Robots.txt basic

#### Acceptance Criteria

- View source có title/description.
- OG metadata có dữ liệu.
- Sitemap chứa các page public.
- Page unpublished không có trong sitemap.

---

## 7.16. Notification MVP

### FR-NOTI-001 — Thông báo lead mới qua email

#### Mô tả

Khi có lead mới, hệ thống có thể gửi email thông báo cho Customer Owner.

#### MVP level

Tính năng này là P1. Có thể triển khai sau form lead nếu thời gian hạn chế.

#### Nội dung email

- Tên người gửi
- Số điện thoại
- Email
- Nội dung
- Link vào CMS xem lead

#### Acceptance Criteria

- Email gửi đúng owner.
- Email không chứa thông tin tenant khác.
- Nếu email gửi lỗi, lead vẫn được lưu.

---

## 7.17. Audit Log

### FR-AUDIT-001 — Ghi log thao tác quan trọng

#### Mô tả

Hệ thống ghi lại các thao tác quan trọng.

#### Event cần log

- Login success/failure
- Create tenant
- Update tenant
- Suspend tenant
- Create site
- Publish site
- Unpublish site
- Update domain
- Create lead
- Update lead status
- AI generation

#### Fields

- Actor user id
- Tenant id
- Action
- Entity type
- Entity id
- Metadata JSON
- IP address
- Created at

#### Acceptance Criteria

- Có log cho thao tác publish/unpublish.
- Có log khi tenant bị suspended.
- Platform Admin có thể xem audit log cơ bản ở tenant detail hoặc qua database trong MVP.

---

## 8. Màn hình MVP

## 8.1. Platform Admin Screens

### ADM-001 — Login

#### URL

`/admin/login`

#### Thành phần

- Email input
- Password input
- Login button
- Error message

---

### ADM-002 — Admin Dashboard

#### URL

`/admin`

#### Thành phần

- Tổng số tenant
- Tổng số website published
- Tổng số lead mới
- Tenant gần đây
- Website cần hỗ trợ

---

### ADM-003 — Tenant List

#### URL

`/admin/tenants`

#### Thành phần

- Search box
- Filter status
- Table tenant
- Button create tenant
- Pagination

#### Table columns

- Tenant name
- Slug
- Industry
- Owner email
- Plan
- Status
- Site status
- Created at
- Action

---

### ADM-004 — Create Tenant

#### URL

`/admin/tenants/new`

#### Form

- Tenant name
- Industry
- Owner full name
- Owner email
- Owner phone
- Slug
- Plan
- Template
- Initial password mode:
  - Generate automatically
  - Enter manually

#### Button

- Create tenant
- Cancel

---

### ADM-005 — Tenant Detail

#### URL

`/admin/tenants/{tenantId}`

#### Sections

- Tenant information
- Owner account
- Subscription
- Website information
- Domains
- Recent leads
- Internal notes
- Audit log

#### Actions

- Edit tenant
- Suspend tenant
- Reactivate tenant
- Reset owner password
- Open CMS as support
- Open public website

---

### ADM-006 — Domain Management

#### URL

`/admin/tenants/{tenantId}/domains`

#### Chức năng

- View subdomain
- Add custom domain
- Mark domain active
- Set primary domain
- Remove domain

---

### ADM-007 — All Leads

#### URL

`/admin/leads`

#### Chức năng

- Xem lead tất cả tenant
- Filter theo tenant
- Filter theo status
- Search phone/email
- View lead detail

---

## 8.2. Customer CMS Screens

### CMS-001 — Login

#### URL

`/cms/login`

#### Thành phần

- Email input
- Password input
- Login button
- Error message

---

### CMS-002 — Dashboard

#### URL

`/cms`

#### Thành phần

- Website status
- Public URL
- Last published at
- Lead mới
- Quick actions:
  - Edit homepage
  - Manage services
  - Manage gallery
  - View leads
  - Preview
  - Publish

---

### CMS-003 — Brand Settings

#### URL

`/cms/settings/brand`

#### Form

- Business name
- Logo upload
- Favicon upload
- Slogan
- Short description
- Primary color
- Secondary color
- Industry

---

### CMS-004 — Contact Settings

#### URL

`/cms/settings/contact`

#### Form

- Phone
- Email
- Zalo
- Facebook
- Address
- Google Map embed
- Opening hours

---

### CMS-005 — Homepage Editor

#### URL

`/cms/pages/home`

#### Thành phần

- List block
- Toggle block visible
- Edit block content
- Preview block
- Save draft
- Preview site
- Publish site

#### Block editor

- Hero
- About
- Services Highlight
- Price Highlight
- Gallery Preview
- Testimonials
- FAQ
- Contact CTA
- Map
- Footer

---

### CMS-006 — Services List

#### URL

`/cms/services`

#### Thành phần

- Table/list service
- Search
- Add service button
- Edit button
- Archive button
- Sort order

---

### CMS-007 — Service Form

#### URL

`/cms/services/new`

`/cms/services/{serviceId}/edit`

#### Form

- Service name
- Short description
- Long description
- Image
- Price type
- Price min
- Price max
- Duration
- Featured
- Status

#### AI action

- Generate description
- Improve text

---

### CMS-008 — Price List

#### URL

`/cms/prices`

#### Chức năng

- Add price item
- Edit price item
- Archive price item
- Sort item
- Toggle featured

---

### CMS-009 — Gallery

#### URL

`/cms/gallery`

#### Chức năng

- Upload image
- View image library
- Edit caption
- Edit alt text
- Delete/archive image
- Select images for public gallery

---

### CMS-010 — FAQ

#### URL

`/cms/faq`

#### Chức năng

- Add FAQ
- Edit FAQ
- Delete FAQ
- Sort FAQ
- Generate FAQ by AI

---

### CMS-011 — Leads

#### URL

`/cms/leads`

#### Chức năng

- View lead list
- Search
- Filter status
- Update status
- View detail
- Add note

---

### CMS-012 — SEO Settings

#### URL

`/cms/seo`

#### Chức năng

- Edit site default title
- Edit site default description
- Edit OG image
- Generate SEO suggestion by AI

---

### CMS-013 — Preview

#### URL

`/cms/preview`

#### Chức năng

- Preview draft site
- Switch device preview:
  - Mobile
  - Tablet
  - Desktop
- Button publish

---

## 8.3. Public Website Screens

### WEB-001 — Home Page

#### URL

`https://{slug}.yourdomain.vn/`

#### Thành phần

- Header
- Hero
- About
- Services highlight
- Price highlight
- Gallery preview
- Testimonials
- FAQ
- Contact CTA
- Map
- Footer

---

### WEB-002 — Services Page

#### URL

`/services`

#### Thành phần

- Service list
- Service detail modal hoặc detail section
- Contact CTA

---

### WEB-003 — Gallery Page

#### URL

`/gallery`

#### Thành phần

- Image grid
- Image modal
- Caption

---

### WEB-004 — Contact Page

#### URL

`/contact`

#### Thành phần

- Contact information
- Contact form
- Google Map
- Opening hours
- Social links

---

### WEB-005 — Suspended Page

#### Điều kiện

Tenant suspended hoặc subscription cancelled.

#### Nội dung

- `Website hiện đang tạm ngưng.`
- Không hiển thị thông tin chi tiết của doanh nghiệp nếu không cần.

---

### WEB-006 — Unpublished Page

#### Điều kiện

Site chưa publish hoặc bị unpublish.

#### Nội dung

- `Website đang được cập nhật.`
- Không cho submit lead.

---

## 9. Yêu cầu dữ liệu

## 9.1. Database entities

### tenants

Lưu thông tin khách hàng/doanh nghiệp.

| Field | Type | Note |
|---|---|---|
| id | uuid | Primary key |
| name | string | Tên tenant |
| slug | string | Unique slug |
| industry | string | Ngành nghề |
| status | enum | trial, active, suspended, cancelled |
| plan | enum | basic, standard, pro |
| note | text | Note nội bộ |
| created_at | datetime |  |
| updated_at | datetime |  |

---

### users

Lưu tài khoản user.

| Field | Type | Note |
|---|---|---|
| id | uuid | Primary key |
| tenant_id | uuid nullable | Null nếu platform admin |
| email | string | Unique |
| password_hash | string |  |
| full_name | string |  |
| phone | string nullable |  |
| role | enum | platform_admin, customer_owner |
| status | enum | active, inactive |
| last_login_at | datetime nullable |  |
| created_at | datetime |  |
| updated_at | datetime |  |

---

### sites

Lưu thông tin website.

| Field | Type | Note |
|---|---|---|
| id | uuid | Primary key |
| tenant_id | uuid |  |
| template_id | uuid |  |
| name | string | Site name |
| business_name | string | Tên hiển thị |
| status | enum | draft, published, unpublished |
| logo_url | string nullable |  |
| favicon_url | string nullable |  |
| primary_color | string |  |
| secondary_color | string |  |
| slogan | string nullable |  |
| short_description | text nullable |  |
| last_published_at | datetime nullable |  |
| created_at | datetime |  |
| updated_at | datetime |  |

---

### domains

Lưu domain/subdomain.

| Field | Type | Note |
|---|---|---|
| id | uuid | Primary key |
| tenant_id | uuid |  |
| site_id | uuid |  |
| domain | string | abc.yourdomain.vn hoặc custom.com |
| type | enum | subdomain, custom |
| status | enum | pending, active, failed |
| is_primary | boolean |  |
| created_at | datetime |  |
| updated_at | datetime |  |

---

### templates

Lưu template.

| Field | Type | Note |
|---|---|---|
| id | uuid | Primary key |
| name | string |  |
| industry | string |  |
| thumbnail_url | string |  |
| config_json | json | Default config |
| status | enum | active, inactive |
| created_at | datetime |  |
| updated_at | datetime |  |

---

### pages

Lưu page.

| Field | Type | Note |
|---|---|---|
| id | uuid | Primary key |
| site_id | uuid |  |
| title | string |  |
| slug | string | home, services, gallery, contact |
| page_type | enum | home, services, gallery, contact |
| status | enum | active, inactive |
| seo_title | string nullable |  |
| seo_description | string nullable |  |
| og_image_url | string nullable |  |
| noindex | boolean |  |
| created_at | datetime |  |
| updated_at | datetime |  |

---

### site_blocks

Lưu block nội dung.

| Field | Type | Note |
|---|---|---|
| id | uuid | Primary key |
| site_id | uuid |  |
| page_id | uuid |  |
| block_type | string | hero, about, faq... |
| title | string nullable |  |
| data_json | json | Nội dung block |
| sort_order | int |  |
| is_visible | boolean |  |
| version_type | enum | draft, published |
| created_at | datetime |  |
| updated_at | datetime |  |

Gợi ý `data_json` cho hero:

```json
{
  "title": "Spa chăm sóc da chuyên sâu",
  "subtitle": "Tư vấn miễn phí, liệu trình cá nhân hóa",
  "backgroundImageUrl": "https://...",
  "primaryButtonText": "Liên hệ Zalo",
  "primaryButtonAction": {
    "type": "zalo",
    "value": "https://zalo.me/..."
  },
  "secondaryButtonText": "Xem dịch vụ",
  "secondaryButtonAction": {
    "type": "scroll",
    "value": "services"
  }
}
```

---

### services

Lưu dịch vụ.

| Field | Type | Note |
|---|---|---|
| id | uuid | Primary key |
| site_id | uuid |  |
| name | string |  |
| short_description | text |  |
| long_description | text nullable |  |
| image_url | string nullable |  |
| price_type | enum | fixed, from, range, contact |
| price_min | decimal nullable |  |
| price_max | decimal nullable |  |
| duration | string nullable |  |
| is_featured | boolean |  |
| status | enum | active, inactive, archived |
| sort_order | int |  |
| created_at | datetime |  |
| updated_at | datetime |  |

---

### price_items

Lưu bảng giá.

| Field | Type | Note |
|---|---|---|
| id | uuid | Primary key |
| site_id | uuid |  |
| name | string |  |
| description | text nullable |  |
| price_type | enum | fixed, from, range, contact |
| price_min | decimal nullable |  |
| price_max | decimal nullable |  |
| unit | string nullable | buổi, lần, gói... |
| note | string nullable |  |
| is_featured | boolean |  |
| status | enum | active, inactive, archived |
| sort_order | int |  |
| created_at | datetime |  |
| updated_at | datetime |  |

---

### media_assets

Lưu file/ảnh.

| Field | Type | Note |
|---|---|---|
| id | uuid | Primary key |
| tenant_id | uuid |  |
| site_id | uuid |  |
| original_filename | string |  |
| storage_path | string |  |
| public_url | string |  |
| mime_type | string |  |
| size_bytes | int |  |
| width | int nullable |  |
| height | int nullable |  |
| alt_text | string nullable |  |
| caption | string nullable |  |
| status | enum | active, archived |
| created_at | datetime |  |
| updated_at | datetime |  |

---

### leads

Lưu lead từ form liên hệ.

| Field | Type | Note |
|---|---|---|
| id | uuid | Primary key |
| tenant_id | uuid |  |
| site_id | uuid |  |
| full_name | string |  |
| phone | string |  |
| email | string nullable |  |
| message | text |  |
| interested_service_id | uuid nullable |  |
| source_page | string nullable |  |
| status | enum | new, contacted, won, lost, spam |
| internal_note | text nullable |  |
| ip_address_hash | string nullable | Không lưu IP plain nếu không cần |
| user_agent | string nullable |  |
| created_at | datetime |  |
| updated_at | datetime |  |

---

### faqs

Lưu FAQ.

| Field | Type | Note |
|---|---|---|
| id | uuid | Primary key |
| site_id | uuid |  |
| question | string |  |
| answer | text |  |
| sort_order | int |  |
| status | enum | active, inactive |
| created_at | datetime |  |
| updated_at | datetime |  |

---

### testimonials

Lưu feedback.

| Field | Type | Note |
|---|---|---|
| id | uuid | Primary key |
| site_id | uuid |  |
| customer_name | string |  |
| rating | int | 1–5 |
| comment | text |  |
| avatar_url | string nullable |  |
| status | enum | active, inactive |
| sort_order | int |  |
| created_at | datetime |  |
| updated_at | datetime |  |

---

### ai_generation_logs

Lưu log sử dụng AI.

| Field | Type | Note |
|---|---|---|
| id | uuid | Primary key |
| tenant_id | uuid |  |
| user_id | uuid |  |
| feature | string | business_intro, service_description, faq, seo |
| input_json | json | Có thể mask dữ liệu nhạy cảm |
| output_json | json |  |
| token_usage | int nullable |  |
| provider | string |  |
| created_at | datetime |  |

---

### audit_logs

Lưu audit log.

| Field | Type | Note |
|---|---|---|
| id | uuid | Primary key |
| tenant_id | uuid nullable |  |
| user_id | uuid nullable |  |
| action | string | publish_site, create_tenant... |
| entity_type | string | site, tenant, lead... |
| entity_id | uuid nullable |  |
| metadata_json | json nullable |  |
| ip_address_hash | string nullable |  |
| created_at | datetime |  |

---

## 10. API Requirements

## 10.1. Auth API

### POST `/api/auth/login`

#### Request

```json
{
  "email": "owner@example.com",
  "password": "password"
}
```

#### Response success

```json
{
  "user": {
    "id": "uuid",
    "email": "owner@example.com",
    "role": "customer_owner",
    "tenantId": "uuid"
  }
}
```

---

### POST `/api/auth/logout`

#### Response

```json
{
  "success": true
}
```

---

### GET `/api/auth/me`

#### Response

```json
{
  "user": {
    "id": "uuid",
    "email": "owner@example.com",
    "role": "customer_owner",
    "tenantId": "uuid"
  }
}
```

---

## 10.2. Platform Admin API

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/admin/tenants` | Lấy danh sách tenant |
| POST | `/api/admin/tenants` | Tạo tenant mới |
| GET | `/api/admin/tenants/{tenantId}` | Lấy chi tiết tenant |
| PATCH | `/api/admin/tenants/{tenantId}` | Cập nhật tenant |
| POST | `/api/admin/tenants/{tenantId}/suspend` | Tạm ngưng tenant |
| POST | `/api/admin/tenants/{tenantId}/reactivate` | Kích hoạt lại tenant |
| POST | `/api/admin/users/{userId}/reset-password` | Reset password |
| GET | `/api/admin/leads` | Xem toàn bộ lead |

Query của `GET /api/admin/tenants`:

- `q`
- `status`
- `page`
- `limit`

---

## 10.3. Customer CMS API

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/cms/site` | Lấy thông tin site của tenant hiện tại |
| PATCH | `/api/cms/site` | Cập nhật brand/site settings |
| GET | `/api/cms/pages` | Lấy danh sách page |
| PATCH | `/api/cms/pages/{pageId}/seo` | Cập nhật SEO page |
| GET | `/api/cms/blocks` | Lấy block draft |
| PATCH | `/api/cms/blocks/{blockId}` | Cập nhật block |
| POST | `/api/cms/site/preview` | Tạo hoặc lấy preview URL |
| POST | `/api/cms/site/publish` | Publish website |
| POST | `/api/cms/site/unpublish` | Unpublish website |
| GET | `/api/cms/services` | Lấy danh sách service |
| POST | `/api/cms/services` | Tạo service |
| PATCH | `/api/cms/services/{serviceId}` | Cập nhật service |
| DELETE | `/api/cms/services/{serviceId}` | Archive service |
| GET | `/api/cms/leads` | Lấy danh sách lead |
| GET | `/api/cms/leads/{leadId}` | Chi tiết lead |
| PATCH | `/api/cms/leads/{leadId}` | Cập nhật status/note lead |
| POST | `/api/cms/media/upload` | Upload ảnh |
| POST | `/api/cms/ai/generate` | Sinh nội dung bằng AI |

---

## 10.4. Public API

### POST `/api/public/leads`

Public Visitor gửi form liên hệ.

#### Request

```json
{
  "siteId": "uuid",
  "fullName": "Nguyễn Văn A",
  "phone": "0900000000",
  "email": "a@example.com",
  "message": "Tôi muốn tư vấn dịch vụ chăm sóc da",
  "interestedServiceId": "uuid"
}
```

#### Response

```json
{
  "success": true,
  "message": "Cảm ơn bạn, chúng tôi sẽ liên hệ lại sớm."
}
```

---

## 11. Non-functional Requirements

## 11.1. Performance

### NFR-PERF-001 — Public website load nhanh

- Public website nên đạt LCP dưới 2.5 giây trong điều kiện mạng phổ biến.
- Ảnh cần được optimize.
- Dùng lazy loading cho ảnh bên dưới fold.
- Cache public page nếu có thể.

### NFR-PERF-002 — CMS phản hồi nhanh

- Các thao tác CMS thông thường phản hồi dưới 1 giây nếu không upload file hoặc gọi AI.
- Upload ảnh có progress/loading state.
- AI generation có loading state.

---

## 11.2. Security

### NFR-SEC-001 — Tenant isolation

- Customer Owner chỉ truy cập dữ liệu của tenant mình.
- Backend phải kiểm tra tenant_id ở mọi API CMS.
- Không tin tưởng tenant_id từ client.
- Tenant lấy từ session user.

### NFR-SEC-002 — Password security

- Password phải được hash bằng thuật toán an toàn.
- Không lưu plain password.
- Password reset chỉ hiển thị password tạm thời một lần.

### NFR-SEC-003 — Session security

- Dùng HttpOnly cookie.
- Cookie nên có Secure trên production.
- Cookie nên có SameSite phù hợp.
- Session hết hạn sau thời gian cấu hình.

### NFR-SEC-004 — Upload security

- Validate mime type.
- Validate extension.
- Giới hạn dung lượng file.
- Không cho upload file thực thi.
- File public nên được lưu ở object storage.

### NFR-SEC-005 — Input validation

- Validate server-side.
- Escape dữ liệu hiển thị.
- Chống XSS ở các field rich text.
- MVP nên hạn chế rich text tự do.

### NFR-SEC-006 — Public form anti-spam

- Rate limit.
- Honeypot.
- Optional captcha.

---

## 11.3. Reliability

### NFR-REL-001 — Không mất dữ liệu khi publish

- Draft và published content nên tách biệt.
- Publish thất bại không làm mất draft.
- Có transaction khi publish.

### NFR-REL-002 — Backup

- Database production cần backup định kỳ.
- Object storage cần có chính sách backup hoặc versioning tùy chi phí.

---

## 11.4. Maintainability

### NFR-MAIN-001 — Code structure rõ ràng

Gợi ý module:

- auth
- admin
- tenant
- site
- page
- block
- service
- media
- lead
- ai
- public-renderer
- subscription

### NFR-MAIN-002 — Type safety

- Dùng TypeScript.
- Dùng schema validation như Zod.
- Dùng Prisma schema rõ ràng.

---

## 11.5. SEO

### NFR-SEO-001 — Metadata server-side

- Public website cần render metadata server-side.
- Mỗi page có title/description riêng.
- Có sitemap.xml.
- Có robots.txt.

---

## 11.6. Usability

### NFR-UX-001 — CMS đơn giản

CMS phải phù hợp với người không rành kỹ thuật.

Nguyên tắc:

- Ít menu.
- Form rõ ràng.
- Có preview.
- Có hướng dẫn ngắn.
- Không dùng thuật ngữ kỹ thuật khó hiểu.
- Có empty state dễ hiểu.
- Có confirm khi xóa/archive.

---

## 12. Tech Stack đề xuất

## 12.1. Frontend & Backend

- Next.js App Router
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Hook Form
- Zod
- Prisma
- PostgreSQL

## 12.2. Auth

Options:

- Auth.js/NextAuth
- Custom session cookie

MVP nên dùng session cookie để đơn giản.

## 12.3. Storage

Options:

- AWS S3
- Cloudflare R2
- Supabase Storage

MVP nên chọn Cloudflare R2 hoặc S3 tùy hạ tầng quen thuộc.

## 12.4. AI

Options:

- OpenAI API
- Azure OpenAI
- Gemini API

MVP cần tạo abstraction layer để sau này đổi provider.

## 12.5. Deployment

Options:

- Vercel + managed PostgreSQL
- Cloud Run + Cloud SQL
- AWS ECS + RDS

Gợi ý MVP nhanh:

- Vercel
- Neon/Supabase PostgreSQL
- Cloudflare R2

Gợi ý nếu muốn kiểm soát infra:

- Cloud Run
- Cloud SQL PostgreSQL
- Cloud Storage
- Cloudflare DNS

---

## 13. Kiến trúc hệ thống đề xuất

### 13.1. Tổng quan

```text
User Browser
   |
   | HTTPS
   v
Next.js Web App
   |
   |-- Admin Platform
   |-- Customer CMS
   |-- Public Website Renderer
   |-- API Routes / Server Actions
   |
   v
PostgreSQL
   |
   v
Object Storage
   |
   v
AI Provider
```

### 13.2. Multi-tenant routing

Public request xử lý theo hostname:

```text
spa-demo.yourdomain.vn
   ↓
Extract hostname
   ↓
Find domain in domains table
   ↓
Find site + tenant
   ↓
Check tenant status
   ↓
Check site status
   ↓
Render published content
```

CMS request xử lý theo session:

```text
Logged-in user
   ↓
Session contains user_id
   ↓
Load user
   ↓
Get tenant_id from user
   ↓
All CMS queries scoped by tenant_id/site_id
```

---

## 14. Rule xử lý draft/published

### 14.1. Nguyên tắc

- CMS chỉnh sửa vào draft.
- Public website chỉ đọc published.
- Preview website đọc draft.
- Publish copy draft sang published.

### 14.2. Cách triển khai đơn giản

Trong bảng `site_blocks`, dùng field `version_type`:

- `draft`
- `published`

Khi publish:

1. Start transaction.
2. Xóa hoặc archive published blocks cũ.
3. Copy draft blocks sang published.
4. Update published services/prices/faqs nếu cần.
5. Update site last_published_at.
6. Commit transaction.

### 14.3. Alternative

Dùng JSON snapshot:

- `draft_config_json`
- `published_config_json`

Cách này nhanh cho MVP nhưng khó query chi tiết về sau.

Khuyến nghị MVP:

- Block content dùng `site_blocks` với version.
- Services/prices/faqs có thể dùng status trực tiếp và publish đơn giản hơn.
- Nếu muốn đơn giản tối đa, public website đọc trực tiếp dữ liệu mới nhất sau publish flag, nhưng cách này kém an toàn hơn.

---

## 15. Priority MVP

### P0 — Bắt buộc có

- Auth login/logout.
- Platform Admin tạo tenant.
- Customer Owner CMS.
- Site settings.
- Contact settings.
- Homepage block editor cơ bản.
- Service management.
- Gallery upload.
- Public website render theo subdomain.
- Lead form.
- Lead list.
- Publish/unpublish.
- Tenant isolation.
- Responsive public website.

### P1 — Nên có

- AI generate business intro.
- AI generate service description.
- AI generate FAQ.
- SEO settings.
- Email notification khi có lead.
- Custom domain thủ công.
- Audit log cơ bản.

### P2 — Sau MVP

- Payment integration.
- Booking form nâng cao.
- Analytics.
- Blog.
- Multi-language.
- Template marketplace.
- Drag/drop builder.
- CRM nâng cao.
- Email campaign.
- Advanced SEO checker.

---

## 16. Tiêu chí nghiệm thu tổng thể MVP

MVP được xem là đạt khi thỏa mãn các điều kiện sau:

1. Platform Admin tạo được tenant mới.
2. Sau khi tạo tenant, hệ thống tạo được website mặc định.
3. Customer Owner đăng nhập được CMS.
4. Customer Owner chỉnh được logo, màu, thông tin liên hệ.
5. Customer Owner chỉnh được hero/about/service/gallery/FAQ.
6. Customer Owner upload được ảnh.
7. Customer Owner tạo được ít nhất một dịch vụ.
8. Customer Owner preview được website.
9. Customer Owner publish được website.
10. Public Visitor truy cập được website qua subdomain.
11. Public website hiển thị tốt trên mobile.
12. Public Visitor gửi được form liên hệ.
13. Lead được lưu vào database.
14. Customer Owner xem được lead trong CMS.
15. Customer Owner không xem được dữ liệu tenant khác.
16. Tenant suspended thì public website không còn hiển thị nội dung bình thường.
17. Website unpublished thì public website hiển thị trang tạm ngưng/cập nhật.
18. SEO title/description render đúng.
19. Upload file không hợp lệ bị chặn.
20. Form spam cơ bản bị chặn bằng rate limit/honeypot.

---

## 17. Test Cases chính

### 17.1. Auth

| ID | Test case | Expected |
|---|---|---|
| TC-AUTH-001 | Login đúng email/password | Thành công |
| TC-AUTH-002 | Login sai password | Báo lỗi |
| TC-AUTH-003 | User inactive login | Bị chặn |
| TC-AUTH-004 | Customer truy cập `/admin` | Bị chặn |
| TC-AUTH-005 | Logout | Session bị xóa |

---

### 17.2. Tenant

| ID | Test case | Expected |
|---|---|---|
| TC-TENANT-001 | Admin tạo tenant hợp lệ | Thành công |
| TC-TENANT-002 | Tạo tenant với slug trùng | Báo lỗi |
| TC-TENANT-003 | Tạo tenant với email sai format | Báo lỗi |
| TC-TENANT-004 | Suspend tenant | Public site hiển thị suspended page |
| TC-TENANT-005 | Reactivate tenant | Public site hoạt động lại nếu published |

---

### 17.3. CMS

| ID | Test case | Expected |
|---|---|---|
| TC-CMS-001 | Cập nhật brand settings | Lưu thành công |
| TC-CMS-002 | Upload ảnh hợp lệ | Thành công |
| TC-CMS-003 | Upload file `.exe` | Bị chặn |
| TC-CMS-004 | Tạo service hợp lệ | Thành công |
| TC-CMS-005 | Tạo service thiếu tên | Báo lỗi |
| TC-CMS-006 | Preview draft | Hiển thị nội dung mới |
| TC-CMS-007 | Publish site | Public website cập nhật |

---

### 17.4. Public Website

| ID | Test case | Expected |
|---|---|---|
| TC-PUBLIC-001 | Truy cập subdomain hợp lệ | Hiển thị website |
| TC-PUBLIC-002 | Truy cập subdomain không tồn tại | 404 |
| TC-PUBLIC-003 | Truy cập site unpublished | Hiển thị unpublished page |
| TC-PUBLIC-004 | Submit lead hợp lệ | Thành công |
| TC-PUBLIC-005 | Submit lead thiếu phone | Báo lỗi |
| TC-PUBLIC-006 | Submit spam nhiều lần | Bị rate limit |
| TC-PUBLIC-007 | Mobile layout | Không vỡ giao diện |

---

### 17.5. Tenant Isolation

| ID | Test case | Expected |
|---|---|---|
| TC-SEC-001 | Customer A gọi API service của tenant B | Bị chặn |
| TC-SEC-002 | Customer A xem lead tenant B | Bị chặn |
| TC-SEC-003 | Customer sửa block site khác | Bị chặn |
| TC-SEC-004 | Public hostname A không load data hostname B | Không leak data |

---

## 18. UI/UX Guideline MVP

### 18.1. Nguyên tắc CMS

- Mỗi màn hình chỉ tập trung vào một nhóm nội dung.
- Dùng ngôn ngữ dễ hiểu.
- Ưu tiên form ngắn.
- Có nút preview rõ ràng.
- Có trạng thái saved/unsaved.
- Có confirm khi publish/unpublish.
- Có empty state hướng dẫn người dùng làm gì tiếp theo.

### 18.2. Ví dụ wording

Thay vì:

> SEO Metadata

Dùng:

> Thông tin hiển thị trên Google

Thay vì:

> Hero Section

Dùng:

> Banner đầu trang

Thay vì:

> CTA

Dùng:

> Nút kêu gọi liên hệ

Thay vì:

> Publish

Có thể dùng:

> Công khai website

---

## 19. Error Handling

### 19.1. Lỗi validation

Hiển thị gần field liên quan.

Ví dụ:

- `Vui lòng nhập tên dịch vụ.`
- `Số điện thoại chưa đúng định dạng.`
- `Ảnh không được vượt quá 5 MB.`
- `Subdomain này đã được sử dụng.`

### 19.2. Lỗi server

Hiển thị message chung:

> Có lỗi xảy ra. Vui lòng thử lại sau.

Đồng thời ghi log chi tiết ở server.

### 19.3. Lỗi AI

Nếu AI provider lỗi:

> Chưa thể tạo nội dung lúc này. Bạn có thể thử lại sau hoặc tự nhập nội dung.

Không làm mất dữ liệu form hiện tại.

### 19.4. Lỗi upload

- File quá lớn.
- File không đúng định dạng.
- Upload thất bại.
- Storage unavailable.

User phải thấy lỗi rõ ràng.

---

## 20. Logging & Monitoring

### 20.1. Log cần có

- Request error log.
- Auth failure log.
- Publish failure log.
- Upload failure log.
- AI provider error log.
- Lead submit error log.

### 20.2. Metrics nên theo dõi

- Số tenant.
- Số site published.
- Số lead mỗi ngày.
- Số lỗi 5xx.
- Số lần AI generation.
- Storage usage.
- Public page response time.

---

## 21. Deployment Requirements

### 21.1. Environments

MVP nên có tối thiểu:

- Local
- Staging
- Production

### 21.2. Environment variables

Ví dụ:

```text
DATABASE_URL=
NEXT_PUBLIC_APP_URL=
PUBLIC_ROOT_DOMAIN=
SESSION_SECRET=
STORAGE_PROVIDER=
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
AI_PROVIDER=
OPENAI_API_KEY=
EMAIL_PROVIDER=
SMTP_HOST=
SMTP_USER=
SMTP_PASSWORD=
```

### 21.3. CI/CD

MVP nên có pipeline cơ bản:

1. Install dependencies.
2. Type check.
3. Lint.
4. Run test.
5. Build.
6. Deploy staging/production.

---

## 22. Roadmap triển khai đề xuất

### Phase 1 — Foundation

Mục tiêu: dựng nền tảng multi-tenant.

Tasks:

- Setup Next.js project.
- Setup database.
- Setup Prisma.
- Setup auth.
- Setup role.
- Setup tenant model.
- Setup site model.
- Setup admin layout.
- Setup CMS layout.
- Setup public route theo hostname.

Output:

- Admin login được.
- Customer login được.
- Route tenant hoạt động.

---

### Phase 2 — Admin & Tenant Creation

Mục tiêu: Admin tạo được khách hàng và website mặc định.

Tasks:

- Tenant list.
- Create tenant.
- Create owner user.
- Create site from template.
- Create default pages.
- Create default blocks.
- Tenant detail.
- Suspend/reactivate.

Output:

- Tạo tenant xong có website draft.

---

### Phase 3 — Customer CMS Core

Mục tiêu: Khách hàng chỉnh được website.

Tasks:

- Dashboard.
- Brand settings.
- Contact settings.
- Homepage block editor.
- Service management.
- FAQ management.
- Gallery upload.

Output:

- Khách hàng có thể nhập đủ nội dung cơ bản.

---

### Phase 4 — Public Website

Mục tiêu: Website public chạy được.

Tasks:

- Public renderer.
- Template components.
- Home page.
- Services page.
- Gallery page.
- Contact page.
- SEO metadata.
- Responsive UI.
- Suspended/unpublished page.

Output:

- Website public hiển thị tốt qua subdomain.

---

### Phase 5 — Lead Management

Mục tiêu: Website nhận lead.

Tasks:

- Public contact form.
- Anti-spam cơ bản.
- Save lead.
- Lead list CMS.
- Lead detail.
- Update lead status.
- Optional email notification.

Output:

- Public Visitor gửi lead, Customer Owner xem được lead.

---

### Phase 6 — AI Content Assistant

Mục tiêu: AI hỗ trợ nhập nội dung.

Tasks:

- AI provider abstraction.
- Generate business intro.
- Generate service description.
- Generate FAQ.
- Generate SEO metadata.
- AI usage log.

Output:

- CMS có nút AI hỗ trợ tạo nội dung.

---

### Phase 7 — Hardening & Release

Mục tiêu: hoàn thiện trước khi bán thử.

Tasks:

- Validate toàn bộ form.
- Tenant isolation test.
- Security review.
- Performance review public website.
- Error handling.
- Logging.
- Backup config.
- Seed demo templates.
- Create 3 demo websites.
- Prepare landing page bán dịch vụ.

Output:

- MVP có thể onboard khách thật đầu tiên.

---

## 23. Definition of Done

Một chức năng được xem là hoàn thành khi:

1. UI hoàn thành theo design hoặc wireframe.
2. API hoạt động đúng.
3. Có validation client-side và server-side.
4. Có loading state.
5. Có error state.
6. Có empty state nếu cần.
7. Có kiểm tra tenant isolation.
8. Có test case cơ bản.
9. Không có lỗi TypeScript.
10. Không có lỗi lint nghiêm trọng.
11. Hoạt động trên mobile và desktop.
12. Được kiểm tra trên staging.

---

## 24. Rủi ro và hướng xử lý

### Risk 1 — Khách trả phí thấp nhưng support nhiều

#### Mô tả

Khách hàng nhỏ có thể yêu cầu sửa nhiều nhưng trả phí thấp.

#### Giảm thiểu

- Có template cố định.
- Không nhận custom layout trong gói thấp.
- Có phí setup ban đầu.
- Giới hạn số lần hỗ trợ nội dung mỗi tháng.
- Cho khách tự chỉnh CMS.

---

### Risk 2 — Làm builder quá phức tạp

#### Mô tả

Nếu làm kéo-thả giống Wix, scope sẽ rất lớn.

#### Giảm thiểu

- MVP chỉ dùng block cố định.
- Chỉ cho bật/tắt, sửa nội dung, đổi ảnh.
- Không cho chỉnh CSS tự do.

---

### Risk 3 — Multi-tenant bị leak dữ liệu

#### Mô tả

Customer A có thể truy cập dữ liệu Customer B nếu API không kiểm tra tenant.

#### Giảm thiểu

- Mọi CMS API lấy tenant từ session.
- Không nhận tenant_id từ client.
- Viết test tenant isolation.
- Code review kỹ module authorization.

---

### Risk 4 — Website public chậm do ảnh lớn

#### Mô tả

Khách upload ảnh lớn làm public website load chậm.

#### Giảm thiểu

- Giới hạn ảnh 5 MB.
- Optimize ảnh.
- Lazy load.
- Dùng CDN/object storage.
- Generate thumbnail nếu có thời gian.

---

### Risk 5 — AI sinh nội dung kém chất lượng

#### Mô tả

AI output có thể sai hoặc không phù hợp.

#### Giảm thiểu

- AI chỉ là gợi ý.
- User phải xác nhận trước khi lưu.
- Có prompt theo ngành.
- Có tone preset.
- Không tự động publish AI content.

---

## 25. MVP Launch Checklist

Trước khi launch MVP cho khách thật, cần kiểm tra:

- Admin tạo tenant thành công.
- Customer Owner đăng nhập được.
- Customer Owner đổi password được hoặc admin reset được.
- Website publish được.
- Public subdomain hoạt động.
- Custom domain nếu có được cấu hình thủ công.
- Upload ảnh hoạt động.
- Lead form hoạt động.
- Email notification nếu có hoạt động.
- SEO metadata render đúng.
- Mobile layout ổn.
- Tenant isolation pass.
- Backup database đã bật.
- Error monitoring đã bật.
- Landing page giới thiệu dịch vụ đã có.
- Có ít nhất 3 website demo.
- Có chính sách giá.
- Có chính sách support.
- Có điều khoản tạm ngưng/hủy dịch vụ.

---

## 26. Gói giá tham khảo cho MVP

### Basic

Giá đề xuất: `99.000–149.000 VNĐ/tháng`.

Bao gồm:

- Website 1 trang hoặc 4 page cố định.
- Subdomain miễn phí.
- Tối đa 10 dịch vụ.
- Tối đa 20 ảnh.
- Form liên hệ.
- Zalo/Facebook button.

### Standard

Giá đề xuất: `199.000–299.000 VNĐ/tháng`.

Bao gồm:

- Gắn domain riêng thủ công.
- Tối đa 50 dịch vụ.
- Tối đa 100 ảnh.
- SEO cơ bản.
- Lead management.
- AI content quota cơ bản.

### Pro

Giá đề xuất: `499.000–999.000 VNĐ/tháng`.

Bao gồm:

- Landing page chạy quảng cáo.
- Nhiều block hơn.
- AI quota cao hơn.
- Báo cáo lead.
- Hỗ trợ chỉnh sửa nội dung định kỳ.

### Setup fee

Nên có phí setup ban đầu:

- `500.000–2.000.000 VNĐ/lần`.

Lý do:

- Lọc khách nghiêm túc.
- Bù công nhập nội dung ban đầu.
- Tránh khách nhỏ lẻ yêu cầu support quá nhiều.

---

## 27. Kết luận

MVP nên tập trung vào việc giúp đơn vị nhỏ có website nhanh, đẹp, rẻ và dễ quản lý.

Không nên làm builder tự do trong giai đoạn đầu. Hướng đúng là:

- Template cố định.
- CMS đơn giản.
- Public website responsive.
- Lead form.
- Subdomain.
- Publish nhanh.
- AI hỗ trợ viết nội dung.
- Platform Admin hỗ trợ setup khách hàng.

Mục tiêu kỹ thuật của MVP không phải là cạnh tranh với Wix, WordPress hay Webflow, mà là tạo một sản phẩm đủ đơn giản để bán được cho nhóm khách hàng nhỏ không muốn tự làm website và không muốn trả chi phí agency cao.

