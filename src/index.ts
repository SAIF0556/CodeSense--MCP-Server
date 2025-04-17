
import { WorkerEntrypoint } from 'cloudflare:workers'
import { ProxyToSelf } from 'workers-mcp'
import  getSources from "./helperFunctions/getSources"
import { fetchDocsWithFirecrawl, fetchGithubContent, isDocsUrl, isGithubRepoUrl } from './helperFunctions/processCleanContent'


export default class MyWorker extends WorkerEntrypoint<Env> {
  /**
   * A warm, friendly greeting from your new Workers MCP server.
   * @param name {string} the name of the person we are greeting.
   * @return {string} the contents of our greeting.
   */
  sayHello(name: string) {
    return `Hello from an MCP Worker, ${name}!`
  }

  /**
   * Get the documentation of the library which is used in generating code
   * @param libraryName {string} the name of the library used in generating code.
   * @param langName {string} the language in which the code will be generated eg: python, javascript.
   * @return {any} the contents documentation page.
   */
  async getDocs(libraryName: string, langName: string){
     // First, get the search results
  const sources = await getSources(libraryName+ "docs for "+langName);
  
  if (sources.length === 0) {
    console.log("No sources found");
    return [];
  }
  
  let results = null;
  
  // Try to find and process the first suitable URL
  for (const source of sources) {
    const url = source.link;
    
    console.log(`Checking URL: ${url}`);
    
    try {
      if (await isGithubRepoUrl(url)) {
        console.log(`Found GitHub repo URL: ${url}`);
        results = await fetchGithubContent(url);
        return results
      } else if (await isDocsUrl(url)) {
        console.log(`Found docs URL: ${url}`);
        results = await fetchDocsWithFirecrawl(url);
        return results
      }
    } catch (error) {
      console.error(`Error processing ${url}:`, error);
      console.log("Continuing to next URL...");
      // Continue to the next URL if there's an error
      continue;
    }
  }
  
  console.log("No suitable GitHub or docs URLs found or all processing attempts failed");
  return sources; // Return the search results if no suitable URL is found or processing failed
  }

  /**
   * @ignore
   **/
	async fetch(request: Request): Promise<Response> {
		return new ProxyToSelf(this).fetch(request);
	}
}