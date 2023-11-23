# Project Description
A learning platform for users to deep dive on topics utilizing the power of AI to help generate relevant Youtube videos, detailed chapters, and an end of unit recap quiz.

Built with Next.js 13.4, TailwindCSS, Prisma, PlanetScale DB, and more!

## Getting Started

1. Download dependencies once the repo has been cloned:
```bash
// Instal dependencies:
npm install

// Run development server:
npm run dev
```
2. Set up .env file
   
```bash
DATABASE_URL=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_SECRET='Canbeanythingyouwant'

OPENAI_API_KEY=

UNSPLASH_API_KEY=
YOUTUBE_API=

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_URL='http://localhost:3000'
```
Notes: 
- The Databse used in this project is Planetscale
- The ORM of choice is Prisma
- Documentation for OpenAI API: https://platform.openai.com/docs/api-reference
- Documentation for Unsplash API: https://unsplash.com/documentation
- Documentation for Youtube API: https://developers.google.com/youtube/v3/getting-started
- Documentation for Stripe Integration: https://stripe.com/docs


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3. Once the APIs are set up (mainly just need the database connected) run:
   
```bash
// To push models into database:
npx prisma db push

// To view your database with prisma:
npx prisma studio

```

## Screenshots

![Screenshot 2023-11-23 at 2 11 35 PM](https://github.com/Eddie-Kuo/craft-course-learning-ai/assets/105310669/fda93d40-a3da-4d0b-8030-92a63c9560e7)
![Screenshot 2023-11-23 at 2 11 22 PM](https://github.com/Eddie-Kuo/craft-course-learning-ai/assets/105310669/2b2bd8d8-ae8e-4abb-9d16-48b4d2306511)
![Screenshot 2023-11-23 at 2 11 05 PM](https://github.com/Eddie-Kuo/craft-course-learning-ai/assets/105310669/9e6b928b-9efd-4e6a-a1ba-44ae4cb1434e)


