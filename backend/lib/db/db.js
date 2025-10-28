const mongose = require("mongoose");

// Oprette en asynkron function til at forbinde at forbinde til MongoDB
const connectDB = async () => {
  try {
    // Forsøger at forbinde til MongoDB med connection string
    const coon = await mongoose.connect(
      ""
    );
    // Hvis forbindelse lykkes, log beskedde med host navn
    console.log(`MongoDB Connected: ${connectDB.connection.host}`);
  } catch (error) {
    // Hvis der sker en fejl, log fejlbesked og afslut programmet
    console.error(`MongoDB Fejl: ${error.message}`);
    //Koden (1) betyder en fejltilstand.  Process.exit stopper programmet med det samme, uden at vente.
    process.exit(1);
  }
};

// Eksporter connectDB functionn som module
module.exports = connectDB;
