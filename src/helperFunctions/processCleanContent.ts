import { env } from 'cloudflare:workers';
import { SearchResult } from './getSources';
import FirecrawlApp from '@mendable/firecrawl-js';

export interface ContentResult extends SearchResult {
	html: string;
}

// Check if URL is a GitHub repository URL
export async function isGithubRepoUrl(url: string): Promise<boolean> {
	return (
		url.startsWith('https://github.com/') &&
		url.split('/').length >= 5 && // Must have username and repo
		!url.includes('blob') &&
		!url.includes('tree')
	);
}

// Check if URL is a documentation site
export async function isDocsUrl(url: string): Promise<boolean> {
	return url.includes('docs.') || url.includes('/docs/') || url.includes('/documentation/') || url.endsWith('/docs');
}

export async function fetchGithubContent(repoUrl: string) {
	try {
		// Call Flask API to process the GitHub repository
		const response = await fetch('https://targeting.leapxads.com/gitingest/process-github', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				repo_url: repoUrl,
			}),
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Flask API returned error: ${response.status} ${errorText}`);
		}

		const result: { content: string } = await response.json();

		// Check if content exists in the response
		if (!result.content) {
			throw new Error('Flask API returned no content');
		}
		return result.content;
	} catch (error) {
		console.error(`Error fetching GitHub content from ${repoUrl}:`, error);
		throw error;
	}
}

// Placeholder for your firecrawl implementation
export async function fetchDocsWithFirecrawl(docsUrl: string, retries = 3) {
	for (let i = 0; i < retries; i++) {
		try {
			const firecrawl = new FirecrawlApp({ apiKey: env.FIRECRAWL_KEY });
			const content: any = await firecrawl.scrapeUrl(docsUrl);
			return content.markdown;
		} catch (error) {
			if (i === retries - 1) {
				throw new Error(error instanceof Error ? error.message : 'Scraping failed');
			}
			await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** i));
		}
	}
	throw new Error('Scraping failed after retries');
}
