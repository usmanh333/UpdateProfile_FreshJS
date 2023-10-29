import { showFile } from "../utils/file.ts";

export function Navbar({data, userData}:any) {
  return (
    <div class="navbar bg-base-100 bg-dark">
      <div class="flex-1">
        <a href={'/'} class="btn btn-ghost normal-case text-xl">Fresh Mongo</a>
      </div>
      <div class="flex-none gap-2">
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            class="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div class="dropdown dropdown-end">
          <label tabIndex={0} class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
                { data ? data?.map((pro:any)=><img src={pro?.image ? showFile(pro?.image): showFile(pro?.image)} />): <img src={showFile(userData?.image)}/>}
            </div>
          </label>
          <ul
            tabIndex={0}
            class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a href={'/profile'} class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li>
              <a href={'/register'}>Register</a>
            </li>
            <li>
              <a href={'/login'}>Login</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
