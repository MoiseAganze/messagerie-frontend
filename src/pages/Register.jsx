import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import useSubmit from "../hooks/useSubmit";

const Register = () => {
  const nav = useNavigate();
  const { handleChange, handleSubmit, loading, datasForm } = useSubmit(
    { name: "", email: "", password: "", cpassword: "" },
    "/register",
    "inscription reussi",
    nav,
    "/"
  );
  return (
    <>
      <div
        className="hero bg-base-200 min-h-screen"
        style={{ backgroundImage: "url('/fond3.webp')" }}
      >
        <div className="hero-content ">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Pseudo</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={datasForm.name}
                  onChange={handleChange}
                  placeholder="name"
                  className="input input-bordered border-accent"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={datasForm.email}
                  onChange={handleChange}
                  placeholder="email"
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
                  value={datasForm.password}
                  onChange={handleChange}
                  placeholder="votre mot de passe"
                  className="input input-bordered border-accent"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirmer</span>
                </label>
                <input
                  type="password"
                  name="cpassword"
                  value={datasForm.cpassword}
                  onChange={handleChange}
                  placeholder="confirmez votre mot de passe"
                  className="input input-bordered border-accent"
                  required
                />
                <label className="label">
                  <Link
                    to={"/login"}
                    className="label-text-alt link link-hover"
                  >
                    vous avez un compte ?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? (
                    <span className="loading loading-spinner text-accent"></span>
                  ) : (
                    <>{"S'inscrire"}</>
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

export default Register;
