import React from "react";

interface RequiredLabelProps {
  label: string;
  required?: boolean;
}

const RequiredLabel: React.FC<RequiredLabelProps> = ({ label, required }) => (
  <span>
    {label} {required && <span style={{ color: "red" }}>*</span>}
  </span>
);

export default RequiredLabel;
