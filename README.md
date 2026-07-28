# Maminor Foods NG 🌾

A premium, dynamic e-commerce frontend built for **Maminor Foods Nigeria Limited**, designed to showcase natural, indigenous health foods and drinks (like Kunun Acha, Fonio, and Sesame Seeds). The project is built with high-performance Vanilla HTML/CSS/JS and is ready for immediate deployment on platforms like Vercel.

## 🚀 Features
- **Premium UI/UX:** Styled to resemble a high-end WordPress/WooCommerce template with rich brand colors, smooth micro-interactions, and a fully responsive layout.
- **Dynamic Products:** Products are generated dynamically via JavaScript, making it easy to add or update items in `main.js`.
- **Guest Checkout:** Frictionless checkout experience. Users do not need to sign up to place an order.
- **WhatsApp Integration:** Orders are securely formatted and redirected to the business WhatsApp for instant communication and confirmation.
- **Webhook Ready:** A placeholder is included for tools like Formspree, Zapier, or Make to automatically trigger email updates to `maminorng@gmai.com`.

## 🛠 Tech Stack
- **HTML5:** Semantic and accessible structure.
- **CSS3:** Custom variables, grid/flexbox layouts, responsive media queries, and animations (No external heavy CSS frameworks).
- **JavaScript (ES6):** State management for the shopping cart, modal interactions, and order processing.
- **Lucide Icons:** Clean, lightweight SVG iconography.

## 📦 Deployment (Vercel)
This repository includes a `vercel.json` file configured for static deployments. 
1. Push this code to your GitHub repository.
2. Log into [Vercel](https://vercel.com).
3. Import your GitHub repository.
4. Vercel will automatically detect the static setup and deploy the site instantly.

## 🗺️ Future Roadmap
The application is currently designed as a high-conversion static landing page with an integrated cart. Here is the roadmap for scaling the application in the future:

### Phase 1: Automation & Analytics (Current/Next)
- [ ] **Email Notifications:** Replace the webhook placeholder with a live Formspree endpoint to receive order emails directly to the business Gmail.
- [ ] **Analytics:** Integrate Google Analytics or Meta Pixel to track checkout conversions and page views.

### Phase 2: Content Management (Mid-Term)
- [ ] **CMS Integration:** Migrate the static `products` array in `main.js` to a headless CMS (like Sanity.io or Contentful) so non-technical staff can add products, update prices, and write blog posts without touching the code.
- [ ] **Multi-Page Routing:** Split the single-page application into dedicated pages for `/shop`, `/about`, and `/blog`.

### Phase 3: Full Backend & Payments (Long-Term)
- [ ] **Payment Gateway Integration:** Integrate Paystack or Flutterwave directly into the checkout modal for automated card and bank transfers, reducing reliance on manual WhatsApp confirmation.
- [ ] **User Authentication:** Allow users to create accounts to view order history, save addresses, and track active deliveries.
- [ ] **Database & Framework Migration:** Migrate the vanilla structure to a framework like Next.js or React, backed by a database (like Firebase or PostgreSQL) to manage a large-scale inventory and customer base securely.

---
*Nourishing Lives Naturally. &copy; 2024 Maminor Foods Nigeria Limited.*
