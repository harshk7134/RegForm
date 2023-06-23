require('dotenv').config();
import { connect, connection } from 'mongoose';
import Country from './models';
import City from './models';
import State from './models';

const dbConnectionString = process.env.DB_CONNECTION_STRING;
connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



  async function seedDatabase() {
    try {
    
      const india = await Country.create({ name: 'India' });
      const usa = await Country.create({ name: 'USA' });
  
  
      const delhi = await State.create({ name: 'Delhi', country: india._id });
      const haryana = await State.create({ name: 'Haryana', country: india._id });
  
      
      await City.create({ name: 'Badarpur', state: delhi._id });
      await City.create({ name: 'Laxmi Nagar', state: delhi._id });
  
    
      await City.create({ name: 'Gurgaon', state: haryana._id });
      await City.create({ name: 'Faridabad', state: haryana._id });

    
        const california = await State.create({ name: 'California', country: usa._id });
        const texas = await State.create({ name: 'Texas', country: usa._id });

        
        await City.create({ name: 'Los Angeles', state: california._id });
        await City.create({ name: 'San Francisco', state: california._id });

  
        await City.create({ name: 'Houston', state: texas._id });
        await City.create({ name: 'Dallas', state: texas._id });
  
      console.log('Database seeded successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
    } finally {
      connection.close();
    }
  }
  

  seedDatabase();
  