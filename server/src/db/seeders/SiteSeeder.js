import { Site, User } from "../../models/index.js";

class SiteSeeder {
    static async seed() {
        const garrett = await User.query().findOne("firstName", "Garrett");
        const matthew = await User.query().findOne("firstName", "Matthew");

        const siteData = [
            {
                name: "Boston Common",
                address: "139 Tremont St, Boston MA 02111",
                description:
                    "The Boston Common (also known as the Common) is a public park in downtown Boston, Massachusetts. It is the oldest city park in the United States. Boston Common consists of 50 acres (20 ha) of land bounded by Tremont Street (139 Tremont St.), Park Street, Beacon Street, Charles Street, and Boylston Street. The Common is part of the Emerald Necklace of parks and parkways that extend from the Common south to Franklin Park in Jamaica Plain, Roxbury, and Dorchester. The visitors' center for the city of Boston is located on the Tremont Street side of the park. The Central Burying Ground is on the Boylston Street side of Boston Common and contains the graves of artist Gilbert Stuart and composer William Billings. Also buried there are Samuel Sprague and his son Charles Sprague, one of America's earliest poets. Samuel Sprague was a participant in the Boston Tea Party and fought in the Revolutionary War. The Common was designated as a Boston Landmark by the Boston Landmarks Commission in 1977. The Common is sometimes erroneously referred to as the \"Boston Commons\". This stems from its use as a town commons starting in 1634.",
                setting: "Outdoors",
                image: "https://express-file-uploading-part-2-production.s3.amazonaws.com/Boston%2BCommon.jpeg",
                minimumAge: 0,
                yearEstablished: 1830,
                creatorId: garrett.id,
            },
            {
                name: "Faneuil Hall",
                address: "Boston MA 02109",
                description:
                    'Faneuil Hall (/ˈfænjəl/ or /ˈfænəl/; previously /ˈfʌnəl/) is a marketplace and meeting hall located near the waterfront and today\'s Government Center, in Boston, Massachusetts. Opened in 1742, it was the site of several speeches by Samuel Adams, James Otis, and others encouraging independence from Great Britain. It is now part of Boston National Historical Park and a well-known stop on the Freedom Trail. It is sometimes referred to as "the Cradle of Liberty", though the building and location have ties to slavery.',
                setting: "Indoors and Outdoors",
                image: "https://express-file-uploading-part-2-production.s3.amazonaws.com/Faneuil_Hall.jpeg",
                creatorId: garrett.id,
            },
            {
                name: "The Paul Revere House",
                address: "19 North Square, Boston MA 02113",
                description:
                    'The Paul Revere House, built c.1680, was the colonial home of American patriot and Founding Father Paul Revere during the time of the American Revolution. A National Historic Landmark since 1961, it is located at 19 North Square, Boston, Massachusetts, in the city\'s North End, and is now operated as a nonprofit museum by the Paul Revere Memorial Association. An admission fee is charged.',
                setting: "Indoors",
                yearEstablished: 1680,
                minimumAge: 13,
                image: "https://express-file-uploading-part-2-production.s3.amazonaws.com/dusty.jpeg",
                creatorId: matthew.id,
            },
        ];

        for (const singleSite of siteData) {
            const currentSite = await Site.query().findOne({ name: singleSite.name });
            if (!currentSite) {
                await Site.query().insert(singleSite);
            }
        }
    }
}

export default SiteSeeder;
