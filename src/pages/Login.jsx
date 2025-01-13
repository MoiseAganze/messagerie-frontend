import React from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useSubmit from "../hooks/useSubmit";

const Login = () => {
  const nav = useNavigate();
  const { handleChange, handleSubmit, loading, datasForm } = useSubmit(
    { email: "", password: "" },
    "/login",
    "connecté",
    nav,
    "/"
  );
  return (
    <>
      <div
        className="hero bg-base-200 min-h-screen"
        style={{ backgroundImage: "url('/fond2.webp')" }}
      >
        <div className="hero-content">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={datasForm.email}
                  onChange={handleChange}
                  className="input input-bordered border-accent"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mot de passe</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="votre mot de passe"
                  value={datasForm.password}
                  onChange={handleChange}
                  className="input input-bordered border-accent"
                  required
                />
                <label className="label">
                  <Link
                    to={"/register"}
                    className="label-text-alt link link-hover"
                  >
                    creer un compte
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" disabled={loading}>
                  {" "}
                  {loading ? (
                    <span className="loading loading-spinner text-accent"></span>
                  ) : (
                    <>{"Se connecter"}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
};

export default Login;
