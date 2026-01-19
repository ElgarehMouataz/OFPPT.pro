const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

const DOMAIN = 'https://ofppt.pro';
const API_BASE_URL = 'https://podo.b1.ma/api/public';

// Fetch data from your API
async function fetchData() {
  try {
    const allRoutes = [];
    
    // 1. Fetch all years
    console.log('📡 Fetching years...');
    const yearsResponse = await fetch(`${API_BASE_URL}/years`);
    const yearsData = await yearsResponse.json();
    const years = yearsData.data;
    
    console.log(`✅ Found ${years.length} years`);
    
    // Loop through each year
    for (const year of years) {
      // Add filières route for this year
      allRoutes.push({
        url: `/Choix-Annees/${year.id}/Choix-Fillieres`,
        changefreq: 'weekly',
        priority: 0.8
      });
      
      // 2. Fetch filieres for this year
      console.log(`📡 Fetching filières for year ${year.name}...`);
      const filieresResponse = await fetch(`${API_BASE_URL}/years/${year.id}/filieres`);
      const filieresData = await filieresResponse.json();
      const filieres = filieresData.data;
      
      console.log(`✅ Found ${filieres.length} filières for ${year.name}`);
      
      // Loop through each filière
      for (const filiere of filieres) {
        // Add modules route for this filière
        allRoutes.push({
          url: `/Choix-Annees/${year.id}/Choix-Fillieres/${filiere.id}/Choix-Modules`,
          changefreq: 'weekly',
          priority: 0.7
        });
        
        // 3. Fetch modules for this filière
        console.log(`📡 Fetching modules for ${filiere.name}...`);
        const modulesResponse = await fetch(`${API_BASE_URL}/filieres/${filiere.id}/modules`);
        const modulesData = await modulesResponse.json();
        const modules = modulesData.data;
        
        console.log(`✅ Found ${modules.length} modules for ${filiere.name}`);
        
        // Loop through each module
        for (const module of modules) {
          // Add resources route for this module
          allRoutes.push({
            url: `/Choix-Annees/${year.id}/Choix-Fillieres/${filiere.id}/Choix-Modules/${module.id}/Choix-Resources`,
            changefreq: 'monthly',
            priority: 0.6
          });
        }
      }
    }
    
    return allRoutes;
  } catch (error) {
    console.error('❌ Error fetching data from API:', error.message);
    throw error;
  }
}

async function generateSitemap() {
  try {
    console.log('🚀 Starting sitemap generation...\n');
    
    // Fetch all dynamic routes from API
    const dynamicRoutes = await fetchData();
    
    console.log(`\n✅ Successfully fetched ${dynamicRoutes.length} dynamic routes`);
    
    // Static routes
    const staticRoutes = [
      { url: '/', changefreq: 'weekly', priority: 1.0 },
      { url: '/Choix-Annees', changefreq: 'weekly', priority: 0.9 },
    ];
    
    console.log('📝 Generating sitemap file...');
    
    // Create sitemap
    const sitemap = new SitemapStream({ 
      hostname: DOMAIN,
      xmlns: {
        news: false,
        xhtml: false,
        image: false,
        video: false
      }
    });
    const writeStream = createWriteStream(path.resolve(__dirname, 'public', 'sitemap.xml'));

    sitemap.pipe(writeStream);

    // Add static routes
    staticRoutes.forEach(route => {
      sitemap.write(route);
    });
    
    // Add dynamic routes
    dynamicRoutes.forEach(route => {
      sitemap.write(route);
    });

    sitemap.end();

    await streamToPromise(sitemap);
    
    const totalRoutes = staticRoutes.length + dynamicRoutes.length;
    console.log('\n✅ Sitemap generated successfully!');
    console.log(`📍 Total URLs: ${totalRoutes}`);
    console.log(`   - Static routes: ${staticRoutes.length}`);
    console.log(`   - Dynamic routes: ${dynamicRoutes.length}`);
    console.log('📁 Location: public/sitemap.xml');
    console.log(`🌐 Will be available at: ${DOMAIN}/sitemap.xml\n`);
  } catch (err) {
    console.error('\n❌ Error generating sitemap:', err.message);
    process.exit(1);
  }
}

generateSitemap();