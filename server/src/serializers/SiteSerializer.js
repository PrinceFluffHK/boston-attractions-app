import ReviewSerializer from "./ReviewSerializer.js"

class SiteSerializer {
    static getSummary(array) {
        const serializedSites = array.map(site => {
            const requiredAttributes = ["name", "setting", "image", "minimumAge", "id"]
            
            let serializedSite = {}
            for(let attribute of requiredAttributes) {
                serializedSite[attribute] = site[attribute]
            }
            
            return serializedSite
        })
        
        return serializedSites
    }

    static async getInfo(site) {
        const requiredAttributes = ["name", "address", "description", "setting", "image", "minimumAge"]
        
        let serializedSite = {}
        for(let attribute of requiredAttributes) {
            serializedSite[attribute] = site[attribute]
        }
        
        const user = await site.$relatedQuery("creator")
        serializedSite.creatorUsername = await user.username
        const reviews = await site.$relatedQuery("reviews");
        serializedSite.reviews = ReviewSerializer.getSummary(reviews)
        
        return serializedSite
    }
}

export default SiteSerializer