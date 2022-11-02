

//import { Database, SQLite3Connector } from 'https://deno.land/x/denodb/mod.ts';
/*import { Model } from 'https://deno.land/x/denodb/mod.ts';

class Business extends Model {}

// register DB Models

class Business extends Model {
    // ...
  
    static fields = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
  
      // If we need to set the length for `name`, we can also use
      // an object
      name: {
        type: DataTypes.STRING,
        length: 25,
      },
  
      // Or use a shortcut (check field descriptors to learn more)
      name: DataTypes.string(25),
    };
  }
*/



export interface Task {

}



// In order to decouple the task module, we need some clear lines of delineation.
// Tasks will ultimately use the persistence module and atomic pops to process, but for now, it'll all be in memory.
// Tasks create metrics, and they report out to the rest of the system.



//TODO: are tasks EXACTLY ONCE or AT LEAST ONCE semantics?
// TODO: metrics for tasks. Metrics must be first class citizens within our system.  

// You should be able to do the following actions:

// Enqueue a new task.  Given a TypeScript function

// Create a schedule for new tasks to be enqueued.  Must support deduplication and 

// All tasks must adhere to the same interface.  It is like an AWS Lambda or something, where we give them an SDK that processes
// the invocation payload.


export interface User {
  id: string; //todo: GUID
  // todo: add additional attributes
}


export interface TaskInput {
    // Who am I running this task as
    user: User
}


export function getTasks(prefix: string) {
    // const connector = new SQLite3Connector({
    // filepath: './database.sqlite',
    // });

    // const db = new Database(connector);
    // //db.link([Business]);
    // db.sync();
}



