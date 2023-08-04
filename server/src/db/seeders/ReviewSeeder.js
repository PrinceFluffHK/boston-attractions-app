import { Review, User, Site } from "../../models/index.js";

class ReviewSeeder {
    static async seed() {
        const bostonCommon = await Site.query().findOne("name", "Boston Common");
        const faneuilHall = await Site.query().findOne("name", "Faneuil Hall");
        const garrett = await User.query().findOne("email", "garrett@email.com");
        const matthew = await User.query().findOne("email", "matthew@email.com");

        const reviewData = [
            {
                siteId: bostonCommon.id,
                userId: garrett.id,
                rating: 5,
                textBody: "Lots of sunlight, very cool sculpture, love the coding camp down the street!",
            },
            {
                siteId: faneuilHall.id,
                userId: matthew.id,
                rating: 1,
                textBody: "Terrible historical site, 0 dead bodies",
            },
            {
                siteId: faneuilHall.id,
                userId: garrett.id,
                rating: 2,
                textBody: "I hate this place! 2 stars."
            }
        ]

        for (const singleReview of reviewData) {
            const currentReview = await Review.query().findOne({ siteId: singleReview.siteId, userId: singleReview.userId })
            if (!currentReview) {
                await Review.query().insert(singleReview)
            }
        }
    }
}

export default ReviewSeeder;