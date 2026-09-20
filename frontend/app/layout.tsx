import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'WhySchool. | Strategic B2B Experiential Partner for Educational Institutions',
  description:
    'WhySchool is the strategic B2B experiential partner for premier educational institutions and top brands — building real-world innovators, researchers, and student founders beyond traditional syllabi.',
  keywords: [
    'WhySchool',
    'Experiential Education',
    'Beyond Curriculum',
    'Student Founders',
    'Young Innovators',
    'School Incubation',
    'K-12 Leadership Pods',
    'College Venture Creation',
    'IIT Bhubaneswar Partner',
    'Education B2B Partner',
  ],
  authors: [{ name: 'WhySchool Ecosystem' }],
  openGraph: {
    title: 'WhySchool. | Building Young India Beyond Curriculums',
    description:
      'Degrees prove knowledge, but hands-on execution, leadership, and real-world exposure build true future readiness. Explore WhySchool experiential pods.',
    url: 'https://whyschool.co',
    siteName: 'WhySchool.',
    images: [
      {
        url: 'https://whyschool.co/assets/whyschool_hero_campus.jpg',
        width: 1200,
        height: 630,
        alt: 'WhySchool Beyond Curriculum Ecosystem',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhySchool. | Experiential Learning Ecosystem',
    description:
      'Premier educational institutions and top brands trust WhySchool as their strategic B2B experiential partner.',
    images: ['https://whyschool.co/assets/whyschool_hero_campus.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'WhySchool.',
    url: 'https://whyschool.co',
    logo: 'https://whyschool.co/assets/logos/iit_bhubaneswar.jpg',
    description:
      'Strategic B2B experiential partner for premier educational institutions and top brands — building real-world innovators, researchers, and student founders beyond traditional syllabi.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://linkedin.com/company/whyschool',
      'https://github.com/ritikprajjwalsahu-del/Whyschool-website',
    ],
  };

  return (
    <html lang="en" className={raleway.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0B0D11] text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
