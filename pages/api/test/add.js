import connectMongo from "../../../utils/connectMongo";
import Test from "../../../models/testModels";
import { exit } from "process";

/**
 * 
 * @param {import{'next'}.NextAPIRequest} req 
 * @param {import{'next'}.NextAPIRespone} res 
 */

// to test this type this in web or postmam: http://localhost:3000/api/test/add

// this is a post request not a get
/**
 * Body should be this
{
    "name":"Test5",
    "email": "test5@test.com"
}
 */
export default async function add(req, res )
{
  //res.status(200).json({ name: 'John Smith' })
  try { 
    const {name, email} = req.body; // parse the request 
    console.log('%c Connecting to MongoDB','color: #bada55');

    // connect to database and create a new model

    await connectMongo() // we wait for the connection to the database
    console.log("Connected to MongoDB");


    console.log("Creating document...");

    const test = await Test.create(req.body);
    console.log("Created document");
    console.log(test);
    res.json({test})// returns json

  }
  catch (error) {
    res.json({error})
    console.log({error})
  }

  console.log("done...");

}
