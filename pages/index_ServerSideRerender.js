// domainNAme.com/

//ServerSide Rerendering

import React from 'react';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A first Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Www.gerhard-blank.de_m%C3%BCnchen_ansicht_von_oben.jpg/640px-Www.gerhard-blank.de_m%C3%BCnchen_ansicht_von_oben.jpg',
        address: 'Saomeaddres,1234,City',
        description: 'AAA This is first meetup'
    },
    {
        id: 'm2',
        title: 'A second Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Www.gerhard-blank.de_m%C3%BCnchen_ansicht_von_oben.jpg/640px-Www.gerhard-blank.de_m%C3%BCnchen_ansicht_von_oben.jpg',
        address: 'Saome second addres,1234,City',
        description: 'This is second meetup'
    },
];
const HomePage = (props) => {

    return (
      <>
          <MeetupList meetups={props.meetups}/>
      </>
    );

};

export async function getServerSideProps (context) {  // this function will run always on the server after deployment
   const request= context.req;
   const res = context.res;

    //fetch data

    return {
        props: {
            meetups: DUMMY_MEETUPS,
        }
    };
}

export default HomePage;
