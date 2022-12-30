import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { json } from 'stream/consumers';
import connectMongo from "../utils/connectMongo";
import Test from "../models/testModels";

// {test} isfrom getServerSideProps async function at the bottom on the page
export default function Home({tests}: any) {

  const createTest = async (/**no arguments */) => {

    const randomNum = Math.floor(Math.random() * 1000); // generate random num
    
    const respond = await fetch('api/test/add', { //send a request to 'api/test/add' with the contents
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //stringify Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
      body: JSON.stringify({
        name:'Test' + randomNum,
        email: 'test' + randomNum + '@test.com',
      }),
    });
    const data = await respond.json();
    // //console.log(data)
    //   return;

  };
  
  return (
    <>
      <Head>
        <title>Connect to MonogoDB</title>
        <meta name="description" content="watching video on connecting to db form a app created by next js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button onClick={createTest}> Create Test</button>

        <div className={styles.grid}>
          {/* displaying the database data */}
          {tests.map((vartest: any) => (
          <a
          href='https://cloud.mongodb.com/v2/63a7d1d792835c7d94600a7b#/metrics/replicaSet/63a7d2d1f44ba819c4c7fb7a/explorer/test/tests/find'
            key={vartest._id}
            className={styles.card}
            >
              <h2>{vartest.name} &rarr;</h2>
              <p>{vartest.email}</p>
          </a>
          ))}
        </div>
      </main>
    </>
  )
}

// getServerSideProps can be used when need to render a page whose data must be fetched at request time.
// an alternative to using api route
export const getServerSideProps = async () => {
  try { 
    console.log('%c⧭', 'color: #00e600', 'Connecting to MongoDB');

    // connect to database
    await connectMongo() // we wait for the connection to the database
    console.log("Connected to MongoDB");

    console.log("Fetching document...");

    const tests = await Test.find()// fetches all

    console.log("Fetched document");
    console.log("done........");

    return {
      props:{
        tests: JSON.parse(JSON.stringify(tests)) 
         // you have to santize the data. first by making a string, then by parsing it
      }
    };

  }
  catch (error) {
    console.log({error})
    return{
      notFound: true
    };
  }

}