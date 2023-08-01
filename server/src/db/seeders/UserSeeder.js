import { User } from "../../models/index.js";

class UserSeeder {
    static async seed() {
        const userData = [
            {
                email: "garrett@email.com",
                cryptedPassword: "aljfbisub©øiunIOUZsdbvsuzbfbiu",
            },
            {
                email: "matthew@email.com",
                cryptedPassword: "ihdiviuvxkvniuewzubgriuhxdjrgziuhr"
            }
        ] 

        for (const singleUser of userData) {
            const currentUser = await User.query().findOne({ email: singleUser.email })
            if (!currentUser) {
                await User.query().insert(singleUser)
            } 
        }
    }
}

export default UserSeeder