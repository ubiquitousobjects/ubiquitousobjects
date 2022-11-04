---
slug: why-ubiquitous-objects
title: Why Ubiquitous Objects
authors:
  name: Ubiquitous Objects
  title: Ubiquitous Objects Core Team
  url: https://github.com/wgao19
  image_url: https://github.com/wgao19.png
tags: [offline-first, persistence, ephemeral]
---




# Application Architecture Is Broken

In the 1960s, when programming was a nascent skill dominated by accountants, scientists, and other non-specialists,
the focus on building software was for one user, interactively, at a terminal.  The user inteface was a paper printout, or maybe a text-only terminal.
Things were simpler then. There was no need for multi-threading, distributed computing, eventual consistency, scalability, or any of the concerns we have now, develioping a modern microservices architecture.

In the 70s, 


... go through the evolution of computer problems... introducing GUIs, the internet, multi user, databases, 

then talk about scaling the human side, and why we went to microservices in the first place.
kubernetes is an abstraction for infrastructure engineers to handle the scaling complexity of the problem space of hosting so much infrastructure.

On the application side, we stopped maturing our solutions.
We need a universal runtime that works on every system, a universal data API

Taking back control of the entire application stack into a single entity actually simplifies things - because you can ensure all changes to the system are monotonically applied across the board,
you can guarantee that there is no drift.


The reason that people can scale with a monolith (like Shopify) is because it's SSRing the pages.  So when you do a release, you have the DB logic, the application layer, and the view layer all coexisting.

As soon as you want the real-time performance and offline capabilities of an offline application


TypeScript is the only option for a universal runtime, because it is the only language that is deployed to all modern computing platforms.


What other solutions have there been?  Firebase but it is too much of a walled garden.  Cloud Functions don't support any programming language, limiting developer scope, and the data tier doesn't support integration with existing DBs or with security systems (does it?)

Supabase doesn't address the release management aspect, offline sync, or any of the problems associated with building and managing an entire platform of software. Same with AppWrite.

CouchDB handles the offline sync part, but not the ubiquitous compute engine.


Lay out in a table the necessary components of any nontrivial system:
- Replicating data from the data tier to the frontend for visualization
- Filtering data reads and writes from the data tier based on permissioning
- Identifying users
- Integration with existing systems (DBs, Auth mechanisms, etc.)
- Ability to customize server-side logic
- Observability
- Metrics
- Logging and log aggregation
- Managing Secrets - user passwords, external integration with other systems
- Scaling compute or data resources
- Deployment automation
- Multiple environments






# A New Application Architecture Manifesto





# What we all want
one schema, automatic handling of data online and offline

# What we have now
many schemas. DB. API.... NoSQL dbs, then GraphQL are reactions to this. moving the schema definitions.

# Ubiquitous Objects

Ubiquitous Objects is ...


extensibility: cloud functions

real-time messaging and high performance: ephemeral data

durability and transactionality, ACID: persisted data

bulk storage: file store


