import React, { FC } from "react";
import globals from "../../styles/globals";

export const Layout: FC = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx global>{globals}</style>
    </div>
  );
};
