# 🛒 GoCart - E-Commerce Platform 

**GoCart** is a modern, full-stack, multi-vendor e-commerce platform built with Next.js. It empowers both buyers and sellers by offering a seamless shopping experience, robust store management, secure payments, and a scalable architecture.

🚀 **Live Deployment:**  
https://gocart-project-eight.vercel.app/

---

# ✨ Key Features

## For Buyers

- **Authentication & Profiles:** Secure login and registration powered by Clerk.
- **Product Discovery:** Search, filter, and browse products effortlessly.
- **Shopping Cart & Checkout:** Intuitive cart management with a smooth checkout flow.
- **Secure Payments:** Integrated with Stripe for secure credit card processing, alongside Cash on Delivery (COD) options.
- **Order Tracking:** Users can view their order history and current status.
- **Reviews & Ratings:** Buyers can leave ratings and reviews for purchased products.

## For Sellers

- **Become a Seller:** Users can apply to create their own store.
- **Seller Dashboard:** Dedicated dashboard to manage store details, sales, and analytics.
- **Product Management:** Easily add, edit, and remove products from the catalog.
- **Order Fulfillment:** Track and update the status of incoming orders.

## System & Admin

- **Multi-Vendor Architecture:** Supports independent sellers and isolated store data.
- **Webhook Synchronization:** Reliable background processing using Inngest for Clerk data synchronization.
- **Admin Controls:** Approve or reject seller applications.

---

# 🛠️ Tech Stack

- **Framework:** [Next.js 16+](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (Hosted on [Neon](https://neon.tech/))
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Payments:** [Stripe](https://stripe.com/)
- **Image Hosting:** [ImageKit](https://imagekit.io/)
- **Background Jobs:** [Inngest](https://www.inngest.com/)

---

# 🚀 Getting Started Locally

## Prerequisites

Make sure you have **Node.js** and **npm** installed on your machine.

---

## 1. Clone & Install

```bash
git clone https://github.com/sanyaaaa14/GoCart.git

cd GoCart/client

npm install
```

---

## 2. Environment Variables

Create a `.env.local` file in the root directory and configure the following keys:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
CLERK_SECRET_KEY=your_clerk_secret

# Database (Neon/PostgreSQL)
DATABASE_URL=your_neon_db_url
DIRECT_URL=your_neon_direct_url

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_pub_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_pub_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Misc
NEXT_PUBLIC_CURRENCY_SYMBOL=$
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 3. Database Setup

Push the Prisma schema to your database:

```bash
npx prisma generate

npx prisma db push
```

---

## 4. Run the Application

```bash
npm run dev
```

The app will be running at:

```bash
http://localhost:3000
```

---

# 🔮 Future Scope

The application has a strong foundation, and the following features are planned for future iterations:

## 🤖 AI Integration

Add artificial intelligence capabilities to automatically generate high-quality product descriptions and SEO tags based on product images uploaded by sellers.

## 📊 Advanced Analytics

Provide sellers with detailed charts and graphs for sales insights over time.

## ❤️ Wishlist

Allow users to save their favorite products for later.

## 🛡️ Admin Dashboard UI

Expand the super-admin interface for better platform management and revenue tracking.

---

# 👩‍💻 Author

**Sanya Bhatia**

- GitHub: https://github.com/sanyaaaa14
- LinkedIn: https://www.linkedin.com/in/sanyabhatia/
- Portfolio: https://sanyabhatia-portfolio.netlify.app/

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
