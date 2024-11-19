export const prerender = false;

export const GET = async ({ redirect, cookies }) => {
  cookies.delete("__session", {
    path: "/",
  });

  return redirect("/login");
};
