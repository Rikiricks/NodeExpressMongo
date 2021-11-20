
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            age: Number,
            dob: Date,
            isActive: Boolean
        });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        console.log("obj: ",object);
        object.id = _id;
        return object;
      });
    
      const Student = mongoose.model("student", schema);
      return Student;
}