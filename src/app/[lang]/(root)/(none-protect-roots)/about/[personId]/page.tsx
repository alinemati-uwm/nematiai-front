import PersonPage from "@/components/pages/about-us/person/person";

const PersonId = ({
  params: { personId },
}: {
  params: { personId: string };
}) => {
  return (
    <>
      <PersonPage personId={personId} />
    </>
  );
};

export default PersonId;
