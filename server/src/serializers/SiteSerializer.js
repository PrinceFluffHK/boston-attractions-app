class SiteSerializer {
    static getSummary(array) {
        const serializedSites = array.map(site => {
            const requiredAttributes = ["name", "setting", "image", "minimumAge", "yearEstablished", "id"]
            
            let serializedSite = {}
            for(let attribute of requiredAttributes) {
                serializedSite[attribute] = site[attribute]
            }
            console.log(serializedSite)
            
            return serializedSite
        })
        
        return serializedSites
    }

    static async getInfo(site) {
        const requiredAttributes = ["name", "address", "description", "setting", "image", "minimumAge", "yearEstablished"]
        
        let serializedSite = {}
        for(let attribute of requiredAttributes) {
            serializedSite[attribute] = site[attribute]
        }
        
        const user = await site.$relatedQuery("creator")
        serializedSite.creatorUsername = await user.username
        serializedSite.reviews = await site.$relatedQuery("reviews");
        
        return serializedSite
    }
}

export default SiteSerializer