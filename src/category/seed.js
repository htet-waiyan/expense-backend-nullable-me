import Category from './model';

const createCategoryPojo = (title, description, colorLabel, isSystemCategory = true) => ({
  title,
  description,
  isSystemCategory,
  colorLabel,
});

const seedCategory = async () => {
  try {
    console.log('Seeding Category');
    const foodAndDrink = createCategoryPojo('Food & Drink', 'Food And Drink', '#4db6ac');
    const utility = createCategoryPojo('Utility', 'Electricity, Gas and Water Bill', '#ff7043');
    const grocery = createCategoryPojo('Grocery', 'Grocery Shopping', '#9ccc65');
    const entertainment = createCategoryPojo('Entertainment', 'Entertainment such as movies, leisury', '#3f51b5');
    const transportation = createCategoryPojo('Trasportation', 'Trasportation such as Taxi, Uber fare', '#42a5f5');
    const travel = createCategoryPojo('Travel', 'Airticket and Hotel', '#81d4fa');
    const shopping = createCategoryPojo('Shopping', 'Fashion Shopping', '#fdd835');
    const seedData = [
      foodAndDrink,
      utility,
      grocery,
      entertainment,
      transportation,
      travel,
      shopping,
    ];
    console.log(seedData);
    const data = await Category.insertMany(seedData);
    console.log('Successfuly seeded Category ', data);
  } catch (error) {
    console.log('Errir in seeding category');
    throw error;
  }
};

export default seedCategory;
