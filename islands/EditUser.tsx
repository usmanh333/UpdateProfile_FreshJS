export default function EditUser({userData}: any) {
  return (
    <div class={'flex justify-center'}>
      <div class="form-control w-full max-w-xs">
      <form method={'post'} encType="multipart/form-data" >
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
          name='username' id='username'
          value={userData && userData?.username}
        />
        <label class="label">
          <span class="label-text">Description</span>
        </label>
        <textarea
          placeholder="Bio"
          className="textarea textarea-bordered textarea-md w-full max-w-xs h-60"
          name='description' id='description'
          value={userData && userData?.description}
        >
        </textarea>
        <label class="label mt-3">
          <span class="label-text">Select Profile</span>
        </label>
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs mb-4"
          name='image' accept="image/*" 
        />
        <button name="_action" value="edit" class="btn btn-primary">{userData ? 'Update' :'Create' }</button>
        </form>
      </div>
    </div>
  );
}
