// src/utils/appwrite.js
    import { Client, Databases, Storage } from 'appwrite';

    // Initialize variables
    let client;
    let databases;
    let storage;
    const databaseId = "stats-database";
    const statsCollectionId = "681a1850002bee8d5e30";
    const profileBucketId = "profile-images";

    // Initialize Appwrite only on the client side
    if (typeof window !== 'undefined') {
      client = new Client();

      client
        .setEndpoint('http://localhost/v1')
        .setProject('gearfoliodashboard');

      databases = new Databases(client);
      storage = new Storage(client);
    }

    export { client, databases, storage, databaseId, statsCollectionId, profileBucketId };