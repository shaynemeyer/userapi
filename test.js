var app = require("./app.js");
var request = require("supertest").agent(app.listen());
var co = require("co");
var users = require("./userRoutes");

describe("Simple User Http Crud API", function () {
	var a_user = { } ;

	beforeEach(function (done) {
		a_user = { name: "Johnny", age: 55, height: 40 };

		removeAll(done);
	});

	afterEach(function (done) {
		removeAll(done);
	})

	var removeAll = function (done) {
		co(function *() {
			yield users.remove({});
		});
		done();
	};

	it("adds new users", function (done) {
		request
			.post("/user")
			.send(a_user)
			.expect("location", /^\/user\/[0-9a-fA-F]{24}$/)
			.expect(200, done)
	});

	it("fails validation for users without name", function (done) {
		delete a_user.name;

		request
			.post("/user")
			.send(a_user)
			.expect("name required")
			.expect(400, done)

	});

	it("get existing user by id", function (done) {
		co(function *() {
			// insert test user into db
			var insertedUser = yield users.insert(a_user);

			// get url to user
			var url = "/user/" + insertedUser._id;

			// get via api
			request.get(url)
				.set("Accept", "application/json")
				.expect("Content-type", /json/)
				.expect(/Johnny/)
				.expect(/40/)
				.expect(200, done);

		});

		done();
	});

	it("update an existing user", function (done) {
		co(function *() {
			// insert test user into db
			var insertedUser = yield users.insert(a_user);

			// get url to user
			var url = "/user/" + insertedUser._id;

			request
				.put(url)
				.send({ name: "Not-Shayne", age: 44, height: 69 })
				.expect("location", url)
				.expect(204, done)
		});

		done();
	});

	it("delete existing user", function (done) {
		co(function *() {
			// insert test user into db
			var insertedUser = yield users.insert(a_user);

			// get url to user
			var url = "/user/" + insertedUser._id;

			request
				.del(url)
				.expect(200, done)
		});

		done();
	});
});