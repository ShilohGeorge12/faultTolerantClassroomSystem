import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	return [
		{
			url: `${process.env.PUBLIC_BASE_URL}/`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/classrooms/1`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/classrooms/2`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/settings`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/admin`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/login`,
		},
		// ...animeEntries,
	];
}
