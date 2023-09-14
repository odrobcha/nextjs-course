
// /api/new-meetup
// POST /api/new-meetup

import {MongoClient} from 'mongodb';

async function handler(req,res){
   // req - request object body, headers, method, ....

    if (req.method === 'POST'){
        const data = req.body;
      //  const {title, image, address, description} = data;

        const client = await MongoClient.connect('mongodb+srv://oksana:test@next.xrz5n4s.mongodb.net/?retryWrites=true&w=majority');
        const db = client.db();

        const  meetupsCollection = db.collection('next');
        const result = await meetupsCollection.insertOne(data);
        client.close();
        res.status(201).json({message: "Meetup inserted"});

    }
}

export default handler;
