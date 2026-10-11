<?php
require_once __DIR__ . '/config/database.php';

// Fetch active slides
$stmt = $pdo->prepare("SELECT * FROM sliders WHERE is_active = 1 ORDER BY display_order ASC");
$stmt->execute();
$slides = $stmt->fetchAll();

// Fetch active services
$stmt = $pdo->prepare("SELECT * FROM services WHERE is_active = 1 ORDER BY display_order ASC");
$stmt->execute();
$services = $stmt->fetchAll();

// Fetch approved testimonials
$stmt = $pdo->prepare("SELECT * FROM testimonials WHERE is_approved = 1 ORDER BY id DESC LIMIT 6");
$stmt->execute();
$testimonials = $stmt->fetchAll();

// Handle Contact Form Submission
$success_msg = '';
$error_msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit_enquiry'])) {
    $name = trim($_POST['name'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $service_id = trim($_POST['service_id'] ?? '');
    $consultation_type = trim($_POST['consultation_type'] ?? 'whatsapp');
    $message = trim($_POST['message'] ?? '');
    $has_consent = isset($_POST['consent']) ? 1 : 0;

    if (empty($name) || empty($phone)) {
        $error_msg = 'Kripya apna naam aur valid phone number darj karein.';
    } elseif (!$has_consent) {
        $error_msg = 'Kripya privacy consent accept karein.';
    } else {
        $ins = $pdo->prepare("INSERT INTO enquiries (name, phone, service_id, consultation_type, message, has_consent, status) VALUES (?, ?, ?, ?, ?, ?, 'new')");
        $ins->execute([$name, $phone, $service_id, $consultation_type, $message, $has_consent]);
        $success_msg = 'Shukriya! Aapki enquiry darj kar li gayi hai. Maulana Shamsuddin jald aapse rabta karenge.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maulana Shamsuddin - Dua, Wazifa & Ruhani Ilm | +91 99284 09129</title>
    <meta name="description" content="Spiritual guidance, Dua, Wazifa, Ruhani Ilm, and Taweez consultation by Maulana Shamsuddin.">
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --islamic-green: #155e3c;
            --dark-green: #0a1f14;
            --gold: #d4af37;
            --gold-light: #f5b82e;
        }
        body { font-family: 'Plus Jakarta Sans', sans-serif; color: #1c2e24; background: #f8faf9; }
        .font-heading { font-family: 'Playfair Display', serif; }
        .font-script { font-family: 'Alex Brush', cursive; }
        .top-bar { background: #0b1610; color: #f4f7f5; font-size: 12px; }
        .btn-green { background: var(--islamic-green); color: #fff; border-radius: 50px; font-weight: 600; }
        .btn-green:hover { background: #0e442a; color: #fff; }
        .btn-gold { background: var(--gold-light); color: #112417; border-radius: 50px; font-weight: 700; }
        .btn-gold:hover { background: #e0a41d; color: #112417; }
        .service-card { border-radius: 18px; border: 1px solid #e5e7eb; overflow: hidden; background: #fff; transition: transform .3s; }
        .service-card:hover { transform: translateY(-5px); box-shadow: 0 12px 24px rgba(0,0,0,0.08); }
        .hero-banner { background: #0a180f; color: #fff; min-height: 550px; display: flex; align-items: center; position: relative; }
        .floating-wa { position: fixed; bottom: 25px; right: 25px; z-index: 999; background: #25d366; color: #fff; padding: 12px 20px; border-radius: 50px; box-shadow: 0 8px 20px rgba(0,0,0,0.25); text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>

    <!-- Top Announcement Bar -->
    <div class="top-bar py-2 px-3 border-bottom border-secondary">
        <div class="container d-flex flex-wrap justify-content-between align-items-center">
            <div><span class="text-warning">✦</span> Allah Par Yaqeen Rakhiye, Har Mushkil Ka Hal Hai...</div>
            <div class="d-flex align-items-center gap-3">
                <a href="https://facebook.com" class="text-white"><i class="fab fa-facebook-f"></i></a>
                <a href="https://youtube.com" class="text-white"><i class="fab fa-youtube"></i></a>
                <a href="https://instagram.com" class="text-white"><i class="fab fa-instagram"></i></a>
                <a href="https://wa.me/919928409129" class="text-white"><i class="fab fa-whatsapp"></i></a>
                <a href="admin/login.php" class="badge bg-secondary text-decoration-none ms-2">Admin Login</a>
            </div>
        </div>
    </div>

    <!-- Navigation Header -->
    <nav class="navbar navbar-expand-lg bg-white sticky-top shadow-sm py-3">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center gap-2" href="#">
                <i class="fas fa-mosque fa-2x text-success"></i>
                <div>
                    <h3 class="m-0 font-heading fw-bold" style="color: var(--islamic-green);">Maulana Shamsuddin</h3>
                    <small class="text-muted" style="font-size: 11px;">Dua | Wazifa | Ruhani Ilm | Taweez</small>
                </div>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navMenu">
                <ul class="navbar-nav mx-auto mb-2 mb-lg-0 fw-semibold">
                    <li class="nav-item"><a class="nav-link" href="#home">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="#about">About Us</a></li>
                    <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="#process">Our Process</a></li>
                    <li class="nav-item"><a class="nav-link" href="#testimonials">Testimonials</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                </ul>
                <a href="https://wa.me/919928409129" class="btn btn-green px-4 py-2 d-flex align-items-center gap-2">
                    <i class="fas fa-phone-alt text-warning"></i>
                    <div>
                        <div class="fw-bold" style="font-size: 14px;">+91 99284 09129</div>
                        <div style="font-size: 10px; opacity: 0.8;">Call / WhatsApp</div>
                    </div>
                </a>
            </div>
        </div>
    </nav>

    <!-- Hero Slider -->
    <section id="home" class="hero-banner py-5">
        <div class="container py-4">
            <div class="row align-items-center">
                <div class="col-lg-8">
                    <p class="font-heading fst-italic text-warning fs-3 mb-2">Mohabbat Mein Pareshani?</p>
                    <h1 class="font-heading display-4 fw-bold text-warning mb-3">Dua &amp; Wazifa For Love</h1>
                    <p class="lead text-light mb-4">Kisi bhi wajah se toot rahi ho aapki mohabbat... Maulana Shamsuddin ki roohani madad se paayein apne pyaar, rishte aur sukoon ko wapas.</p>
                    <div class="d-flex flex-wrap gap-3 mb-4 text-light">
                        <span><i class="fas fa-check-circle text-warning"></i> Dua For Love</span>
                        <span><i class="fas fa-check-circle text-warning"></i> Wazifa For Love</span>
                        <span><i class="fas fa-check-circle text-warning"></i> Ruhani Ilm</span>
                        <span><i class="fas fa-check-circle text-warning"></i> Taweez</span>
                    </div>
                    <div class="d-flex flex-wrap gap-3">
                        <a href="https://wa.me/919928409129" class="btn btn-gold px-4 py-3"><i class="fab fa-whatsapp me-2"></i>Abhi Contact Karein</a>
                        <a href="tel:+919928409129" class="btn btn-green px-4 py-3"><i class="fas fa-phone-alt me-2 text-warning"></i>+91 99284 09129</a>
                    </div>
                </div>
                <div class="col-lg-4 text-end d-none d-lg-block">
                    <p class="font-script display-5 text-warning">“Pyar sirf dil se nahi, Rab ki raza se milta hai...”</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-5 bg-white">
        <div class="container py-4">
            <div class="text-center max-w-700 mx-auto mb-5">
                <div class="text-success fw-bold text-uppercase mb-1">Hamara Khas Amal</div>
                <h2 class="font-heading display-5 fw-bold" style="color: var(--dark-green);">Our Services</h2>
                <p class="text-muted">Har mushkil ka hal, har dua ka asar – Maulana Shamsuddin ke roohani amal ke saath.</p>
            </div>
            <div class="row g-4">
                <?php foreach ($services as $srv): ?>
                <div class="col-md-6 col-lg-4">
                    <div class="service-card h-100 p-4 text-center d-flex flex-column justify-content-between">
                        <div>
                            <div class="py-3 text-success"><i class="fas fa-quran fa-3x"></i></div>
                            <h4 class="font-heading fw-bold mb-2"><?= htmlspecialchars($srv['title']) ?></h4>
                            <p class="text-muted small"><?= htmlspecialchars($srv['short_description']) ?></p>
                        </div>
                        <div class="pt-3">
                            <a href="#contact" class="btn btn-green btn-sm px-4 py-2">More Details →</a>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Contact & Enquiry Section -->
    <section id="contact" class="py-5" style="background: #fafbf9;">
        <div class="container py-4">
            <div class="row g-5 align-items-center">
                <div class="col-lg-5">
                    <div class="p-4 p-md-5 rounded-4 text-white" style="background: var(--dark-green);">
                        <h3 class="font-heading fw-bold mb-3">Apni Pareshani Par Baat Karein</h3>
                        <p class="text-light small mb-4">Maulana Shamsuddin Se Sampark Karein – Har baat 100% confidential aur mehfooz rakhi jati hai.</p>
                        <div class="d-grid gap-3">
                            <a href="https://wa.me/919928409129" class="btn btn-gold py-3"><i class="fab fa-whatsapp me-2"></i>WhatsApp Par Baat Karein</a>
                            <a href="tel:+919928409129" class="btn btn-outline-light py-3"><i class="fas fa-phone-alt me-2"></i>Call: +91 99284 09129</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="bg-white p-4 p-md-5 rounded-4 shadow-sm border">
                        <h4 class="font-heading fw-bold mb-3">Consultation Enquiry Form</h4>
                        <?php if ($success_msg): ?>
                            <div class="alert alert-success"><?= htmlspecialchars($success_msg) ?></div>
                        <?php endif; ?>
                        <?php if ($error_msg): ?>
                            <div class="alert alert-danger"><?= htmlspecialchars($error_msg) ?></div>
                        <?php endif; ?>
                        <form method="POST">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label small fw-bold">Aapka Naam *</label>
                                    <input type="text" name="name" class="form-control" required placeholder="Full Name">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label small fw-bold">Mobile / WhatsApp Number *</label>
                                    <input type="tel" name="phone" class="form-control" required placeholder="+91 XXXXX XXXXX">
                                </div>
                                <div class="col-12">
                                    <label class="form-label small fw-bold">Select Service</label>
                                    <select name="service_id" class="form-select">
                                        <option value="">General Spiritual Consultation</option>
                                        <?php foreach ($services as $srv): ?>
                                            <option value="<?= htmlspecialchars($srv['slug']) ?>"><?= htmlspecialchars($srv['title']) ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label class="form-label small fw-bold">Apni Pareshani Likhein</label>
                                    <textarea name="message" rows="3" class="form-control" placeholder="Apni baat likhein..."></textarea>
                                </div>
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="consent" id="cbox" required>
                                        <label class="form-check-label small" for="cbox">Main roohani mashwara lene ke liye apni maloomat bhejne par razamand hoon.</label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button type="submit" name="submit_enquiry" class="btn btn-green px-5 py-2 fw-bold">Enquiry Submit Karein</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="text-white py-5" style="background: #05100a;">
        <div class="container">
            <div class="row g-4">
                <div class="col-md-4">
                    <h5 class="font-heading fw-bold mb-2">Maulana Shamsuddin</h5>
                    <p class="small text-muted">Dua | Wazifa | Ruhani Ilm | Taweez</p>
                    <p class="small text-secondary">Allah Taala ke fazl o karam aur sharai rehnumai se insaniyat ki khidmat.</p>
                </div>
                <div class="col-md-4">
                    <h6 class="fw-bold mb-3">Contact Us</h6>
                    <p class="small text-secondary mb-1"><i class="fas fa-phone-alt me-2 text-warning"></i> +91 99284 09129</p>
                    <p class="small text-secondary"><i class="fas fa-map-marker-alt me-2 text-warning"></i> India</p>
                </div>
                <div class="col-md-4">
                    <h6 class="fw-bold mb-3">Quick Links</h6>
                    <ul class="list-unstyled small text-secondary">
                        <li><a href="#home" class="text-secondary text-decoration-none">Home</a></li>
                        <li><a href="#services" class="text-secondary text-decoration-none">Services</a></li>
                        <li><a href="#contact" class="text-secondary text-decoration-none">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-top border-secondary mt-4 pt-3 text-center small text-secondary">
                © <?= date('Y') ?> Maulana Shamsuddin. All Rights Reserved. | Sabka Bhala, Sabka Sukoon.
            </div>
        </div>
    </footer>

    <a href="https://wa.me/919928409129" class="floating-wa"><i class="fab fa-whatsapp me-2"></i>WhatsApp Mashwara</a>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
