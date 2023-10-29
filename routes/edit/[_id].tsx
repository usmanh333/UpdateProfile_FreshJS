import { Handlers, Status } from "$fresh/server.ts";
import { deleteFile, fileUpload } from "../../utils/file.ts";

import EditUser from "../../islands/EditUser.tsx";
import { createUser, fetchUser, updateUser } from "../../database/Profile/operations.ts";
import { Navbar } from "../../islands/Navbar.tsx";
import Footer from "../../components/Footer.tsx";

export const handler: Handlers = {
  async POST(req, ctx: any) {
    try {
        const formData = await req.formData();
        const action = formData.get("_action");
        if(action === "edit") {
            const {_id} = ctx.params
            const userData = await fetchUser(_id)
            if(!userData){
                const username = formData.get('username') as string;
                const description = formData.get('description') as string;
                let image:any = formData.get("image") as File;
                if (image) {
                    image = await fileUpload(image);
                  }
                await createUser({
                    username: username,
                    description,
                    image: image,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                });
            }else{
                const username = formData.get('username') as string;
                const description = formData.get('description') as string;
                const image = formData.get("image") as File;
                let imageName = userData.image;
                if (image) {
                  imageName = await fileUpload(image);
                  await deleteFile(userData.image);
                }
                await updateUser(_id,{
                    username: username,
                    description,
                    image: imageName,
                    createdAt: userData.createdAt,
                    updatedAt: Date.now(),
                });
            }
        }
        return new Response(undefined, {
            status: Status.Found,
            headers: {
            location: "/profile",
            },
      });
    } catch (error) {
      console.error(error);
      return ctx.render(error);
    }
  },
  async GET(req, ctx) {
    try {
      const {_id} = ctx.params
      const userData = await fetchUser(_id);
      return ctx.render({
          userData,
      });
    } catch (error) {
      return new Response(undefined, {
        status: 500,
      });
    }
  }
};

function Edit(props:any) {
  const {userData} = props.data;
  return (
    <>
    <Navbar userData={userData} />
    <div class={"text-4xl text-center mb-8"}>Update Profile</div>
    <EditUser userData={userData}/>
    <Footer/>
    </>
  )
}

export default Edit