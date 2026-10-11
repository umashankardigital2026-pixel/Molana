# Maulana Shamsuddin - Islamic Spiritual Services Website
### Production PHP & MySQL Deployment Guide

This folder contains the complete, production-ready PHP/MySQL source code for **Maulana Shamsuddin**'s single-page spiritual services website and administrative portal.

---

## 1. Directory Structure
```
php_project/
├── config/
│   └── database.php       # PDO Database connection with prepared statements
├── admin/
│   ├── login.php          # Secure admin login with password hashing
│   ├── dashboard.php      # Analytics, KPI metrics & summary
│   ├── sliders.php        # Manage hero slider slides
│   ├── services.php       # Dynamic service management
│   ├── content.php        # Editable website copy
│   ├── testimonials.php   # Testimonials publishing & moderation
│   └── enquiries.php      # Private customer enquiry review
├── index.php              # Full public landing page (HTML5 + Bootstrap 5)
├── database.sql           # Schema definition & initial seed content
└── README.md              # Deployment guide (this file)
```

---

## 2. Server Requirements
- **PHP Version**: 7.4, 8.0, 8.1, 8.2, or 8.3+
- **PHP Extensions**: `pdo_mysql`, `mbstring`, `openssl`
- **Database**: MySQL 5.7+ or MariaDB 10.3+
- **Web Server**: Apache (`mod_rewrite` enabled) or Nginx

---

## 3. Step-by-Step Installation

### Step A: Database Setup
1. Log in to your hosting cPanel, Plesk, or phpMyAdmin.
2. Create a new MySQL database named `maulana_shamsuddin` (or your preferred name).
3. Create a MySQL user with full privileges and note down the password.
4. Import `database.sql` into your database.

### Step B: Configure Connection
Open `config/database.php` and set your credentials:
```php
$db_host = 'localhost';
$db_name = 'maulana_shamsuddin';
$db_user = 'your_mysql_username';
$db_pass = 'your_mysql_password';
```

### Step C: File Upload
Upload the contents of `php_project/` to your server's public document root (usually `public_html/` or `/var/www/html/`).

### Step D: Admin Setup
Generate an initial administrator password using PHP:
```php
echo password_hash('YourSecretPassword123!', PASSWORD_BCRYPT);
```
Insert into the `admins` table:
```sql
INSERT INTO admins (username, password_hash, email) VALUES
('admin', '$2y$10$...your_generated_hash...', 'admin@maulanashamsuddin.com');
```

---

## 4. Key Features Implemented
- **Design & Theme**: Matches the reference screenshot with Islamic green (`#155E3C`), dark green (`#0A1F14`), and gold (`#D4AF37`) accents.
- **Header**: Announcement bar, mosque logo, responsive sticky navigation, direct call buttons.
- **Hero Slider**: 3 dynamic slides with 5-second rotation and WhatsApp CTA links.
- **6 Core Services**: Dua For Love, Wazifa For Love, Ruhani Ilm, Taweez, Love Marriage, Relationship Problem.
- **About Section**: Two-column layout with 4 feature badges.
- **Why Choose Us**: 5 circular icons with subtle responsive layout.
- **Process**: 4-step horizontal guidance flow.
- **Client Testimonials**: Star ratings and authentic client reviews.
- **Contact Form**: Client and server-side validation with consent checkboxes.
- **Admin Management**: Full CRUD operations for slides, services, testimonials, enquiries, and settings.
