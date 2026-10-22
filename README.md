# Surf Camp — Full-Stack Web Application

A responsive surf-camp website built with **Next.js and Strapi**, featuring a dynamic blog, customizable articles, event listings, and signup functionality. The project combines a modern frontend with a headless CMS so that website content can be managed independently of the frontend code.

This project was developed as part of the Coursera course [The Freelance Stack: Real project with NextJS and Strapi](https://www.coursera.org/learn/packt-the-freelance-stack-real-project-with-nextjs-and-strapi-usllu), with additional deployment and configuration work using Neon, Render, and Vercel.

## Live Demo

- **Frontend:** https://surf-camp-weld.vercel.app/
- **Strapi API:** https://surf-camp-strapi.onrender.com/

## Features

- **Dynamic content management:** Manage website content through Strapi CMS.
- **Reusable UI components:** Build modular layouts and reusable sections.
- **Dynamic blog:** Display articles fetched from Strapi, with individual article pages and customizable content sections.
- **Events and surf camps:** Display events and individual event details.
- **Signup functionality:** Submit newsletter and event registration forms to the Strapi API.
- **Responsive design:** Adapt layouts to desktop, tablet, and mobile screens.
- **Sass styling:** Organize styles using SCSS, reusable variables, and responsive mixins.
- **Caching:** Use caching for data fetching where configured to reduce unnecessary requests and improve performance.
- **Image optimization:** Use responsive image layouts and remotely hosted media.
- **Production deployment:** Deploy the frontend, backend, and database using separate cloud services.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework and routing |
| React | UI components and interactive forms |
| TypeScript / JavaScript | Application logic |
| Strapi | Headless CMS and REST API |
| PostgreSQL | Relational database |
| Neon | Managed PostgreSQL hosting |
| Render | Strapi backend hosting |
| Vercel | Next.js frontend hosting |
| Sass / SCSS | Styling and responsive layouts |
| Axios | HTTP requests to the Strapi API |
| Cloudinary | Image hosting and delivery |

## Architecture

The application separates the frontend, backend, and database.

```text
             User
               |
               v
      Next.js Frontend
          (Vercel)
               |
               | HTTP requests
               v
        Strapi REST API
           (Render)
               |
               | SQL queries
               v
       PostgreSQL Database
             (Neon)

      Images hosted on Cloudinary
```

### How it works

1. The user visits the Next.js website.
2. The frontend requests content from the Strapi REST API.
3. Strapi retrieves or updates data in the Neon PostgreSQL database.
4. The frontend renders the returned content.
5. Signup forms send user-submitted data to the relevant Strapi endpoints.
6. Configured caching helps avoid unnecessary repeated data fetching.

## Deployment

### Frontend — Vercel

The Next.js application is deployed on Vercel.

The frontend uses an environment variable to connect to the deployed Strapi backend.

Configure the following environment variable in Vercel:

```env
NEXT_PUBLIC_STRAPI_URL=https://surf-camp-strapi.onrender.com
```

Replace the example URL with your actual Strapi deployment URL.

### Backend — Render

The Strapi application is deployed on Render and exposes REST API endpoints for website content and form submissions.

The backend requires the appropriate production configuration, including database connection details, application secrets, and any required media-provider configuration.

### Database — Neon

Neon hosts the PostgreSQL database used by Strapi.

The database connection string must be configured in the Strapi backend's environment variables. Keep database credentials and other secrets out of the frontend repository.

### Images — Cloudinary

Cloudinary provides hosted image URLs for media used throughout the website. The Strapi media configuration must match the deployment environment.

## Getting Started

### Prerequisites

- Node.js and npm
- Git
- A Strapi project and configured database
- Environment variables for the backend API

### 1. Clone the repository

```bash
git clone git@github.com:Nessrine88/surf_camp.git
cd surf_camp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root of the Next.js project:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Use your local Strapi URL during development and your deployed API URL in production.

Do not commit `.env.local` or any files containing credentials.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Make sure the Strapi backend and its database are running and accessible.

### 5. Build for production

```bash
npm run build
npm run start
```

## Caching and Performance

Caching is part of the application's data-fetching and performance strategy.

Depending on the caching configuration used by each request, caching can help:

- Reduce repeated requests to the Strapi API.
- Improve page loading performance.
- Reuse previously fetched content when appropriate.
- Reduce unnecessary backend processing.

Cache behavior depends on the specific Next.js data-fetching configuration. Content that changes frequently, such as event availability, should use an appropriate revalidation or uncached strategy where necessary.

The Strapi service may also experience a delay on its first request after inactivity, depending on its hosting plan and runtime state.

## Project Structure

The frontend follows a component-based Next.js structure. The exact directories may vary depending on the final implementation.

```text
.
├── app/              # Application routes and pages
├── components/       # Reusable UI components
├── utils/            # Data processing and helper functions
├── sass/             # SCSS styles and design variables
├── public/            # Static assets
├── package.json
└── README.md
```

## Learning Outcomes

Through building and deploying this project, I practiced:

- Developing reusable interfaces with React and Next.js.
- Implementing dynamic routing and content-driven pages.
- Integrating a headless CMS through REST API requests.
- Modeling and managing structured content in Strapi.
- Handling form submissions and API errors.
- Building responsive layouts with Sass and SCSS.
- Connecting a PostgreSQL database to a production backend.
- Deploying a full-stack application across multiple cloud platforms.
- Applying caching and performance optimization techniques.

## Course Reference

[The Freelance Stack: Real project with NextJS and Strapi — Coursera](https://www.coursera.org/learn/packt-the-freelance-stack-real-project-with-nextjs-and-strapi-usllu)
## License

This project is licensed under the MIT License. See the [LICENSE](./MIT) file for details.

