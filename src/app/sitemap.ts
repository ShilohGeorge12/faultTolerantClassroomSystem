import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	return [
		{
			url: `${process.env.PUBLIC_BASE_URL}/classrooms`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/classrooms/1`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/classrooms/2`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/find-classrooms`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/settings`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/login`,
		},
		{
			url: `${process.env.PUBLIC_BASE_URL}/signup`,
		},
		// ...animeEntries,
	];
}
