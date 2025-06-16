import { Link } from "react-router-dom";
import { LuUserCircle2 } from "react-icons/lu";
import { AppContext } from "../data/AppProvider";
import { useContext, useEffect, useState } from "react";

const Reserver = () => {
  const { formUser, logout } = useContext(AppContext);
  const [isClient, setIsClient] = useState(false);
  console.log("reserver formuser", formUser);

  useEffect(() => {
    setIsClient(true); // Ensure we're on client-side
  }, []);

  if (!isClient) return null; // Skip SSR mismatch

  return (
    <div className="reserver-container">
      {formUser ? (
        <div className="user-nav">
          <span className="welcome-message">
            Welcome, <span className="username">{formUser?.username}</span>
          </span>
          <Link to="/profile" className="profile-link">
            <LuUserCircle2 className="user-icon" size={32} />
          </Link>
          <button onClick={logout} className="logout-button">
            Sign Out
          </button>
        </div>
      ) : (
        <Link to="/login" className="login-button">
          Sign In
        </Link>
      )}

      <style jsx>{`
        .reserver-container {
          padding: 1rem;
          background: #f5f0ea;
          border-radius: 8px;
        }

        .user-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .welcome-message {
          color: #333;
          font-size: 1.7rem;
          margin-right: 1rem;
        }

        .username {
          font-weight: 500;
          color: #d47a3b;
          font-size: 1.7rem;
        }

        .profile-link {
          color: #d47a3b;
          font-size: 2rem;
          transition: transform 0.2s;
          display: flex;
        }

        .profile-link:hover {
          transform: scale(1.1);
        }

        .logout-button,
        .login-button {
          background: #d47a3b;
          color: white;
          border: none;
          padding: 0.8rem 1.8rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: 600;
          transition: all 0.2s;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .logout-button:hover,
        .login-button:hover {
          background: #c06d34;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .logout-button:active,
        .login-button:active {
          transform: translateY(0);
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default Reserver;
