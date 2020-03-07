import Expense from '../src/expense/model';
import moment from 'moment';
import { connect } from '../src/database';

connect();

const patchToHaveYYYYMM = () => {
  Expense.find({})
    .then((expenses) => {
      return expenses.map((e) => {
        e.expenseDate = +moment(e.timestamp, 'X').format('YYYYMMDD');
        return {
          updateOne: {
            filter: { _id: e._id },
            update: e,
            upsert: false,
          },
        };
      });
    })
    .then((updatingExpenses) => {
      return Expense.collection.bulkWrite(updatingExpenses, { ordered: false });
    })
    .then(() => {
      console.log('Successfully patched');
    })
    .catch((err) => {
      throw err;
    });
};

patchToHaveYYYYMM();
