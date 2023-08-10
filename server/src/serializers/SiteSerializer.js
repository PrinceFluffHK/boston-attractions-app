import ReviewSerializer from "./ReviewSerializer.js";

class SiteSerializer {
    static getSummary(array) {
        const serializedSites = array.map((site) => {
            const requiredAttributes = [
                "name",
                "setting",
                "image",
                "minimumAge",
                "yearEstablished",
                "id",
            ];

            let serializedSite = {};
            for (let attribute of requiredAttributes) {
                serializedSite[attribute] = site[attribute];
            }

            return serializedSite;
        });

        return serializedSites;
    }

    static async getInfo(site, user) {
        const requiredAttributes = [
            "name",
            "address",
            "description",
            "setting",
            "image",
            "minimumAge",
            "yearEstablished",
            "id",
        ];

        let serializedSite = {};
        for (let attribute of requiredAttributes) {
            serializedSite[attribute] = site[attribute];
        }

        // const user = await site.$relatedQuery("creator");
        serializedSite.creatorUsername = await user.username;
        const reviews = await site.$relatedQuery("reviews");
        serializedSite.reviews = await ReviewSerializer.getSummary(reviews, user);

        return serializedSite;
    }
}

export default SiteSerializer;
