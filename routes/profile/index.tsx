import { Handlers } from "$fresh/server.ts";
import Footer from "../../components/Footer.tsx";
import { fetchUsers } from "../../database/Profile/operations.ts";
import { Profile } from "../../database/Profile/schema.ts";
import { Navbar } from "../../islands/Navbar.tsx";
import { showFile } from "../../utils/file.ts";

export const handler: Handlers = {
  async GET(_req, ctx: any) {
    try {
      const users = await fetchUsers();
      return await ctx.render(users);
    } catch (error) {
      console.error(error);
    }
  },
};

export default function index({ data }: any) {
  return (
    <>
      <Navbar data={data} />
      <div class={"text-4xl text-center mb-12"}>User Profile</div>
      <div class={'flex justify-center'}>
      <div class={''}>
        {data && data.map((pro: Profile) => {
          return (
            <>
              <div class="card lg:card-side bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={showFile(pro.image)}
                    alt="Album"
                    class={"w-80"}
                  />
                </figure>
                <div class="card-body w-96 items-center">
                  <h2 class="card-title">{pro.username}</h2>
                  <p><strong>Bio : </strong>{pro.description}</p>
                  <div class="card-actions mt-3">
                    <a href={`/edit/${pro._id}`} class="btn btn-primary">
                      Update Profile
                    </a>
                  </div>
                </div>
              </div>
            </>
          );
        })}
        {!data &&
            <div class="card-actions justify-end">
            <a href={`/edit/${1243525}`} class="btn btn-primary">
              Create Profile
            </a>
          </div>
        }
      </div>
     </div>
    <Footer />
    </>
  );
}
