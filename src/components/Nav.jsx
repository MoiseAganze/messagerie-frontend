import { Link } from "react-router-dom";

export function Navbar({ titre, handleOpen, user_data }) {
  return (
    <div
      className={`navbar bg-base-100 flex ${
        titre ? "justify-between" : "justify-between"
      } px-2 lg:px-4`}
    >
      <div
        tabIndex={0}
        role="button"
        className="lg:hidden btn btn-ghost btn-circle relative z-50"
        onClick={handleOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </div>
      {titre && (
        <div className="w-auto flex gap-2 pl-10">
          <span className="text-xl font-semibold text-accent">{titre}</span>
          <div className="badge badge-success badge-xs -mt-3"></div>
        </div>
      )}

      <div className="avatar placeholder">
        <Link
          to={`/profil`}
          className="bg-orange-700 text-sky-100  w-8 h-8 rounded-full flex justify-center items-center ring"
        >
          <span className="text-xl font-bold">{user_data?.name[0]}</span>
        </Link>
      </div>
    </div>
  );
}

export function Navbar2({ set_side_index }) {
  return (
    <div className="navbar bg-base-300 flex justify-end gap-2">
      <div className="tooltip tooltip-right" data-tip="messages">
        <button className="btn btn-circle " onClick={() => set_side_index(0)}>
          <img src="/mess.png" className="w-7 h-7" alt="" />
        </button>
      </div>
      <div className="tooltip tooltip-right" data-tip="amis">
        <button className="btn btn-circle" onClick={() => set_side_index(1)}>
          <img src="/friends.png" className="w-10 h-10" alt="" />
        </button>
      </div>
      <div className="tooltip tooltip-right" data-tip="Invitations en attente">
        <button className="btn btn-circle " onClick={() => set_side_index(2)}>
          <img src="/invite.png" className="w-10 h-10" alt="" />
        </button>
      </div>
    </div>
  );
}
