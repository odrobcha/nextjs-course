import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

const meetupDetailPage = (props) => {
    return (
      <>
          <Head>
              <title>{props.meetupData.title}</title>
              <meta
                name='Description'
                content={`Detail of ${props.meetupData.title}`}
              />
          </Head>
          <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
          />
      </>
    );
};

export async function getStaticPaths () {
    const client = await MongoClient.connect('mongodb+srv://oksana:test@next.xrz5n4s.mongodb.net/?retryWrites=true&w=majority');  // TO
    const db = client.db();                                                                                                           // MAKE CONNECTION
    const meetupsCollection = db.collection('next');                                                                           // TO DATABASE

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {                             //  has to be exported if using getStaticProps on dynamic page [meetupId] Object with all possible paths
        fallback: true,  //can be true, false or 'blocking' // true - immidiatly return empty page, with 'blocking' user will see nothing before page is generated and populated with data (no empty page)//says if paths contain all path values. FALSE - means contain ALL, TRUE - next willtry to generate page dynamically for id which is not in paths
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
        // paths:[
        //     {
        //         params: {
        //             meetupId : 'm1'  // it HAS to be the same name as the dynamic folder name
        //         },
        //     },
        //     {
        //         params: {
        //             meetupId : 'm2'
        //         },
        //     },
        //     {
        //         params: {
        //             meetupId : 'm3'
        //         },
        //     },
        //
        // ],

    };
}

export async function getStaticProps (context) {                            // reserved name for pre-rendering process. Runs during build procwss
    //fetch Data from API,file, DB ,...                                    //code here do not run on client side

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://oksana:test@next.xrz5n4s.mongodb.net/?retryWrites=true&w=majority');  // TO
    const db = client.db();                                                                                                           // MAKE CONNECTION
    const meetupsCollection = db.collection('next');                                                                         // TO DATABASE

    const objId = new ObjectId(meetupId);
    const selectedMeetup = await meetupsCollection.findOne({ _id: objId });
    client.close();
    return {
        props: {
            meetupData: {
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description,
                id: selectedMeetup._id.toString()
            },
        },

    };
}

export default meetupDetailPage;
