import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import login from "/images/landingimage/login.jpg";
export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fakeLoginUser(creds) {
  await sleep(1000);
  if (creds.email === "b@b.com" && creds.password === "p123") {
    localStorage.setItem("loggedin", true);
    return {
      email: creds.email,
      token: "1234567890abcdef",
    };
  }
  throw new Error("Couldn't log the user in");
}
export async function action({ request }) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const data = await fakeLoginUser({ email, password });
    console.log(data);
    localStorage.setItem("loggedin", true);
    return redirect("/cart");
  } catch (error) {
    return error.message;
  }
}

const Login = () => {
  const message = useLoaderData();
  const navigation = useNavigation();
  const errorMessage = useActionData();
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div>
      <img src={login} alt="" className="landingImg" />
      <div className="login-container">
        <h2>Sign in to your account</h2>
        {message && <h3 className="red">{message}</h3>}
        {errorMessage && <h3 className="red">{errorMessage}</h3>}

        <Form method="post" replace className="login-form">
          <input name="email" type="email" placeholder="Email address" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={navigation.state === "submitting"}>
            {navigation.state === "submitting" ? "Logging in..." : "Log in"}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
