export const CandidateProfile = () => {
  const name = "Rajdeep Mudiar";
  const role = "AI ML Engineer";
  const yoe = 3;
  const isAvailable = true;

  return (
    <>
      <h1>Candidate Profile</h1>
      <h2>{name}</h2>
      <p>
        <strong>Role:</strong> {role}
      </p>
      <p>
        <strong>Years of Experience:</strong> {yoe}
      </p>
      <p>Started in {2026 - yoe}</p>
      <p>
        <strong>Availability:</strong>{" "}
        {isAvailable ? "Available" : "Not Available"}
      </p>

      <p>Contact : {name.toLowerCase().replace(" ", ".")}@gmail.com</p>
    </>
  );
};
