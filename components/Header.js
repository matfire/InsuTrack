import Link from "next/link";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/user.atom";
import { account } from "../utils/client";

const links = [
  <li key="samplings">
    <Link href="/dashboard/samplings">Samplings</Link>
  </li>,
  <li key="samplings_create">
    <Link href="/dashboard/samplings/create">Create Sampling</Link>
  </li>,
];

export default function Header() {
  const user = useRecoilValue(userAtom);
  console.log(user);
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <Link href="/dashboard" passHref>
            <a className="btn btn-ghost normal-case text-xl">InsuTrack</a>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{links}</ul>
        </div>
      </div>
      {!user.emailVerification && (
        <div className="alert alert-info mb-5">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Your email address is not verified</span>
          </div>
          <div className="flex-none">
            <button onClick={async () => {}} className="btn">
              Resend verification email
            </button>
          </div>
        </div>
      )}
    </>
  );
}