/*
In case of pivot models created with Relationships.manyToMany, it is good practice to put them first:

const BusinessOwner = Relationships.manyToMany(Business, Owner);

db.link([BusinessOwner, Business, Owner]);

Copy
Synchronize models

Synchronizing your models means making sure your models are available in the provided database. If they do not exist, synchronizing will create them.

db.sync();

Copy
Some of these tables might have values already and so you might want to drop them:

db.sync({ drop: true });

Query models

Once we have all the models created, we can easily query them.

Using query builder

Query builder allows you to generate queries using only simple, abstract methods.

More information about available methods can be found in Model methods.
Here is a list of examples:

await Flight.create([
  {
    departure: 'Paris',
    destination: 'Tokyo',
  },
  {
    departure: 'London',
    destination: 'San Francisco',
  },
]);

await Flight.select('destination').all();
// [ { destination: "Tokyo" }, { destination: "San Francisco" } ]

await Flight.where('destination', 'Tokyo').delete();

await Flight.all();
// [
//  {
//    id: 2,
//    departure: "London",
//    destination: "San Francisco",
//    flightDuration: 2.5,
//    created_at: 2020-05-17T13:16:32.333Z,
//    updated_at: 2020-05-17T13:16:32.333Z
//   }
// ]

await Flight.select('destination').find('2');
// [ { destination: "San Francisco" } ]

await Flight.count();
// 1

await Flight.select('id', 'destination').orderBy('id').get();
// [ { id: "2", destination: "San Francisco" } ]

Copy
Using model records

You can also create, update and delete model records by using the model record itself.

More information about using model records can be found in Model records.
const flight = new Flight();
flight.departure = 'Dublin';
flight.destination = 'Paris';
flight.flightDuration = 3;
await flight.save();

flight.departure = 'Tokyo';
await flight.update();

await flight.delete();

Copy




Transactions

Transactions are helpful to run a list of inter-dependent queries that could potentially break. If one doesn't work, it shouldn't impact the others and roll back the previous queries.

Any query that goes inside a transaction block, will only be run if all of them have been successfully executed.

Transactions are supported on MySQL, MariaDB, SQLite and Postgres (not MongoDB).
const db = new Database(connection);

// Declare your models and link them to your database

await db.transaction(async () => {
  const user = await User.create({ name: 'Joelle' });
  await Payments.create({ userId: user.id, amount: 20 });
});

Copy
Just to make sure it's all clear for you: if User.create or Payments.create fails, this whole block will be dismissed and it will be as if nothing had happened.






Foreign key

Foreign keys are the basics for modelizing relationships between entities.

In this guide, we will consider the following two entities:

owner:
  - id
  - name

business:
  - id
  - name

Copy
We want to associate each business to an owner. If a business is deleted, it should not delete the owner as it is just a one-way binding.

Create models

Let's first create our models:

import { Model } from 'https://deno.land/x/denodb/mod.ts';

class Owner extends Model {
  static table = 'owners';

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };
}

class Business extends Model {
  static table = 'businesses';

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };
}

Copy
Model belongs to...

To explicitely indicate that Business belongs to Owner, we need to add a ownerId field to Business.

A simple way of doing this, following the correct naming convention is through the Relationships.belongsTo helper:

import { Relationships } from 'https://deno.land/x/denodb/mod.ts';

// After both models declarations

Relationships.belongsTo(Business, Owner);

// Before database linking

Copy
This will make ownerId a foreign key based on Owner.id primary key.

Add a querying method to our model

On the receiving model Owner, we will add a method to simply fetch a business which is associated to:

class Business extends Model {
  // ...

  // Fetch an owner binded to this business
  static owner() {
    return this.hasOne(Owner);
  }
}

Copy
this.hasOne(Owner) will look for an Owner instance where its primary key id matches the Business.ownerId field.

Create models' values

After linking and syncing our models with the database, we can now create some values:

await Owner.create({
  id: '1',
  name: 'John',
});

await Business.create({
  id: '1',
  name: 'Parisian Café',
  ownerId: '1',
});

Copy
Query models

To query our models, we can now use the methods we created in the first place:

await Business.where('id', '1').owner();
// { id: "1", name: "John" }

Copy
Example

import {
  Database,
  DataTypes,
  Model,
  Relationships,
} from 'https://deno.land/x/denodb/mod.ts';

const db = new Database(...);

class Owner extends Model {
  static table = "owners";

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };
}

class Business extends Model {
  static table = "businesses";

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };

  static owner() {
    return this.hasOne(Owner);
  }
}

Relationships.belongsTo(Business, Owner);

db.link([Owner, Business]);

await db.sync({ drop: true });

await Owner.create({
  id: "1",
  name: "John",
});

await Business.create({
  id: "1",
  name: "Parisian Café",
  ownerId: "1",
});

await Business.where("id", "1").owner();

await db.close();







One-to-one

In this guide, we will consider the following two entities:

owner:
  - id
  - name

business:
  - id
  - name

Copy
We want each business to belong to one owner and therefore each owner to be attached to one owner.

Create models

Let's first create our models:

import { Model } from 'https://deno.land/x/denodb/mod.ts';

class Owner extends Model {
  static table = 'owners';

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };
}

class Business extends Model {
  static table = 'businesses';

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };
}

Copy
Add querying methods to models

On each model, we will now add a method to simply query a model's relationship value, e.g. in this case a business' owner or an owner's business. Let's learn about hasOne:

class Owner extends Model {
  // ...

  // Fetch a business binded to this owner
  static business() {
    return this.hasOne(Business);
  }
}

class Business extends Model {
  // ...

  // Fetch an owner binded to this business
  static owner() {
    return this.hasOne(Owner);
  }
}

Copy
this.hasOne(Owner) will look for an Owner instance where its ID matches the Business.ownerId field.

Generate relationship fields on models

In order for hasOne to work, we need to add both ownerId and businessId fields on respectively Business and Owner models.

A simple way of doing this, following the correct naming convention is through using the Relationships.oneToOne helper:

import { Relationships } from 'https://deno.land/x/denodb/mod.ts';

// After both models declarations

Relationships.oneToOne(Business, Owner);

// Before database linking

Copy
This will automatically:

Add a businessId field to Owner
Add an ownerId field to Business
Both fields will be set as foreign keys.

Under-the-hood, Relationships.belongsTo is used on both fields.
Create models' values

After linking and syncing our models with the database, we can now create some values:

await Owner.create({
  id: '1',
  name: 'John',
});

await Business.create({
  id: '1',
  name: 'Parisian Café',

  // Bind the business to an owner
  ownerId: '1',
});

// Bind the owner to a business
await Owner.where('id', '1').update({ businessId: '1' });

Copy
This is two-fold, as the foreign key constraint couldn't be validated if we were to set a businessId for a business that does not exist yet.

Query models

To query our models, we can now use the methods we created in the first place:

await Business.where('id', '1').owner();
// { id: "1", name: "John", businessId: 1 }

await Owner.where('id', '1').business();
// { id: "1", name: "Parisian Café", ownerId: 1 }

Copy
Example

const db = new Database(...);

class Owner extends Model {
  static table = 'owners';

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };

  static business() {
    return this.hasOne(Business);
  }
}

class Business extends Model {
  static table = 'businesses';

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };

  static owner() {
    return this.hasOne(Owner);
  }
}

Relationships.oneToOne(Business, Owner);

db.link([Owner, Business]);

await db.sync({ drop: true });

await Owner.create({
  id: '1',
  name: 'John',
});

await Business.create({
  id: '1',
  name: 'Parisian Café',
  ownerId: '1',
});

await Owner.where('id', '1').update({ businessId: '1' });

await Business.where('id', '1').owner();
await Owner.where('id', '1').business();

await db.close();





One-to-many

In this guide, we will consider the following two entities:

owner:
  - id
  - name

business:
  - id
  - name

Copy
We want each business to belong to one owner and each owner to own zero or many businesses (0..n).

Create models

Let's first create our models:

import { Model } from 'https://deno.land/x/denodb/mod.ts';

class Owner extends Model {
  static table = 'owners';

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };
}

class Business extends Model {
  static table = 'businesses';

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };
}

Copy
Add querying methods to models

On each model, we will now add a method to simply query a model's relationship value, e.g. in this case a business' owner or an owner's businesses:

class Owner extends Model {
  // ...

  // Fetch businesses binded to this owner
  static businesses() {
    return this.hasMany(Business);
  }
}

class Business extends Model {
  // ...

  // Fetch an owner binded to this business
  static owner() {
    return this.hasOne(Owner);
  }
}

Copy
this.hasMany(Business) will look for Business instances where their Business.ownerId matches the Owner.id (its primary key).
this.hasOne(Owner) will look for an Owner instance where its ID matches the Business.ownerId field.
Add a foreign key

In order for this relationship to work, we need to add an ownerId field to Business.

You can easily add this foreign key to Business using Relationships.belongsTo:

import { Relationships } from 'https://deno.land/x/denodb/mod.ts';

// After both models declarations

Relationships.belongsTo(Business, Owner);

// Before database linking

Copy
ownerId will be set as a foreign key on Owner.id.

Create models' values

After linking and syncing our models with the database, we can now create some values:

await Owner.create({
  id: '1',
  name: 'John',
});

await Business.create({
  id: '1',
  name: 'Parisian Café',

  // Bind the business to an owner
  ownerId: '1',
});

await Business.create({
  id: '2',
  name: 'Something About Us',

  // Same here
  ownerId: '1',
});

Copy
Query models

To query our models, we can now use the methods we created in the first place:

await Owner.where('id', '1').businesses();
// [
//   { id: "1", name: "Parisian Café", ownerId: 1 },
//   { id: "2", name: "Something About Us", ownerId: 1 }
// ]

await Business.where('id', '1').owner();
// { id: "1", name: "John" }

await Business.where('id', '2').owner();
// { id: "1", name: "John" }

Copy
Example

const db = new Database(...);

class Owner extends Model {
  static table = 'owners';

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };

  static businesses() {
    return this.hasMany(Business);
  }
}

class Business extends Model {
  static table = 'businesses';

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };

  static owner() {
    return this.hasOne(Owner);
  }
}

Relationships.belongsTo(Business, Owner);

db.link([Owner, Business]);

await db.sync({ drop: true });

await Owner.create({
  id: '1',
  name: 'John',
});

await Business.create({
  id: '1',
  name: 'Parisian Café',
  ownerId: '1',
});

await Business.create({
  id: '2',
  name: 'Something About Us',
  ownerId: '1',
});

await Owner.where('id', '1').businesses();
await Business.where('id', '1').owner();
await Business.where('id', '2').owner();

await db.close();






Many-to-many

In this guide, we will consider the following two entities:

owner:
  - id
  - name

business:
  - id
  - name

Copy
We want each business to belong to zero or many owners and each owner to own zero or many businesses (n..n).

Create models

Let's first create our models:

import { Model } from 'https://deno.land/x/denodb/mod.ts';

class Owner extends Model {
  static table = 'owners';

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };
}

class Business extends Model {
  static table = 'businesses';

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };
}

Copy
Add querying methods to models

On each model, we will now add a method to simply query a model's relationship value, e.g. in this case a business' owners or an owner's businesses:

class Owner extends Model {
  // ...

  // Fetch businesses binded to this owner
  static businesses() {
    return this.hasMany(Business);
  }
}

class Business extends Model {
  // ...

  // Fetch owners binded to this business
  static owners() {
    return this.hasMany(Owner);
  }
}

Copy
Modeling our n..n relationship using a pivot model

You might have heard that in order to modelize n..n relationships, we need to create a pivot model which allows each entity to be connected to each other.

We can easily create this pivot model using Relationships.manyToMany:

import { Relationships } from 'https://deno.land/x/denodb/mod.ts';

// Generate a pivot model for Business and Owner
const BusinessOwner = Relationships.manyToMany(Business, Owner);

Copy
This will generate a pivot model with three fields:

id to identify a connection between a business and an owner
ownerId to identify which owner is connected to which business
businessId to identify which business is connected to which owner
This is all we need to do to modelize our relationship.

The field naming convention is the model name, lowercased, followed by Id. Another model Flight would therefore be represented by a flightId field.
Synchronize models

This is a little different from the usual relationships. We indeed need to also link our newly created pivot model.

It should be put first in the list, before the actual models it's connecting:

db.link([BusinessOwner, Business, Owner]);

Copy
Create models' values

After linking and syncing our models with the database, we can now create some values:

await Owner.create([
  {
    id: '1',
    name: 'John',
  },
  {
    id: '2',
    name: 'Sarah',
  },
]);

await Business.create([
  {
    id: '1',
    name: 'Parisian Café',
  },
  {
    id: '2',
    name: 'Something About Us',
  },
]);

// Bind each business to an owner, both ways
// Both business and owner instances need to be created at this point
await BusinessOwner.create([
  { businessId: '1', ownerId: '1' },
  { businessId: '1', ownerId: '2' },
  { businessId: '2', ownerId: '1' },
]);

Copy
Query models

To query our models, we can now use the methods we created in the first place:

await Owner.where('id', '1').businesses();
// [
//   { id: "1", businessId: 1, ownerId: 1, name: "Parisian Café" },
//   { id: "2", businessId: 2, ownerId: 1, name: "Something About Us" }
// ]

await Owner.where('id', '2').businesses();
// [ { id: "1", businessId: 1, ownerId: 2, name: "Parisian Café" } ]

await Business.where('id', '2').owners();
// [ { id: "1", businessId: 2, ownerId: 1, name: "John" } ]

Copy
Example

const db = new Database(...);

class Owner extends Model {
  static table = 'owners';

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };

  static businesses() {
    return this.hasMany(Business);
  }
}

class Business extends Model {
  static table = 'businesses';

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };

  static owners() {
    return this.hasMany(Owner);
  }
}

const BusinessOwner = Relationships.manyToMany(Business, Owner);

db.link([BusinessOwner, Business, Owner]);

await db.sync({ drop: true });

await Owner.create([
  {
    id: '1',
    name: 'John',
  },
  {
    id: '2',
    name: 'Sarah',
  },
]);

await Business.create([
  {
    id: '1',
    name: 'Parisian Café',
  },
  {
    id: '2',
    name: 'Something About Us',
  },
]);

await BusinessOwner.create([
  { businessId: '1', ownerId: '1' },
  { businessId: '1', ownerId: '2' },
  { businessId: '2', ownerId: '1' },
]);

await Owner.where('id', '1').businesses();
await Owner.where('id', '2').businesses();
await Business.where('id', '2').owners();

await db.close();
*/