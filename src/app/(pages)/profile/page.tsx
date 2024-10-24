import { getServerSession } from "next-auth";

export const Profile = async () => {
    const session = await getServerSession();
    console.log(session);

  return (
    <></>
    //   <>{session}</>
  );
};

export default Profile;
