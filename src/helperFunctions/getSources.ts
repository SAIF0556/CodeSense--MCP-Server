import { env } from "cloudflare:workers";

export interface SearchResult{
    title: string;
    link: string;
    snippet: string;
}
export default async function getSources(libraryName:string): Promise<SearchResult[]> {
    try {

        const response = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(libraryName)}&count=10&safesearch=strict`, {
            headers: {
                'Accept':'application/json',
                'Accept-Encoding':'gzip',
                "X-Subscription-Token": env.BRAVE_KEY as string
            }
        });
        console.log("response: ",response)
        if(!response.ok){
            console.log(`HTTP error! status: ${response.status}`)
            // throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse:{web :{
            results:[]
        }} = await response.json();
        if (!jsonResponse){
            
        }
        if(!jsonResponse.web || !jsonResponse.web.results){
            console.log('Invalid API response format')
            // throw new Error('Invalid API response format');
        }
        const final = jsonResponse.web.results.map((result:any):SearchResult=> ({
            title: result.title,
            link: result.url,
            snippet: result.description,
        }));
       
        return final;
    } catch (error) {
        console.log('Error fetching results: ',error);
        throw error;
    }
}