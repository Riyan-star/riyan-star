function calculateChaiIngredients(numberOfCups){
  const waterPerCup =200;
  const milkPerCup =50;
  const teaLeavesPerCup=1;
  const sugarPerCup =2;
  
  
  const totalWater=numberOfCups*waterPerCup;
  const totalMilk =numberOfCups*milkPerCup;
  const totalTeaLeaves=numberOfCups*teaLeavesPerCup;
  const totalSugar =numberOfCups*sugarPerCup;
  
  console.log ('To make ${numberOfCups} cup(s) of Kenyan Chai, you will need:' );
  console.log ('water: {totalWater} ml');
  console.log ( 'milk: {totalMilk}ml');
  console.log ( 'tea leaves (majani): {totalTeaLeaves} tablespoon(s)');
  console.log(`Sugar (Sukari): ${totalSugar} teaspoon(s)\n`);
  console.log("Enjoy your Chai Bora!");
}
const input=prompt("karibu! How many cups of chai bora would you like to make?");
const numberOfCups=number(input);