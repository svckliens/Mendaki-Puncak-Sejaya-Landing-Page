import { useState, useEffect, useRef } from 'react'
import './index.css'

/* NAVBAR */
function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const links = [
        { label: 'Beranda', href: '#beranda' },
        { label: 'Tentang', href: '#tentang' },
        { label: 'Layanan', href: '#layanan' },
        { label: 'Portofolio', href: '#proyek' },
        { label: 'Mitra', href: '#mitra' },
    ]

    return (
        <>
            <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
                <a href="#beranda" className="navbar__logo">
                    <img src="logo_gambar.png" alt="Logo CV. Mendaki Puncak Sejaya" className="navbar__logo-img" />
                    <img src="logo_text.png" alt="Logo CV. Mendaki Puncak Sejaya" className="navbar__logo-img" />
                </a>

                <ul className="navbar__links">
                    {links.map((link) => (
                        <li key={link.href}>
                            <a href={link.href} className="navbar__link">{link.label}</a>
                        </li>
                    ))}
                </ul>

                <a href="#kontak" className="navbar__cta">
                    <span>Hubungi Kami</span>
                    <span>→</span>
                </a>

                <button className="navbar__mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}>
                <button className="mobile-menu__close" onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
                {links.map((link) => (
                    <a key={link.href} href={link.href} className="mobile-menu__link" onClick={() => setMobileOpen(false)}>
                        {link.label}
                    </a>
                ))}
                <a href="#kontak" className="btn btn--primary" onClick={() => setMobileOpen(false)}>Hubungi Kami</a>
            </div>
        </>
    )
}

/* COUNTUP COMPONENT */
function CountUp({ end, duration = 2000, suffix = '' }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let startTimestamp = null;
                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        setCount(Math.floor(progress * end));
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    window.requestAnimationFrame(step);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [end, duration, hasAnimated]);

    return <span ref={ref}>{count}{suffix}</span>;
}

/*HERO SECTION */
function Hero() {
    return (
        <section className="hero" id="beranda">
            <div className="container">
                <div className="hero__content">

                    <h1 className="hero__title">
                        Solusi Penyediaan Barang dan Jasa<br />
                        <span className="hero__title-gradient">Berkualitas Tinggi</span>
                    </h1>

                    <p className="hero__description">
                        Mendaki Puncak Sejaya hadir sebagai mitra terpercaya Anda.
                        Kami menghadirkan produk berkualitas tinggi dengan teknologi modern dan
                        komitmen terhadap kepuasan pelanggan.
                    </p>

                    <div className="hero__actions">
                        <a href="#layanan" className="btn btn--primary">
                            <span>Jelajahi Layanan</span>
                            <span>↗</span>
                        </a>
                        <a href="#tentang" className="btn btn--glass">
                            <span>Tentang Kami</span>
                        </a>
                    </div>

                    <div className="hero__stats">
                        <div className="hero__stat">
                            <div className="hero__stat-number"><CountUp end={99} suffix="+" /></div>
                            <div className="hero__stat-label">Proyek Selesai</div>
                        </div>
                        <div className="hero__stat">
                            <div className="hero__stat-number"><CountUp end={50} suffix="+" /></div>
                            <div className="hero__stat-label">Klien Aktif</div>
                        </div>
                        <div className="hero__stat">
                            <div className="hero__stat-number"><CountUp end={99} suffix="%" /></div>
                            <div className="hero__stat-label">Kepuasan</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative visual */}
            <div className="hero__visual">
                <div className="hero__visual-ring hero__visual-ring--1"></div>
                <div className="hero__visual-ring hero__visual-ring--2"></div>
                <div className="hero__visual-ring hero__visual-ring--3"></div>
                <div className="hero__visual-dot hero__visual-dot--1"></div>
                <div className="hero__visual-dot hero__visual-dot--2"></div>
                <div className="hero__visual-dot hero__visual-dot--3"></div>
            </div>

            {/* Floating cards */}
            <div className="hero__float-card hero__float-card--1">
                <div className="hero__float-card-icon">⚙️</div>
                <div className="hero__float-card-title">Presisi Tinggi</div>
            </div>
            <div className="hero__float-card hero__float-card--2">
                <div className="hero__float-card-icon">🏆</div>
                <div className="hero__float-card-title">ISO Certified</div>
            </div>
            <div className="hero__float-card hero__float-card--3">
                <div className="hero__float-card-icon">✅</div>
                <div className="hero__float-card-title">Kualitas Terjamin</div>
            </div>
            <div className="hero__float-card hero__float-card--4">
                <div className="hero__float-card-icon">🔧</div>
                <div className="hero__float-card-title">24/7 Support</div>
            </div>

            <a href="#layanan" className="hero__scroll-indicator" aria-label="Scroll Down">
                <span className="hero__scroll-text">scroll untuk informasi lainnya</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
            </a>
        </section>
    )
}

