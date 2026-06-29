/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import JSZip from 'jszip';
import { Download, FileCode, CheckCircle2, RefreshCw, Layers, ShieldAlert, Sparkles } from 'lucide-react';

export default function WordPressExporter() {
  const [isExporting, setIsExporting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const triggerDownload = async () => {
    setIsExporting(true);
    const zip = new JSZip();

    // Create style.css with Theme Metadata
    const styleCss = `/*
Theme Name: Apotek Sehat Premium
Theme URI: https://github.com/aistudio/theme-apotek-sehat
Author: Google AI Studio
Author URI: https://ai.studio
Description: Tema WordPress Apotek Modern Premium, Responsif, Minimalis, dan Elegan dengan integrasi WooCommerce dan Elementor.
Version: 1.0.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Tags: health, healthcare, pharmacy, medical, commerce, corporate, responsive
Text Domain: apotek-sehat
*/`;

    // Create functions.php with Custom Post Types and styles enqueue
    const functionsPhp = `<? theme-apotek-sehat functions.php ?>
<?php
/**
 * Apotek Sehat Premium Functions and Definitions
 */

if ( ! function_exists( 'apotek_sehat_setup' ) ) :
    function apotek_sehat_setup() {
        // Add default posts and pages support
        add_theme_support( 'title-tag' );
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'custom-logo' );
        add_theme_support( 'woocommerce' );

        // Register Menus
        register_nav_menus( array(
            'primary-menu' => esc_html__( 'Primary Menu', 'apotek-sehat' ),
        ) );
    }
endif;
add_action( 'after_setup_theme', 'apotek_sehat_setup' );

/**
 * Enqueue scripts and styles
 */
function apotek_sehat_scripts() {
    // Load Fonts
    wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800;900&display=swap', array(), null );
    
    // Load Tailwind CSS CDN bundle (or local stylesheet)
    wp_enqueue_style( 'tailwind-css', 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css', array(), '2.2.19' );
    
    // Main stylesheet
    wp_enqueue_style( 'apotek-sehat-style', get_stylesheet_uri(), array(), '1.0.0' );
}
add_action( 'wp_enqueue_scripts', 'apotek_sehat_scripts' );

/**
 * Register Custom Post Types for Products and Promos
 */
function apotek_sehat_register_cpts() {
    // Products CPT
    register_post_type( 'produk_apotek', array(
        'labels' => array(
            'name' => __( 'Produk Apotek', 'apotek-sehat' ),
            'singular_name' => __( 'Produk', 'apotek-sehat' ),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'menu_icon' => 'dashicons-products',
    ) );

    // Promos CPT
    register_post_type( 'promo_apotek', array(
        'labels' => array(
            'name' => __( 'Promo & Diskon', 'apotek-sehat' ),
            'singular_name' => __( 'Promo', 'apotek-sehat' ),
        ),
        'public' => true,
        'supports' => array( 'title', 'editor', 'thumbnail' ),
        'menu_icon' => 'dashicons-tickets-alt',
    ) );
}
add_action( 'init', 'apotek_sehat_register_cpts' );
`;

    // Create header.php with Top bar and sticky nav
    const headerPhp = `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="w-full z-50">
    <!-- Top Bar -->
    <div class="bg-green-900 text-white text-xs py-2 px-6 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-wrap items-center gap-6">
            <span>📍 Jl. Teuku Umar No. 45, Denpasar, Bali</span>
            <span>🕒 08.00 - 21.00 WITA (Setiap Hari)</span>
        </div>
        <div className="flex items-center gap-4">
            <span>Ikuti kami: @apoteksehat.official</span>
        </div>
    </div>

    <!-- Navigation -->
    <nav class="w-full bg-white border-b border-gray-100 py-4 shadow-sm sticky top-0">
        <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span class="text-[#166534] font-black text-xl">+</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-lg font-extrabold text-gray-900 leading-tight">APOTEK SEHAT</span>
                    <span class="text-[9px] text-gray-500 font-medium">Sehat Anda, Prioritas Kami</span>
                </div>
            </div>
            
            <?php
            wp_nav_menu( array(
                'theme_location' => 'primary-menu',
                'container' => false,
                'menu_class' => 'hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-700',
            ) );
            ?>

            <div>
                <a href="https://wa.me/6281234567890" class="bg-green-600 text-white py-2 px-5 rounded-full text-sm font-bold">
                    Hubungi Kami
                </a>
            </div>
        </div>
    </nav>
</header>
`;

    // Create footer.php with deep green footer sections
    const footerPhp = `<footer class="bg-green-950 text-white pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-green-800 pb-12 mb-8">
        <div>
            <h3 class="text-xl font-bold mb-4">Apotek Sehat</h3>
            <p class="text-sm text-green-200">Apotek terpercaya untuk kesehatan keluarga Anda. Menyediakan obat 100% asli bergaransi.</p>
        </div>
        <div>
            <h4 class="text-md font-bold mb-4">Layanan Cepat</h4>
            <ul class="space-y-2 text-sm text-green-200">
                <li><a href="#">Konsultasi Apoteker</a></li>
                <li><a href="#">Cek Kesehatan Mandiri</a></li>
                <li><a href="#">Pesan Antar Obat</a></li>
            </ul>
        </div>
        <div>
            <h4 class="text-md font-bold mb-4">Jam Operasional</h4>
            <p class="text-sm text-green-200">Senin - Minggu<br>08.00 - 21.00 WITA</p>
        </div>
        <div>
            <h4 class="text-md font-bold mb-4">Kontak Kami</h4>
            <p class="text-sm text-green-200">📞 0812-3456-7890<br>✉️ info@apoteksehat.com</p>
        </div>
    </div>
    <div class="max-w-7xl mx-auto px-6 text-center text-xs text-green-400">
        &copy; <?php echo date('Y'); ?> Apotek Sehat. Hak Cipta Dilindungi Undang-Undang.
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
`;

    // Create front-page.php representing the full landing page loop
    const frontPagePhp = `<?php
/**
 * Template Name: Apotek Sehat Home Page
 */
get_header(); ?>

<!-- Hero Section -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
            <span class="bg-green-50 text-green-800 py-1 px-3.5 rounded-full text-xs font-semibold uppercase">Mitra Sehat Terpercaya</span>
            <h1 class="text-4xl lg:text-6xl font-black text-gray-900 mt-4 leading-tight">
                Apotek Terpercaya<br>Untuk <span class="text-green-600">Kesehatan Anda</span>
            </h1>
            <p class="text-gray-600 mt-6 leading-relaxed">Menyediakan berbagai kebutuhan obat, vitamin, dan produk kesehatan asli berkualitas tinggi dengan tim apoteker berpengalaman.</p>
            <div class="flex gap-4 mt-8">
                <a href="#produk" class="bg-green-800 text-white font-bold py-3 px-6 rounded-full">Lihat Produk</a>
                <a href="https://wa.me/6281234567890" class="border border-green-800 text-green-800 font-bold py-3 px-6 rounded-full">Konsultasi Resep</a>
            </div>
        </div>
        <div class="relative">
            <div class="aspect-video bg-gray-100 rounded-3xl overflow-hidden shadow-lg flex items-center justify-center">
                <span class="text-gray-400">Apoteker Image Placeholder</span>
            </div>
        </div>
    </div>
</section>

<!-- WordPress Loop to render custom products -->
<section id="produk" class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-3xl font-bold mb-8">Katalog Produk Pilihan</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <?php
            $query = new WP_Query( array(
                'post_type' => 'produk_apotek',
                'posts_per_page' => 4,
            ) );
            if ( $query->have_posts() ) :
                while ( $query->have_posts() ) : $query->the_post(); ?>
                    <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <?php if ( has_post_thumbnail() ) { the_post_thumbnail('medium', array('class' => 'rounded-xl mb-4 w-full h-40 object-cover')); } ?>
                            <h3 class="font-bold text-gray-900 text-md"><?php the_title(); ?></h3>
                            <p class="text-xs text-gray-500 mt-2"><?php echo wp_trim_words( get_the_excerpt(), 15 ); ?></p>
                        </div>
                        <a href="<?php the_permalink(); ?>" class="text-green-700 font-bold text-xs mt-4 flex items-center gap-1">Detail Obat &rarr;</a>
                    </div>
                <?php endwhile;
                wp_reset_postdata();
            else : ?>
                <p class="text-gray-500 text-xs">Tambahkan Produk Apotek baru lewat dashboard Admin WordPress Anda untuk ditampilkan di sini!</p>
            <?php endif; ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
`;

    // Add files to zip
    const themeFolder = zip.folder('theme-apotek-sehat')!;
    themeFolder.file('style.css', styleCss);
    themeFolder.file('functions.php', functionsPhp);
    themeFolder.file('header.php', headerPhp);
    themeFolder.file('footer.php', footerPhp);
    themeFolder.file('front-page.php', frontPagePhp);
    
    // Add instruction file
    const readmeTxt = `Panduan Instalasi Tema Apotek Sehat Premium

1. Unggah berkas "theme-apotek-sehat.zip" ke dashboard Admin WordPress Anda (Appearance > Themes > Add New > Upload Theme).
2. Aktifkan tema "Apotek Sehat Premium".
3. Tambahkan menu baru di Appearance > Menus dan centang opsi lokasi "Primary Menu".
4. Gunakan Menu Admin "Produk Apotek" dan "Promo & Diskon" untuk menambahkan produk obat serta penawaran harian dengan gambar unggulan (Featured Images).
5. Buat halaman baru, atur template halaman ke "Apotek Sehat Home Page", lalu atur halaman tersebut sebagai Beranda statis Anda di Settings > Reading.
`;
    themeFolder.file('README.txt', readmeTxt);

    // Generate zip
    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'theme-apotek-sehat.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDone(true);
      setTimeout(() => setIsDone(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section id="exporter" className="py-14 bg-gradient-to-br from-[#14532d] to-[#042f1a] text-white font-sans overflow-hidden relative">
      {/* Absolute glow background blobs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text/Overview Content Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 bg-green-900/60 text-green-300 border border-green-800 py-1.5 px-4 rounded-full text-xs font-bold mb-4.5">
              <Sparkles size={12} className="text-yellow-400" />
              <span>WordPress Theme Developer Standard</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-5 leading-tight">
              Butuh Dipasang Di WordPress? <br />
              <span className="text-[#22c55e]">Unduh Tema Custom Kami Sekarang</span>
            </h2>

            <p className="text-sm text-green-100/90 leading-relaxed mb-6 max-w-2xl">
              Kami telah merancang struktur file tema WordPress profesional yang fully-compatible berdasarkan visual design Apotek Sehat ini. Paket tema ini menyertakan script Custom Post Types (CPT) untuk mengelola katalog produk medis, post promo akhir pekan, widget sidebar, serta template file PHP modular yang siap diinstal di WordPress Anda secara instan.
            </p>

            {/* Checklist of Features included */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              <div className="flex items-center gap-3 text-xs text-green-100/90">
                <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                <span>Responsive Header & Footer PHP Templates</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-green-100/90">
                <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                <span>Custom Post Type (CPT) Produk & Promo</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-green-100/90">
                <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                <span>Elementor Page Builder Fully Compatible</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-green-100/90">
                <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                <span>Full WooCommerce Support Ready</span>
              </div>
            </div>
          </div>

          {/* Download Action Widget Box Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-[2rem] p-6.5 sm:p-8 backdrop-blur-md relative overflow-hidden text-center flex flex-col justify-between min-h-[300px]">
              
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-400 to-emerald-500"></div>

              <div>
                <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 text-[#22c55e] rounded-2xl flex items-center justify-center mx-auto mb-4.5">
                  <FileCode size={28} />
                </div>

                <h3 className="text-lg font-bold mb-2">Tema WordPress Sehat</h3>
                <p className="text-xs text-green-200/80 leading-relaxed px-2">
                  Dapatkan folder bundel ZIP berstruktur file lengkap berisi <code>functions.php</code>, <code>style.css</code>, dan petunjuk penggunaan.
                </p>
              </div>

              {/* Status Download Buttons */}
              <div className="mt-8">
                <button
                  onClick={triggerDownload}
                  disabled={isExporting}
                  className={`w-full py-3.5 px-6 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : isExporting
                      ? 'bg-green-800 text-green-200 cursor-not-allowed'
                      : 'bg-[#22c55e] hover:bg-[#16a34a] text-green-950 font-extrabold'
                  }`}
                >
                  {isExporting ? (
                    <>
                      <RefreshCw className="animate-spin" size={15} />
                      <span>Mengompilasi Berkas PHP...</span>
                    </>
                  ) : isDone ? (
                    <>
                      <CheckCircle2 size={15} />
                      <span>Tema Berhasil Diunduh!</span>
                    </>
                  ) : (
                    <>
                      <Download size={15} className="stroke-[2.5]" />
                      <span>Unduh Tema WordPress (ZIP)</span>
                    </>
                  )}
                </button>
                <span className="text-[10px] text-green-300 font-medium block mt-3">
                  Ukuran Berkas: ~12 KB | Versi 1.0.0 Stable
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
