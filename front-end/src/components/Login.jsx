import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import login from "/images/landingimage/login.jpg";
import { useEffect, useState } from "react";
import { AppContext } from "../data/AppProvider";
import { useContext } from "react";

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const response = await fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    // First check if response is OK
    if (!response.ok) {
      // Try to get error message from response
      const errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        return { error: errorJson.message || "Login failed" };
      } catch {
        return { error: errorText || "Login failed" };
      }
    }

    // If response is OK, parse as JSON
    const data = await response.json();
    console.log("action function data", data);

    if (!data.token) {
      return { error: "No token received" };
    }

    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("formUser", JSON.stringify(data.user));

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        user_role: data.user.user_role,
        displayName: data.user.username || data.user.email.split("@")[0],
      },
    };
  } catch (error) {
    return { error: error.message || "An unexpected error occurred" };
  }
}
const Login = ({ setAuth }) => {
  const { setFormUser } = useContext(AppContext);
  const navigation = useNavigation();
  const actionData = useActionData();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  console.log("action", actionData);

  const updateAuthState = (userData) => {
    setFormUser(userData);
    setAuth({
      isAuthenticated: true,
      user_role: userData.user_role || "customer",
    });
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = sessionStorage.getItem("formUser");
        if (userData) {
          updateAuthState(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);
  console.log("actionData", actionData);

  useEffect(() => {
    if (actionData?.success) {
      updateAuthState(actionData.user);
      navigate("/cart");
    }
  }, [actionData, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={login} alt="loginImg" loading="lazy" className="landingImg" />
      <div className="login-container">
        <h2>Sign in to your account</h2>

        {actionData?.error && <div className="red">{actionData.error}</div>}

        <Form method="post" className="login-form">
          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit" disabled={navigation.state === "submitting"}>
            {navigation.state === "submitting" ? "Logging in..." : "Log in"}
          </button>
        </Form>
        <Link to="/signup" className="signup-link">
          Créer un Compte
        </Link>
      </div>
    </div>
  );
};
export default Login;
