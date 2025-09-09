import { Suspense } from "react";
import ActivatePage from "./_components/ActivatePage";

function page() {
  return (
    <Suspense>
      <ActivatePage />
    </Suspense>
  );
}

export default page;
