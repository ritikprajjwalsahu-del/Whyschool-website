import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://whyschool.in';
  const currentDate = new Date().toISOString();

  return [
    { url: baseUrl, lastModified: currentDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/#methodology`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/#philosophy`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/#partners`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/#k12-programs`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/#college-programs`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/#impact-calculator`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
