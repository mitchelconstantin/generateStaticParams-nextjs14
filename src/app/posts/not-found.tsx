import React from "react";

export const dynamic = "force-static";

export default async function NotFound() {
  const todayDate = new Date().toLocaleString();

  return (
    <div>
      NotFound at in posts! {todayDate}
      <a href="/">Go back home.</a>
    </div>
  );
}
