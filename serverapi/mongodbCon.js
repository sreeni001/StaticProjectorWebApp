const {MongoClient} = require('mongodb');

const uri = 'mongodb+srv://Sreeni:Sreeni123@samplecluster.yc92z.mongodb.net/?retryWrites=true&w=majority&appName=SampleCluster';
const client = new MongoClient(uri);

let db;

async function connectToMongo(){
    if(db) return db;

    else{
        try{
            await client.connect();
            db=client.db('IIOT-Project');
            console.log('mongodb connected successfully...');
            return db;

        }
        catch(error){
            console.log('Error in connecting to mongodb',error);
        }
    }
}

module.exports = connectToMongo;