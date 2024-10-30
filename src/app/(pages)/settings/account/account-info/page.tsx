import { AlternativeHeader } from "@/app/_components/alternativeHeader";
import AccountInfoForm from "./_components/accountInfoForm";

export const AccountInfo = async () => {

    return (
      <div className="container">
        <AlternativeHeader variant={'logo'} />
        <AccountInfoForm />
      </div>
    );
  };
  
  export default AccountInfo;
  
  