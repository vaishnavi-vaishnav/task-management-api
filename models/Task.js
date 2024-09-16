const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in progress', 'completed'],
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
}
// , 
// {
//   toJSON: { virtuals: false },
//   toObject: { virtuals: false },
// }
);

// Virtual to format the dueDate to 'YYYY-MM-DD' before sending it
taskSchema.virtual('formattedDueDate').get(function() {
  return this.dueDate.toISOString().split('T')[0];
});

module.exports = mongoose.model('Task', taskSchema);
