// domainNAme.com/
//StasticSiteGeneration
import React from 'react';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';  //if it is inside getStaticProps or getServerSideProps, it wilNOT be included in client side bundle during the build
import Head from 'next/head'; // to add header tot the page
const HomePage = (props) => {
    return (
      <>
          <Head>
              <title>React meetup</title>
              <meta
                name='Description'
                content='Browse the list of meetups'
              />
          </Head>
          <MeetupList meetups={props.meetups}/>
      </>
    );

};

export async function getStaticProps () { // reserved name for pre-rendering process. Runs during build procwss
    //fetch Data from API,file, DB ,...                                    //code here do not run on client side

    const client = await MongoClient.connect('mongodb+srv://oksana:test@next.xrz5n4s.mongodb.net/?retryWrites=true&w=majority');  // TO
    const db = client.db();                                                                                                           // MAKE CONNECTION
    const meetupsCollection = db.collection('next');                                                                           // TO DATABASE

    const meeetups = await meetupsCollection.find().toArray();

    client.close();                                      //TO CLOSE CONNECTION TO DATABASE
    return {
        props: {
            meetups: meeetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1 //number of seconds till Next will wait before regenerating the page for incoming request
    };
}

export default HomePage;
