import Heading from "@/components/shared/heading";
import MembershipFeeCard from "@/components/shared/membership-fee-card";

const MembershipFeePage = () => {
  return (
    <div>
      <h1 className="text-center mb-8 mt-8">
        <Heading content="Membership Fee" />
      </h1>

      <div className="container lg:flex justify-center gap-4 mb-6">
        <MembershipFeeCard
          membershipType="General Membership Fee"
          membershipFee={"200/month"}
          membershipTenure="Yearly Membership Fee"
          footerNote="Membership Fee for Year 2024"
        />

        <MembershipFeeCard
          membershipType="Life Membership Fee"
          membershipFee="12000"
          membershipTenure="Life Time Membership Fee"
          footerNote="Membership Payment For Entire Life"
        />
      </div>
    </div>
  );
};

export default MembershipFeePage;
