const {cleanQuery} = require("./helpers/functions");
const Users = require("./users/Users");

test('should return same string',()=>{
    const text = cleanQuery("test");
    expect(text).toBe("test")

});

// test("test on real route",()=>{
//     const a = Users.get({id_user : 1},function(err,rows){if(err){console.log(err) }else return rows})
//     console.log(a)
//     expect(a).toBe(Array)
// })