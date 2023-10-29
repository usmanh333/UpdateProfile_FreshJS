import { Handlers, Status } from "$fresh/server.ts";
import { setCookie } from "https://deno.land/std@0.202.0/http/cookie.ts";
import Footer from "../../components/Footer.tsx";
import { Navbar } from "../../islands/Navbar.tsx";
import { fileUpload } from "../../utils/file.ts";
import { createRegisterUser } from "../../database/register/operations.ts";

export const handler : Handlers = {
    async POST(req){
        try {
            const form = await req.formData()
            const action = form.get("_action");
            if(action === "register"){
                const username = form.get('username') as string;
                const email = form.get('email') as string;
                const password = form.get('password') as string;
                let image:any = form.get('image') as File;
                if (image) {
                    image = await fileUpload(image);
                }
                createRegisterUser({
                    username,
                    email,
                    password,
                    image: image,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                })
            }else{
                return new Response(null, {
                    status: 500,
                })
            }
            return new Response(null, {
                status: Status.Found,
                headers: {
                location: "/login",
            },
            })
        } catch (error) {
            console.error(error);
            return new Response(null, {
                status: 403,
            })
        }
    }
}


export default function index() {
  return (
    <div>
      <Navbar />
      <div class={"text-4xl text-center mb-12"}>Register Page</div>
      <div class={"flex justify-center"}>
        <div class="form-control w-full max-w-xs">
          <form method={"post"} encType="multipart/form-data" >
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              class="input input-bordered w-full max-w-xs"
              name="username"
              id="username"
            />
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              placeholder="Enter your email address"
              className="input input-bordered w-full max-w-xs"
              name="email"
              id="description"
            />
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              placeholder="Enter Password"
              className="input input-bordered w-full max-w-xs"
              name="password"
              id="description"
            />
            <label class="label mt-3">
              <span class="label-text">Select Profile</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs mb-4"
              name="image"
              accept="image/*"
            />
            <button name="_action" value="register" class="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
