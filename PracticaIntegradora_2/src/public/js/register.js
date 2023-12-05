const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  const respuesta = await fetch("/api/users/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  }).then((result) => {
    if (result.status === 201) {
      window.location.replace("/");
      console.log("Fetch done successfully")
    }
  });

  const content = await respuesta.json();

  console.log(content);

  const { access_token } = content;

  if (access_token) {
    localStorage.setItem("access_token", access_token);
    location.href = "/";
  } else {
    location.href = "/register";
  }
});
