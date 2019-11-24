import Category from './model';

const createCategoryPojo = (title, description, colorLabel, icon, isSystemCategory = true) => ({
  title,
  description,
  isSystemCategory,
  colorLabel,
  icon,
});

const seedCategory = async () => {
  try {
    console.log('Seeding Category');
    const foodAndDrink = createCategoryPojo('Food & Drink', 'Food And Drink', '#4db6ac', 'hamburger');
    const utility = createCategoryPojo('Utility', 'Electricity, Gas and Water Bill', '#ff7043', 'plug');
    const grocery = createCategoryPojo('Grocery', 'Grocery Shopping', '#9ccc65', 'shopping-cart');
    const entertainment = createCategoryPojo('Entertainment', 'Entertainment such as movies, leisury', '#3f51b5', 'film');
    const transportation = createCategoryPojo('Trasportation', 'Trasportation such as Taxi, Uber fare', '#42a5f5', 'taxi');
    const travel = createCategoryPojo('Travel', 'Airticket and Hotel', '#81d4fa', 'plane');
    const shopping = createCategoryPojo('Shopping', 'Fashion Shopping', '#fdd835', 'shopping-bag');
    const other = createCategoryPojo('Other', 'Other', '#4db6ac', 'star');
    const seedData = [
      foodAndDrink,
      utility,
      grocery,
      entertainment,
      transportation,
      travel,
      shopping,
      other,
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
