import { AlternativeHeader } from "@/app/_components/alternativeHeader";
import AccountAccessForm from "./_components/accountAccessForm";

export const AccountAccess = async () => {

    return (
      <div className="container">
        <AlternativeHeader variant={'logo'} />
        <AccountAccessForm />
      </div>
    );
  };
  
  export default AccountAccess;
  
  