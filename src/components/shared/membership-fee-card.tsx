import { cn } from "@/lib/utils";
import SubHeading from "@/components/shared/sub-heading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TbCurrencyTaka } from "react-icons/tb";

interface MembershipFeeCardPropsType {
  membershipType: string;
  membershipFee: string;
  membershipTenure: string;
  footerNote: string;
}

const MembershipFeeCard = ({
  membershipType,
  membershipFee,
  membershipTenure,
  footerNote,
}: MembershipFeeCardPropsType) => {
  return (
    <div className="mb-4 shadow">
      <Card className={cn("w-[360px] md:w-[700px] lg:w-[460px]")}>
        <div className="text-center">
          <CardHeader>
            <div className=" text-2xl font-bold">
              <SubHeading content={membershipType} />
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="text-4xl text-gray-600 font-bold flex justify-center dark:text-gray-300">
              <TbCurrencyTaka className="text-5xl" />
              {membershipFee}
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              {membershipTenure}
            </p>
            <p>{footerNote}</p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default MembershipFeeCard;
