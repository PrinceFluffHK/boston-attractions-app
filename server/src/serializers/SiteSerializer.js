class SiteSerializer {
    static async getInfo(site) {
        const requiredAttributes = ["name", "address", "description", "setting", "image", "minimumAge"]
        
        let serializedSite = {}
        for(let attribute of requiredAttributes) {
            serializedSite[attribute] = site[attribute]
        }
        
        const user = await site.$relatedQuery("users")
        serializedSite.creatorUsername = await user.username
        serializedSite.reviews = await site.$relatedQuery("reviews");
        
        return serializedSite
    }
    
    static getSummary(site) {
        const requiredAttributes = ["name", "setting", "image", "minimumAge", "id"]
        
        let serializedSite = {}

        for(let attribute of requiredAttributes) {
            serializedSite[attribute] = site[attribute]
        }

        return serializedSite
    }
}

export default SiteSerializer