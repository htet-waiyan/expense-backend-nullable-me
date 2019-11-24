import mongoose from 'mongoose';
import seedCategory from '../src/category/seed';

mongoose.connect('mongodb://localhost/spllit-sandbox');
seedCategory();
