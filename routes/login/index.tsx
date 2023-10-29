import { Handlers, Status } from "$fresh/server.ts";
import Footer from "../../components/Footer.tsx";
import { loginUser } from "../../database/register/operations.ts";
import { Token } from "../../database/register/schema.ts";
import { Navbar } from "../../islands/Navbar.tsx";

export const handler : Handlers = {
  async POST(req){
      try {
          const form = await req.formData()
          const action = form.get("_action");
          if(action === "login"){
              const email = form.get('email') as string;
              const password = form.get('password') as string;
              const resp = await loginUser(
                  email,
                  password,
              )
              console.log(await resp, "login");
              const tokenData :Token ={
                email:email,
                _id: resp.body.userId,
                token: resp.body.token
              }
              localStorage.setItem('login', email)
          }else{
              return new Response(null, {
                  status: 500,
              })
          }
          return new Response(null, {
              status: Status.Created,
              headers: {
              location: "/",
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
            <button name="_action" value="login" class="btn btn-primary mt-4">
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
