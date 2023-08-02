/* eslint-disable no-console */
import { connection } from "../boot.js"
import ReviewSeeder from "./seeders/ReviewSeeder.js"
import SiteSeeder from "./seeders/SiteSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"

class Seeder {
  static async seed() {
    await SiteSeeder.seed()
    await UserSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder