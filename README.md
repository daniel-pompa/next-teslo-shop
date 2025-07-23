# Teslo Shop - E-Commerce Platform

Welcome to the **Teslo Shop e-commerce platform**! This is a modern, high-performance, and scalable e-commerce solution built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Zustand**, **Prisma**, **PostgreSQL**, and **Docker**. Whether you're building a small online store or a large-scale e-commerce platform, this project provides a solid foundation to get you started quickly.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Features

- **Next.js**: Server-side rendering (SSR), static site generation (SSG), and API routes for a fast and SEO-friendly e-commerce experience.
- **TypeScript**: Strongly-typed codebase for better developer experience and fewer runtime errors.
- **Tailwind CSS**: Utility-first CSS framework for building responsive and visually stunning UIs with ease.
- **Zustand**: Lightweight and efficient global state management for seamless data flow across the application.
- **Modern Design**: A clean, professional, and user-friendly design.
- **Responsive Layout**: Fully responsive design that works seamlessly across all devices.
- **Product Management**: Easily manage products, categories, and inventory.
- **Shopping Cart**: Intuitive shopping cart with real-time updates.
- **Checkout Flow**: Streamlined and secure checkout process.
- **Authentication**: User authentication and account management.
- **SEO Optimized**: Built-in SEO best practices for better search engine visibility.

## Requirements

You need to have the following installed:

A source code editor such as [VSCode](https://code.visualstudio.com/), [Sublime Text](https://www.sublimetext.com/), or any other editor of your choice.

[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F.svg?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![npm](https://img.shields.io/badge/npm-%23CB3837.svg?style=flat&logo=npm&logoColor=white)](https://www.npmjs.com/)

> [!NOTE]
> Clicking on the Node.js badge will take you to the Node.js website, where you can download the installer. It is recommended to use the stable version. When you install Node.js, npm will be installed automatically.

Check your Node.js and npm installation by running:

```bash
node --version
npm --version
```

## Tech Stack

This project utilizes the following technologies:

<p>
  <a href="#"><img src="https://skillicons.dev/icons?i=next" width="40" height="40" alt="Next.js" /></a>
  <a href="#"><img src="https://skillicons.dev/icons?i=ts" width="40" height="40" alt="TypeScript" /></a>
  <a href="#"><img src="https://skillicons.dev/icons?i=tailwind" width="40" height="40" alt="Tailwind CSS" /></a>
  <a href="#"><img src="https://skillicons.dev/icons?i=docker" width="40" height="40" alt="Docker" /></a>
  <a href="#"><img src="https://skillicons.dev/icons?i=prisma" width="40" height="40" alt="Prisma" /></a>
  <a href="#"><img src="https://skillicons.dev/icons?i=postgres" width="40" height="40" alt="PostgreSQL" /></a>
</p>

**Note**: Zustand is used for global state management in this project.

## Project Structure

```bash
──📁 prisma/
│   ├───📁 migrations/
│   └───📄 schema.prisma
├───📁 public/
├───📁 src/
│   ├───📁 actions/
│   │   ├───📁 address/
│   │   ├───📁 auth/
│   │   ├───📁 category/
│   │   ├───📁 country/
│   │   ├───📁 order/
│   │   ├───📁 payments/
│   │   ├───📁 product/
│   │   ├───📁 user/
│   │   └───📄 index.ts
│   ├───📁 app/
│   │   ├───📁 (shop)/
│   │   │   ├───📁 admin/
│   │   │   │   ├───📁 orders/
│   │   │   │   ├───📁 product/
│   │   │   │   │   └───📁 [slug]/
│   │   │   │   │       ├───📁 ui/
│   │   │   │   ├───📁 products/
│   │   │   │   ├───📁 users/
│   │   │   │   │   ├───📁 ui/
│   │   │   │   ├───📄 layout.tsx
│   │   │   │   └───📄 page.tsx
│   │   │   ├───📁 cart/
│   │   │   │   ├───📁 ui/
│   │   │   ├───📁 checkout/
│   │   │   │   ├───📁 (checkout)/
│   │   │   │   │   ├───📁 ui/
│   │   │   │   ├───📁 address/
│   │   │   │   │   ├───📁 ui/
│   │   │   │   └───📄 layout.tsx
│   │   │   ├───📁 empty/
│   │   │   ├───📁 gender/
│   │   │   │   ├───📁 [gender]/
│   │   │   ├───📁 orders/
│   │   │   │   ├───📁 [id]/
│   │   │   ├───📁 product/
│   │   │   │   ├───📁 [slug]/
│   │   │   │   │   ├───📁 ui/
│   │   │   ├───📁 products/
│   │   │   ├───📁 profile/
│   │   │   ├───📄 layout.tsx
│   │   │   └───📄 page.tsx
│   │   ├───📁 api/
│   │   │   └───📁 auth/
│   │   ├───📁 auth/
│   │   │   ├───📁 sign-in/
│   │   │   │   ├───📁 ui/
│   │   │   ├───📁 sign-up/
│   │   │   │   ├───📁 ui/
│   │   │   └───📄 layout.tsx
│   │   ├───📄 favicon.ico
│   │   ├───📄 globals.css
│   │   └───📄 layout.tsx
│   ├───📁 components/
│   │   ├───📁 cart/
│   │   ├───📁 orders/
│   │   ├───📁 paypal/
│   │   ├───📁 product/
│   │   │   ├───📁 color-selector/
│   │   │   ├───📁 product-image/
│   │   │   ├───📁 quantity-selector/
│   │   │   ├───📁 size-selector/
│   │   │   ├───📁 slideshow/
│   │   │   └───📁 stock-label/
│   │   ├───📁 products/
│   │   │   └───📁 product-grid/
│   │   ├───📁 providers/
│   │   ├───📁 ui/
│   │   │   ├───📁 error/
│   │   │   ├───📁 footer/
│   │   │   ├───📁 not-found/
│   │   │   ├───📁 pagination/
│   │   │   ├───📁 side-menu/
│   │   │   ├───📁 title/
│   │   │   └───📁 top-menu/
│   │   └───📄 index.ts
│   ├───📁 config/
│   ├───📁 constants/
│   │   └───📄 index.ts
│   ├───📁 data/
│   ├───📁 interfaces/
│   ├───📁 lib/
│   │   └───📄 prisma.ts
│   ├───📁 store/
│   │   ├───📁 address/
│   │   ├───📁 cart/
│   │   ├───📁 ui/
│   │   └───📄 index.ts
│   ├───📁 utils/
│   │   ├───📄 index.ts
│   └───📄 auth.ts
├───📄 .env
├───📄 .env.template
├───📄 docker-compose.yml
├───📄 eslint.config.mjs
├───📄 LICENSE
├───📄 next-auth.d.ts
├───📄 next-env.d.ts
├───📄 next.config.ts
├───📄 package-lock.json
├───📄 package.json
├───📄 postcss.config.mjs
├───📄 README.md
├───📄 tailwind.config.ts
└───📄 tsconfig.json
```

## Getting Started

To set up the project locally, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/daniel-pompa/next-teslo-shop.git
```

2. **Navigate to the project directory:**

```bash
cd next-teslo-shop
```

3. **Set up environment variables:**

Rename the provided `.env.template` file to `.env` and configure the necessary environment variables. Update the placeholder values with the appropriate configuration for your local environment, including your database credentials (`DB_USER`, `DB_PASSWORD`, `DB_NAME`).

> [!NOTE]
> Ensure your `.env` file is secure and never committed to version control. It is already included in the `.gitignore` file to prevent accidental exposure of sensitive information.

4. **Install dependencies:**

```bash
npm install
```

5. **Set up the database using Docker:**

```bash
docker compose up -d
```

> [!NOTE]
> This command will start the PostgreSQL database. Make sure the environment variables in `.env` match the configuration in `docker-compose.yml`.

6. **Prisma Migrate:**

```bash
npx prisma migrate dev
```

7. **Execute the seed script:**

```bash
npm run seed
```

8. **Run the development server:**

```bash
npm run dev
```

> [!NOTE]
> The server will typically run on <http://localhost:3000>, but check the output on your terminal to be sure.

Now, you're all set to explore the system!

**Paypal payment integration guide**

> [!IMPORTANT]
> This project uses **PayPal Sandbox** for testing purposes.  
> All PayPal transactions are **simulated** and **not real**.

To enable and test PayPal payments locally:

- Create a [PayPal Developer account](https://developer.paypal.com/)
- Set up **sandbox credentials** (Client ID and Secret)
- Add them to your `.env` file:

_(you can use the provided `.env.template` file as a reference)_:

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_SECRET_KEY=
PAYPAL_OAUTH_URL=
PAYPAL_ORDERS_URL=
```

**Never use real PayPal credentials in development.**

For production use, switch to Live Mode in your PayPal dashboard and update your environment variables accordingly.

## Contributing

We welcome contributions from the community! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

Before submitting a pull request, please ensure your code follows the project's coding standards and includes tests where appropriate.

## License

This project is licensed under the MIT License.

[![MIT License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)

> [!NOTE]
> Clicking on the MIT License badge to see the LICENSE file for details.

## Author

This project is maintained and developed by **Daniel Pompa Pareja**.

For any questions or suggestions, feel free to reach out via [email](mailto:daniel.40.pompa@gmail.com).

🌟 Happy Coding! 🌟

[Back to Top](#table-of-contents)
