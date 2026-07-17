# On Stage Theatrical Productions - Static Mockup & Prototype

This repository contains the static HTML, CSS, and JavaScript frontend files for **On Stage Theatrical Productions, Inc.** 

This prototype is built with clean vanilla HTML5, CSS3, and lightweight JavaScript (with Font Awesome icons and Google Fonts). It is organized specifically to serve as a clean mockup ready to be transferred and migrated into a **WordPress** content management system.

---

## 📂 Page Inventory & Mapping

- **[index.html](index.html) (Home Page):** Contains the hero banner, current production highlights, explore programs grid (updated from a 2x2 layout to a single row of 4 columns on desktop), upcoming shows list, costume rentals teaser banner, "Behind the Scenes" gallery, and success statistics.
- **[about.html](about.html) (About Us):** Outlines the studio's mission, vision, and leadership/staff biography cards.
- **[programs.html](programs.html) (Programs & Classes):** Details the classes offered, camp information, registration details, and program FAQs.
- **[shows.html](shows.html) (Shows & Tickets):** Contains the upcoming production calendars, direct ticketing links, and historical production logs.
- **[costumes.html](costumes.html) (Costume Rentals Hub):** Displays overview info for school/theater rentals, links to rental documents, FAQs, and a grid of costume categories.
- **[christmas-carol-costumes.html](christmas-carol-costumes.html) (A Christmas Carol Costume Gallery):** A detailed gallery page showing the Victorian costume collection for *A Christmas Carol*. 
- **[gallery.html](gallery.html) (Photo Gallery):** Contains Behind the Scenes gallery, Parent Testimonials, Previous Show Galleries, and video highlight grids.

---

## 🎨 Asset Structure & Mapping

- **`/documents/`**: Contains PDF/Excel files (e.g., Costume Sizing forms and rental forms).
  - *WordPress Migration:* Upload these files to the WordPress Media Library and update the download href links.
- **`/images/`**: Contains logos, background textures, and show graphics.
  - **`/images/A_Chistmas_Carol_Pictures/`**: Contains 30 images utilized in the *A Christmas Carol* gallery.
  - **`/images/OLIVER_PICTURES_2024/` & `/images/PETER_PAN_25/`**: Reference image sets for other shows (to build out future show-specific galleries).

---

## 🛠️ WordPress Migration Tips & Recommendations

### 1. Global Header & Footer
- **Navigation Menu:** The navigation links in the header (`<nav class="top-nav">`) are identical on all pages. When coding a custom WordPress theme, register a navigation menu in `functions.php` and call it in `header.php` via `wp_nav_menu()`.
- **Navbar Styling:** The nav bar logo `.nav-logo` is styled to be prominent (height: `120px` with a scale micro-animation on hover).
- **Footer:** The site footer (`<footer class="site-footer bg-light-blue">`) is identical on all pages and should be converted into `footer.php`.

### 2. Interactive Galleries & Lightbox
- **Static implementation:** The "Summer Camps" page, news galleries, homepage "Behind the Scenes", and the "A Christmas Carol" page use a custom HTML5 `<dialog>` component with JavaScript to show popup pictures and enable left/right arrow and keyboard navigation.
- **WordPress Translation:** Instead of recreating custom JS, you can use WordPress gallery plugins (such as **Envira Gallery**, **FooGallery**, or native Gutenberg/Elementor gallery blocks with a lightbox add-on) to build these pages. This makes it easier for admin users to add/remove photos in the future.

### 3. Parent Testimonials & Galleries
- **Static implementation:** The testimonials and previous show galleries are rendered in static layout structures.
- **WordPress Translation:** You can represent testimonials by setting up custom blocks or custom widgets, making it easy for staff to update parent quotes.

### 4. Custom Styling
- All custom designs, alignments, grids, and responsive behaviors are stored in [style.css](style.css). This file can be used as the base stylesheet (`style.css`) for a custom WordPress theme.

---

*Copyright © 2026 OnStage Theatrical Productions*
