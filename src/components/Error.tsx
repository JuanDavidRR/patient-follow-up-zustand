import { ReactNode } from "react";

function Error({ children }: { children: ReactNode }) {
  return <p className="text-center bg-red-600 p-3 text-white my-4 font-bold uppercase">{children}</p>;
}

export default Error;
