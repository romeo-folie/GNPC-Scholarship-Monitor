const expect = require('expect')
const request = require('supertest')

const {
  app
} = require('./../app')
const {
  User
} = require('./../model/user')

//SEED DATA FOR TESTING
const emptyAndPopulateUsers = (done) => {
  User.remove({}).then(() => {
    var testUser = new User({
      name: "test uer",
      email: "testuser@mail.com"
    })
    return testUser.save()
  }).then(() => done())
}
beforeEach(emptyAndPopulateUsers)

//TESTING FOR POST USERS ROUTE
describe('POST /users', () => {
  it('should add a new user', (done) => {
    let name = "Rhomheow"
    let email = "somemail@mail.com"

    request(app)
      .post('/users')
      .send({
        name,
        email
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe(name)
        expect(res.body.email).toBe(email)
      })
      .end((err) => {
        if (err) {
          return done(err)
        }
        User.findOne({
          email
        }).then((user) => {
          expect(user).toBeTruthy()
          expect(user.name).toBe(name)
          expect(user.email).toBe(email)
          done()
        }).catch((e) => done(e));
      });
  });

  it('should return validation errors if request is invalid', (done) => {
    let name = " "
    let email = "someinvalidemail"

    request(app)
      .post('/users')
      .send({
        name,
        email
      })
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    let name = "test user"
    let email = "testuser@mail.com"

    request(app)
    .post('/users')
    .send({name, email})
    .expect(400)
    .end(done);
  });

});
