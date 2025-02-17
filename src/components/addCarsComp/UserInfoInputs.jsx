import InputField from "../Login&Register/InputField";

const UserInfoInputs = ({ user }) => {
  return (
    <>
      {/* user info */}
      <div className="space-y-1 text-sm">
        <fieldset className="fieldset w-full  border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend text-white text-base">
            Owners Info
          </legend>
          <div className="grid grid-cols-1 gap-5">
            {/* email of the user */}
            <div className="space-y-1 text-sm">
              <InputField label={"User Email"} customClassName="text-white">
                <input
                  type="email"
                  name="userEmail"
                  id="userEmail"
                  defaultValue={user?.email}
                  className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-300 text-gray-800 focus:border-violet-600 outline-0 resize-none"
                  disabled
                />
              </InputField>
            </div>
            {/* user name of the user */}
            <div className="space-y-1 text-sm">
              <InputField label={"User Name"} customClassName="text-white">
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  defaultValue={user?.displayName}
                  className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-300 text-gray-800 focus:border-violet-600 outline-0 resize-none"
                  disabled
                />
              </InputField>
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default UserInfoInputs;
