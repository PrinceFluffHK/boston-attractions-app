/* eslint-disable no-console */
import { connection } from "../boot.js"
import SiteSeeder from "./seeders/SiteSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"
import ReviewSeeder from "./seeders/ReviewSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding users")
    await UserSeeder.seed()

    console.log("Seeding sites")
    await SiteSeeder.seed()

    console.log("Seeding reviews")
    await ReviewSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder