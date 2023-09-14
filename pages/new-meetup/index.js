import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import Head from 'next/head';

const NewMeetupPage = () => {
    const router = useRouter();
    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-type': 'application/json',
            }
        });

        const data = await response.json();

        router.push('/');
    };
    return (
      <>
          <Head>
              <title>React meetup</title>
              <meta
                name='Description'
                content='Create new meetup opportunity'
              />
          </Head>
          <NewMeetupForm onAddMeetup={addMeetupHandler}/>
      </>

    );

};

export default NewMeetupPage;
