# TODO

# Overview and Project Summary

Meteor is not an application platform.  It is a fullstack Javascript framework that lets you develop a client and server and do some code-sharing between them.  For additional information of how a Meteor project is structured, see [here](https://guide.meteor.com/structure.html).  This means that Meteor has to control the build and package process of your application.

This is fundamentally different than Ubiquitous Objects, which is an application platform.  In Ubiquitous Objects, functions are first-class citizens, just like application state, data, and static assets.  Therefore, you create a single function definition on the server that is then synchronized to the client for execution. 

# Resiliency

Meteor ?? doesn't have a good story around multi-node and balancing clients.  not even anything official. They basically tell you that self-hosting is a bad idea and to use their hosting platform. https://github.com/nathanschwarz/meteor-cluster


Ubiquitous Objects




# Observability


Meteor - metrics and stuff only work on cloud??
APM is not include out of the box
Logs and CPU/Memory/Clients only available if hosted in Galaxy
No dashboard for Meteor applications


# Deployments

Meteor doesn't have a zero downtime deploy strategy unless you use Galaxy

# Data Layer

## Durable Data (Persistent data store)
Meteor is heavily integrated in MongoDB.  The livequery functionality is used to do pub/sub.  

In contrats, Ubiquitous Objects doesn't target any specific data layer.  All operations 


## Attachments

## Ephemeral Data (Cache)


# Background / Long Running Tasks


# Queues


 # Compatibility

 Meteor server/client libraries are designed to work with applications that are also written in Javascript.

 UO can specify multiple clients, which can be any consumer that follows the UO client behavior upgrade rules.  This also means that REST and GraphQL clients can be easily added to a UO server.

# Development Experience

Meteor uses a combination of package managers, Atmosphere and NPM.
- you have to observe/publish and craft them by hand.  you can't just automatically have pub/sub across your database. meteor is much lower level so you are writing the queries to determine who should see what, rather than permissions being a first class citizen.


# Client Side Performance
- multiple apps/tabs, how does it work?

Data stores - ephemeral on client side is different than regular data

DDP doesn't do deeply nested diffs of data
Only data is synced, and not server code

# Relational Data
In Meteor, if you have a related data record, and you pub/sub it, and the parent is made private, the child will stay and be stale.  
https://guide.meteor.com/data-loading.html#stores


# Users

Meteor provides account support, RBAC, UIs, and 3rd party integrations all as separate packages (some provided by the community only, and not officially maintained).  
This also means that any RBAC has to be implemented manually in Meteor.

Ubiquitous Objects, by contrast, handles all user data natively, including companies, teams, and users.  Security rules are declarative on the data model and enforced automatically by Ubiquitous Objects.