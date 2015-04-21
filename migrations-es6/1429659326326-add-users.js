export function up (next){
  console.log("Migrated up.");
  next();
};

export function down(next){
  console.log("Migrated down.");
  next();
};