/* ABOUT SECTION */
function About() {
    return (
        <section className="section" id="tentang">
            <div className="container">
                <div className="section__label">
                    <span className="section__label-dot"></span>
                    Tentang Kami
                </div>

                <div className="about__grid">
                    <div className="about__image-wrapper glass">
                        <img src="/gambar_tentang.png" alt="Tentang CV. Mendaki Puncak Sejaya" className="about__image" />
                        <div className="about__image-overlay"></div>
                        <div className="about__image-badge">
                            <div className="about__image-badge-number">5+</div>
                            <div className="about__image-badge-text">Tahun Pengalaman</div>
                        </div>
                    </div>

                    <div className="about__text-content">
                        <h3>Mitra General Contractor Terpercaya untuk Industri Anda</h3>
                        <p>
                            Mendaki Puncak Sejaya berdedikasi
                            dalam menyediakan produk dan solusi berkualitas tinggi. Dengan pengalaman
                            bertahun-tahun, kami memahami kebutuhan industri dan berkomitmen untuk
                            memberikan hasil terbaik.
                        </p>
                        <p>
                            Dilengkapi dengan fasilitas modern dan tim profesional, kami mampu menangani
                            berbagai proyek general contractor dari skala kecil hingga besar dengan standar
                            kualitas internasional.
                        </p>

                        <div className="about__features">
                            <div className="about__feature">
                                <div className="about__feature-icon about__feature-icon--blue">🎯</div>
                                <span className="about__feature-text">Produksi Tepat Waktu & Akurat</span>
                            </div>
                            <div className="about__feature">
                                <div className="about__feature-icon about__feature-icon--amber">🔧</div>
                                <span className="about__feature-text">Peralatan & Teknologi Terkini</span>
                            </div>
                            <div className="about__feature">
                                <div className="about__feature-icon about__feature-icon--violet">👥</div>
                                <span className="about__feature-text">Tim Profesional Berpengalaman</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* SERVICES SECTION */
function Services() {
    const services = [
        {
            icon: '⚙️',
            iconClass: 'service-card__icon--blue',
            title: 'General Contractor',
            description: 'Layanan General Contractor untuk berbagai kebutuhan industri, mulai dari cutting, bending, hingga welding.',
            image: '/gambar_gc.jpg'
        },
        {
            icon: '⚡',
            iconClass: 'service-card__icon--amber',
            title: 'Electrical Engineering',
            description: 'Layanan Electrical Engineering untuk berbagai kebutuhan industri, mulai dari cutting, bending, hingga welding.',
            image: '/gambar_ee.jpg'
        },
        {
            icon: '🏗️',
            iconClass: 'service-card__icon--violet',
            title: 'Civil Architecture',
            description: 'Layanan Civil Architecture untuk membantu membangun struktur baja untuk kebutuhan gedung, jembatan, dan infrastruktur lainnya dengan standar keamanan tinggi.',
            image: '/gambar_ca.jpg'
        },
        {
            icon: '💻',
            iconClass: 'service-card__icon--rose',
            title: 'IT Service',
            description: 'Layanan IT Service untuk berbagai kebutuhan industri.',
            image: '/gambar_it.jpg'
        },
        {
            icon: '🔬',
            iconClass: 'service-card__icon--rose',
            title: 'Quality Control',
            description: 'Layanan kontrol kualitas yang ketat memastikan setiap produk yang kami hasilkan memenuhi standar internasional.',
            image: '/gambar_qc.jpg'
        },
        {
            icon: '🚚',
            iconClass: 'service-card__icon--cyan',
            title: 'Supply Chain',
            description: 'Manajemen rantai pasokan yang efisien untuk memastikan kelancaran pengiriman material dan produk jadi.',
            image: '/gambar_sc.jpg'
        }
    ]

    return (
        <section className="section" id="layanan">
            <div className="container">
                <div className="section__label">
                    <span className="section__label-dot"></span>
                    Layanan Kami
                </div>
                <h2 className="section__title">Solusi Pengadaan Barang dan Jasa Terintegrasi </h2>
                <p className="section__subtitle">
                    Kami menyediakan berbagai layanan kontraktor yang komperehensif dan berkualitas
                    tinggi untuk memenuhi kebutuhan industri Anda.
                </p>

                <div className="services__grid">
                    {services.map((service, index) => (
                        <div className="service-card" key={index}>
                            <div className="service-card__image-container">
                                <img src={service.image} alt={service.title} className="service-card__image" />
                            </div>
                            <div className={`service-card__icon ${service.iconClass}`}>
                                {service.icon}
                            </div>
                            <h3 className="service-card__title">{service.title}</h3>
                            <p className="service-card__description">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* PROJECTS SECTION */
function Projects() {
    const projects = [
        {
            title: 'Perbaikan dan Instalasi Genset',
            description: 'Perbaikan dan instalasi genset untuk fasilitas industri dengan kapasitas tertentu.',
            tags: ['General Contractor', 'Electrical Engineering'],
            gradient: 'linear-gradient(135deg, rgba(52,120,255,0.3), rgba(52,120,255,0.05))',
            emoji: '🔌',
            image: '/proyek_1.jpg'
        },
        {
            title: 'Pekerjaan dan Perbaikan Atap Gedung',
            description: 'Pekerjaan dan perbaikan atap gedung untuk fasilitas industri dengan kapasitas tertentu.',
            tags: ['General Contractor', 'Civil Architecture'],
            gradient: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(124,58,237,0.05))',
            emoji: '🏗️',
            image: '/proyek_2.jpg'
        },
        {
            title: 'Pekerjaan dan Perbaikan Pagar',
            description: 'Pekerjaan dan perbaikan pagar untuk fasilitas industri dengan kapasitas tertentu.',
            tags: ['General Contractor', 'Civil Architecture'],
            gradient: 'linear-gradient(135deg, rgba(249,130,7,0.3), rgba(249,130,7,0.05))',
            emoji: '🏗️',
            image: '/proyek_3.jpg'
        },
        {
            title: 'Pekerjaan dan Renovasi Ruangan',
            description: 'Pekerjaan dan renovasi ruangan untuk fasilitas industri dengan kapasitas tertentu.',
            tags: ['General Contractor', 'Civil Architecture'],
            gradient: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(124,58,237,0.05))',
            emoji: '🔧',
            image: '/proyek_4.png'
        },
        {
            title: 'Penggantian Kontrol Fan Trafo',
            description: 'Penggantian kontrol fan trafo untuk fasilitas industri dengan kapasitas tertentu.',
            tags: ['General Contractor', 'Electrical Engineering'],
            gradient: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(124,58,237,0.05))',
            emoji: '🔧',
            image: '/proyek_5.jpg'
        },
        {
            title: 'Pemasangan Fasade',
            description: 'Pemasangan fasade untuk fasilitas industri dengan kapasitas tertentu.',
            tags: ['General Contractor', 'Civil Architecture'],
            gradient: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(16,185,129,0.05))',
            emoji: '🔩',
            image: '/proyek_6.png'
        }
    ]

    return (
        <section className="section" id="proyek">
            <div className="container">
                <div className="section__label">
                    <span className="section__label-dot"></span>
                    Proyek Kami
                </div>
                <h2 className="section__title">Portfolio Pekerjaan Terbaik</h2>
                <p className="section__subtitle">
                    Beberapa proyek terbaik yang telah kami kerjakan untuk berbagai klien di seluruh Indonesia.
                </p>

                <div className="projects__grid">
                    {projects.map((project, index) => (
                        <div className="project-card" key={index}>
                            <div className="project-card__image-container">
                                <img src={project.image} alt={project.title} className="project-card__image" />
                            </div>
                            <div className="project-card__overlay"></div>
                            <div className="project-card__content">
                                <div className="project-card__tags">
                                    {project.tags.map((tag, i) => (
                                        <span className="project-card__tag" key={i}>{tag}</span>
                                    ))}
                                </div>
                                <h3 className="project-card__title">{project.title}</h3>
                                <p className="project-card__description">{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* STATS SECTION */
function Stats() {
    const stats = [
        { icon: '🏭', end: 100, suffix: '+', label: 'Proyek Selesai' },
        { icon: '👥', end: 50, suffix: '+', label: 'Klien Puas' },
        { icon: '👷', end: 100, suffix: '+', label: 'Tenaga Ahli' },
        { icon: '🏆', end: 10, suffix: '+', label: 'Penghargaan' },
    ]

    return (
        <section className="stats">
            <div className="container">
                <div className="stats__grid">
                    {stats.map((stat, index) => (
                        <div className="stat-card" key={index}>
                            <span className="stat-card__icon">{stat.icon}</span>
                            <div className="stat-card__number"><CountUp end={stat.end} suffix={stat.suffix} /></div>
                            <div className="stat-card__label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* MITRA SECTION */
function Mitra() {
    const partners = [
        {
            name: 'PLN',
            description: 'Perusahaan Listrik Negara',
            icon: '⚡',
            color: 'blue',
            image: '/logo_pln.png'
        },
        {
            name: 'PT. Lumintu Sejahtera Mandiri',
            description: 'Mitra Strategis General Contractor',
            icon: '🏢',
            color: 'amber',
            image: '/logo_lsm.png'
        },
        {
            name: 'Pemerintah Provinsi Jawa Tengah',
            description: 'Proyek Infrastruktur Daerah',
            icon: '🏛️',
            color: 'violet',
            image: '/logo_jateng.png'
        },
        {
            name: 'Pemerintah Kabupaten Semarang',
            description: 'Proyek Pembangunan Kabupaten',
            icon: '🏛️',
            color: 'emerald',
            image: '/logo_kab_smg.png'
        },
        {
            name: 'Pemerintah Kota Semarang',
            description: 'Proyek Pembangunan Kota',
            icon: '🏛️',
            color: 'cyan',
            image: '/logo_kota_smg.png'
        }
    ]

    return (
        <section className="section" id="mitra">
            <div className="container">
                <div className="section__label">
                    <span className="section__label-dot"></span>
                    Mitra Kami
                </div>
                <h2 className="section__title">Dipercaya Oleh Berbagai Instansi</h2>
                <p className="section__subtitle">
                    Kami bangga telah bekerja sama dengan berbagai perusahaan dan instansi pemerintah dalam mewujudkan proyek-proyek berkualitas tinggi.
                </p>

                <div className="mitra__grid">
                    {partners.map((partner, index) => (
                        <div className="mitra-card" key={index}>
                            <div className="mitra-card__logo-wrapper">
                                <img src={partner.image} alt={`Logo ${partner.name}`} className="mitra-card__logo" />
                            </div>
                            <h3 className="mitra-card__name">{partner.name}</h3>
                            <p className="mitra-card__description">{partner.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* CTA SECTION */
function CTASection() {
    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-card">
                    <h2 className="cta-card__title">Siap Memulai Proyek Anda?</h2>
                    <p className="cta-card__description">
                        Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran terbaik
                        untuk kebutuhan general contractor Anda.
                    </p>
                    <div className="cta-card__actions">
                        <a href="#kontak" className="btn btn--primary">
                            <span>Konsultasi Gratis</span>
                            <span>→</span>
                        </a>
                        <a href="tel:+6212345678" className="btn btn--glass">
                            <span>📞</span>
                            <span>Hubungi Langsung</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* CONTACT SECTION */
function Contact() {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', subject: '', message: ''
    })

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // --- GANTI EMAIL INI DENGAN EMAIL ASLI PERUSAHAAN NANTI ---
        const targetEmail = "email_asli@perusahaan.com"
        
        // Memformat isi email dari data form
        const emailSubject = encodeURIComponent(formData.subject || "Pesan dari Form Website")
        const emailBody = encodeURIComponent(`Nama: ${formData.name}\nEmail Pengirim: ${formData.email}\nNo. Telepon: ${formData.phone || '-'}\n\nPesan:\n${formData.message}`)
        
        // Membuka aplikasi email bawaan user (Outlook/Mail/Gmail) dengan format yang sudah ditentukan
        window.location.href = `mailto:${targetEmail}?subject=${emailSubject}&body=${emailBody}`
        
        // Mereset isi form
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }

    return (
        <section className="section" id="kontak">
            <div className="container">
                <div className="section__label">
                    <span className="section__label-dot"></span>
                    Kontak
                </div>
                <h2 className="section__title">Hubungi Kami</h2>
                <p className="section__subtitle">
                    Jangan ragu untuk menghubungi kami. Tim kami siap membantu menjawab pertanyaan
                    dan memenuhi kebutuhan general contractor Anda.
                </p>

                <div className="contact__grid">
                    <div className="contact__info">
                        <div className="contact__info-card">
                            <div className="contact__info-icon">📍</div>
                            <div>
                                <div className="contact__info-title">Alamat</div>
                                <div className="contact__info-text">
                                    Jl. Industri Raya No. 123<br />
                                    Kawasan Industri, Indonesia
                                </div>
                            </div>
                        </div>
                        <div className="contact__info-card">
                            <div className="contact__info-icon">📞</div>
                            <div>
                                <div className="contact__info-title">Telepon</div>
                                <div className="contact__info-text">
                                    +62 21 1234 5678<br />
                                    +62 812 3456 7890
                                </div>
                            </div>
                        </div>
                        <div className="contact__info-card">
                            <div className="contact__info-icon">✉️</div>
                            <div>
                                <div className="contact__info-title">Email</div>
                                <div className="contact__info-text">
                                    mps@gmail.com<br />
                                    sales@mendakipuncaksejaya.co.id
                                </div>
                            </div>
                        </div>
                        <div className="contact__info-card">
                            <div className="contact__info-icon">🕐</div>
                            <div>
                                <div className="contact__info-title">Jam Operasional</div>
                                <div className="contact__info-text">
                                    Senin - Jumat: 08:00 - 16:00<br />
                                    Sabtu: 08:00 - 10:00
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="contact__form" onSubmit={handleSubmit}>
                        <div className="contact__form-row">
                            <div className="contact__form-group">
                                <label className="contact__form-label" htmlFor="contact-name">Nama Lengkap</label>
                                <input
                                    className="contact__form-input"
                                    type="text"
                                    id="contact-name"
                                    name="name"
                                    placeholder="Masukkan nama Anda"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="contact__form-group">
                                <label className="contact__form-label" htmlFor="contact-email">Email</label>
                                <input
                                    className="contact__form-input"
                                    type="email"
                                    id="contact-email"
                                    name="email"
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="contact__form-row">
                            <div className="contact__form-group">
                                <label className="contact__form-label" htmlFor="contact-phone">Telepon</label>
                                <input
                                    className="contact__form-input"
                                    type="tel"
                                    id="contact-phone"
                                    name="phone"
                                    placeholder="+62 xxx xxxx xxxx"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="contact__form-group">
                                <label className="contact__form-label" htmlFor="contact-subject">Subjek</label>
                                <input
                                    className="contact__form-input"
                                    type="text"
                                    id="contact-subject"
                                    name="subject"
                                    placeholder="Subjek pesan"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="contact__form-group">
                            <label className="contact__form-label" htmlFor="contact-message">Pesan</label>
                            <textarea
                                className="contact__form-textarea"
                                id="contact-message"
                                name="message"
                                placeholder="Tuliskan pesan Anda..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                            <span>Kirim Pesan</span>
                            <span>→</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

/* FOOTER */
function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    <div>
                        <a href="#beranda" className="navbar__logo" style={{ display: 'inline-flex', marginBottom: '4px' }}>
                            <img src="/logo_gambar.png" alt="Logo CV. Mendaki Puncak Sejaya" className="footer__logo-full" />
                        </a>
                        <p className="footer__brand-desc">
                            Mitra general contractor terpercaya untuk solusi industri berkualitas tinggi.
                            Komitmen kami adalah memberikan yang terbaik untuk setiap proyek.
                        </p>
                    </div>

                    <div>
                        <h4 className="footer__column-title">Layanan</h4>
                        <a href="#layanan" className="footer__link">General Contractor</a>
                        <a href="#layanan" className="footer__link">Electrical Engineering</a>
                        <a href="#layanan" className="footer__link">Civil Architecture</a>
                        <a href="#layanan" className="footer__link">IT Service</a>
                        <a href="#layanan" className="footer__link">Quality Control</a>
                        <a href="#layanan" className="footer__link">Supply Chain</a>
                    </div>

                    <div>
                        <h4 className="footer__column-title">Perusahaan</h4>
                        <a href="#tentang" className="footer__link">Tentang Kami</a>
                        <a href="#proyek" className="footer__link">Portfolio</a>
                        <a href="#mitra" className="footer__link">Mitra</a>
                        <a href="#kontak" className="footer__link">Kontak</a>
                    </div>

                    <div>
                        <h4 className="footer__column-title">Kontak</h4>
                        <span className="footer__link" style={{ cursor: 'default' }}>📍 Jl. Industri Raya No. 123</span>
                        <span className="footer__link" style={{ cursor: 'default' }}>📞 +62 21 1234 5678</span>
                        <span className="footer__link" style={{ cursor: 'default' }}>✉️ mps@gmail.com</span>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © {new Date().getFullYear()} CV. Mendaki Puncak Sejaya. All rights reserved.
                    </p>
                    <div className="footer__socials">
                        <a href="#" className="footer__social-link" aria-label="Instagram">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                        </a>
                        <a href="#" className="footer__social-link" aria-label="Facebook">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        <a href="#" className="footer__social-link" aria-label="WhatsApp">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        </a>
                        <a href="#" className="footer__social-link" aria-label="Email">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

/* SCROLL ANIMATION HOOK */
function useScrollAnimation() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        )

        document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [])
}

/* MAIN APP */
function App() {
    useScrollAnimation()

    return (
        <>
            {/* Animated Background */}
            <div className="bg-animated">
                <div className="bg-orb bg-orb--1"></div>
                <div className="bg-orb bg-orb--2"></div>
                <div className="bg-orb bg-orb--3"></div>
                <div className="bg-orb bg-orb--4"></div>
                <div className="bg-mesh"></div>
            </div>

            <Navbar />
            <Hero />
            <About />
            <Services />
            <Projects />
            <Stats />
            <Mitra />
            <CTASection />
            <Contact />
            <Footer />
        </>
    )
}

export default App
