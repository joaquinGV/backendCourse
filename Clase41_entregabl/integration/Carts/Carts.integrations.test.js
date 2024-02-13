import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

describe("testing del módulo de carts", () => {
  let admin = {
    email: "coderad@hotmail.com",
    password: "coder1234",
  };
  adminJwt = "";

  it("Debemos de obtener todos los carritos correctamente", async () => {
    const { data } = await requester.post("/api/users/login").send(admin);
    const { statusCode } = await requester.get();

    const loginResult = await requester
      .post("/api/sessions/login")
      .send(credentialsMock);
    const cookieResult = loginResult.headers["set-cookie"][0];
    // 'coderCookie=asdhfasdfashjdfgasjdf'
    expect(cookieResult).to.be.ok;

    const cookieResultSplit = cookieResult.split("=");
    // ['coderCookie', 'asdhfasdfashjdfgasjdf'];

    cookie = {
      name: cookieResultSplit[0],
      value: cookieResultSplit[1],
    };

    expect(cookie.name).to.be.ok.and.eql("coderCookie");
    expect(cookie.value).to.be.ok;
  });
});
